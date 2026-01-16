import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';
import gpxParser from 'gpxparser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HIKING_DIR = path.join(__dirname, '../public/data/hiking');
const MAPS_DIR = path.join(HIKING_DIR, 'maps');
const MANIFEST_PATH = path.join(HIKING_DIR, 'manifest.json');

// Tile configuration
const ZOOM = 15;
const TILE_SIZE = 256;

// Providers
// Using AMap (Gaode) Satellite and Esri Hillshade
const SATELLITE_URL = 'http://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}';
const HILLSHADE_URL = 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}';

// Ensure maps directory exists
if (!fs.existsSync(MAPS_DIR)) {
  fs.mkdirSync(MAPS_DIR, { recursive: true });
}

function lon2tile(lon, zoom) {
  return Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
}

function lat2tile(lat, zoom) {
  return Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
}

async function downloadTile(url, z, x, y, retries = 3) {
  const tileUrl = url.replace('{z}', z).replace('{x}', x).replace('{y}', y);
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(tileUrl, { 
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });
      return Buffer.from(response.data);
    } catch (error) {
      if (i === retries - 1) {
        console.error(`Failed to download tile ${z}/${x}/${y} after ${retries} attempts: ${error.message}`);
        return null;
      }
      console.log(`Retrying tile ${z}/${x}/${y}... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

async function processGPX(filename) {
  const gpxPath = path.join(HIKING_DIR, filename);
  const mapPath = path.join(MAPS_DIR, `${filename.replace('.gpx', '')}.jpg`);
  const metaPath = path.join(MAPS_DIR, `${filename.replace('.gpx', '')}.json`);

  // Check if force re-generate is requested via command line argument
  const force = process.argv.includes('--force');

  if (fs.existsSync(mapPath) && !force) {
    console.log(`Skipping ${filename}, map already exists. Use --force to re-generate.`);
    return;
  }

  console.log(`Processing ${filename}...`);
  const gpxData = fs.readFileSync(gpxPath, 'utf8');
  const gpx = new gpxParser();
  gpx.parse(gpxData);

  const track = gpx.tracks[0];
  const lats = track.points.map(p => p.lat);
  const lons = track.points.map(p => p.lon);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);

  // Buffer the bounds slightly
  const padding = 0.005;
  const xStart = lon2tile(minLon - padding, ZOOM);
  const xEnd = lon2tile(maxLon + padding, ZOOM);
  const yStart = lat2tile(maxLat + padding, ZOOM);
  const yEnd = lat2tile(minLat - padding, ZOOM);

  const width = (xEnd - xStart + 1) * TILE_SIZE;
  const height = (yEnd - yStart + 1) * TILE_SIZE;

  console.log(`Grid: ${xEnd - xStart + 1}x${yEnd - yStart + 1} tiles. Total size: ${width}x${height}`);

  if (width > 4000 || height > 4000) {
    console.warn(`Map for ${filename} is very large, reducing zoom.`);
    // In a real scenario, we might want to adjust zoom dynamically
  }

  const compositions = [];
  let successCount = 0;
  let totalTiles = (xEnd - xStart + 1) * (yEnd - yStart + 1);
  
  for (let x = xStart; x <= xEnd; x++) {
    for (let y = yStart; y <= yEnd; y++) {
      const satBuffer = await downloadTile(SATELLITE_URL, ZOOM, x, y);
      if (satBuffer) {
        successCount++;
        const left = (x - xStart) * TILE_SIZE;
        const top = (y - yStart) * TILE_SIZE;
        
        // Try to get hillshade
        const hillBuffer = await downloadTile(HILLSHADE_URL, ZOOM, x, y);
        
        let finalTile;
        if (hillBuffer) {
          // Blend satellite and hillshade
          finalTile = await sharp(satBuffer)
            .composite([{ input: hillBuffer, blend: 'multiply', opacity: 0.4 }])
            .toBuffer();
        } else {
          finalTile = satBuffer;
        }

        compositions.push({
          input: finalTile,
          left,
          top
        });
      }
    }
  }

  if (successCount < totalTiles * 0.1) {
    console.error(`Error: Too many tiles failed to download (${successCount}/${totalTiles}). Map not saved.`);
    return;
  }

  // Stitch tiles
  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 }
    }
  })
  .composite(compositions)
  .jpeg({ quality: 85 })
  .toFile(mapPath);

  // Save metadata for alignment in React
  // We need to know the geo-bounds of the generated image to correctly overlay the SVG path
  const tile2lon = (x, z) => x / Math.pow(2, z) * 360 - 180;
  const tile2lat = (y, z) => {
    const n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  };

  const metadata = {
    bounds: {
      minLat: tile2lat(yEnd + 1, ZOOM),
      maxLat: tile2lat(yStart, ZOOM),
      minLon: tile2lon(xStart, ZOOM),
      maxLon: tile2lon(xEnd + 1, ZOOM)
    },
    width,
    height
  };

  fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2));
  console.log(`Successfully generated map and metadata for ${filename}`);
}

async function run() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('Manifest not found. Run update-hikes first.');
    return;
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  for (const file of manifest) {
    try {
      await processGPX(file);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
}

run();
