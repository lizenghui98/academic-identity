import gpxParser from 'gpxparser';

export interface HikingPoint {
  lat: number;
  lon: number;
  speed: number; // m/s
  time: Date;
}

export interface HikingStats {
  name: string;
  filename: string;
  distance: number; // meters
  duration: number; // milliseconds
  startTime: Date;
  points: HikingPoint[];
}

export const parseGPX = async (url: string): Promise<HikingStats> => {
  const response = await fetch(url);
  const gpxData = await response.text();
  const filename = url.split('/').pop() || '';
  const gpx = new gpxParser();
  gpx.parse(gpxData);

  const track = gpx.tracks[0];
  
  // Calculate duration if time exists
  let duration = 0;
  let startTime = new Date();
  
  if (track.points.length > 0) {
    startTime = new Date(track.points[0].time);
    const endTime = new Date(track.points[track.points.length - 1].time);
    duration = endTime.getTime() - startTime.getTime();
  }

  // Calculate segment speeds
  const points: HikingPoint[] = track.points.map((p, i) => {
    let speed = 0;
    if (i > 0) {
      const prev = track.points[i - 1];
      const dist = calculateDistance(prev.lat, prev.lon, p.lat, p.lon);
      const timeDiff = (new Date(p.time).getTime() - new Date(prev.time).getTime()) / 1000;
      speed = timeDiff > 0 ? dist / timeDiff : 0;
    }
    return {
      lat: p.lat,
      lon: p.lon,
      time: new Date(p.time),
      speed: speed
    };
  });

  // Smoothing speed (moving average)
  const smoothedPoints = points.map((p, i) => {
    const window = points.slice(Math.max(0, i - 2), Math.min(points.length, i + 3));
    const avgSpeed = window.reduce((sum, curr) => sum + curr.speed, 0) / window.length;
    return { ...p, speed: avgSpeed };
  });

  return {
    name: gpx.metadata.name || "No.1",
    filename,
    distance: track.distance.total,
    duration,
    startTime,
    points: smoothedPoints,
  };
};

// Haversine formula to calculate distance between two points in meters
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

