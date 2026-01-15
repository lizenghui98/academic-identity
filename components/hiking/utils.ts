import gpxParser from 'gpxparser';

export interface HikingStats {
  name: string;
  distance: number; // meters
  elevationGain: number; // meters
  duration: number; // milliseconds
  startTime: Date;
  points: [number, number][]; // [lat, lon]
}

export const parseGPX = async (url: string): Promise<HikingStats> => {
  const response = await fetch(url);
  const gpxData = await response.text();
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

  // Try to extract elevation gain from extensions if gpxparser missed it
  let elevationGain = track.elevation.pos || 0;
  if (elevationGain === 0) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxData, "text/xml");
    const cumulativeClimb = xmlDoc.getElementsByTagName("cumulativeClimb")[0];
    if (cumulativeClimb && cumulativeClimb.textContent) {
      elevationGain = parseFloat(cumulativeClimb.textContent);
    }
  }

  return {
    name: gpx.metadata.name || "No.1",
    distance: track.distance.total,
    elevationGain,
    duration,
    startTime,
    points: track.points.map(p => [p.lat, p.lon] as [number, number]),
  };
};
