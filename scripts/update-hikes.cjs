const fs = require('fs');
const path = require('path');

const hikingDir = path.join(__dirname, '../public/data/hiking');
const manifestPath = path.join(hikingDir, 'manifest.json');

// Get all .gpx files in the directory
const files = fs.readdirSync(hikingDir)
  .filter(file => file.endsWith('.gpx'))
  .sort((a, b) => b.localeCompare(a)); // Sort descending by filename

// Write to manifest.json
fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2));

console.log(`✅ Successfully updated hiking manifest with ${files.length} files.`);
console.log(files);
