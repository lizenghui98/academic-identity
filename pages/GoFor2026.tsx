import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { HikingStats, parseGPX } from '../components/hiking/utils';
import { Activity, Map as MapIcon, Calendar, Clock, ArrowUpRight, ChevronRight, Mountain, Globe, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import { UI_TEXT } from '../constants';
import { Link } from 'react-router-dom';

// Component to fit map to polyline
const RecenterMap = ({ points }: { points: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      map.fitBounds(points, { padding: [50, 50] });
    }
  }, [points, map]);
  return null;
};

const GoFor2026: React.FC = () => {
  const { locale, toggleLocale } = useLanguage();
  const [hikes, setHikes] = useState<HikingStats[]>([]);
  const [selectedHike, setSelectedHike] = useState<HikingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHikes = async () => {
      try {
        // Fetch the manifest file to get all GPX filenames
        const manifestResponse = await fetch('/data/hiking/manifest.json');
        if (!manifestResponse.ok) throw new Error('Failed to fetch manifest');
        const hikeFilenames: string[] = await manifestResponse.json();
        
        const loadedHikes = await Promise.all(
          hikeFilenames.map(filename => parseGPX(`/data/hiking/${filename}`))
        );
        // Sort by date descending
        const sortedHikes = loadedHikes.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
        setHikes(sortedHikes);
        if (sortedHikes.length > 0) {
          setSelectedHike(sortedHikes[0]);
        }
      } catch (error) {
        console.error("Failed to load hiking data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHikes();
  }, []);

  const formatDistance = (m: number) => (m / 1000).toFixed(2) + ' km';
  const formatDuration = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return locale === 'zh' ? `${hours}小时 ${minutes}分` : `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-linen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Mountain className="w-12 h-12 text-gold animate-bounce" />
          <p className="text-xl font-serif italic tracking-widest">
            {locale === 'zh' ? '正在加载数据...' : 'Loading Hiking Data...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-linen font-sans selection:bg-gold/30">
      {/* Navigation Controls */}
      <div className="fixed top-6 right-6 z-[100] flex gap-4">
        <button 
          onClick={toggleLocale}
          className="bg-neutral-900/80 backdrop-blur-md border border-gold/20 p-3 rounded-full text-gold hover:bg-gold hover:text-neutral-950 transition-all shadow-xl"
          title={locale === 'en' ? 'Switch to Chinese' : '切换至英文'}
        >
          <Globe className="w-5 h-5" />
        </button>
        <Link 
          to="/"
          className="bg-neutral-900/80 backdrop-blur-md border border-gold/20 px-6 py-3 rounded-full text-gold hover:bg-gold hover:text-neutral-950 transition-all shadow-xl flex items-center gap-2 font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          {UI_TEXT.backToHome[locale]}
        </Link>
      </div>

      {/* Header */}
      <header className="px-6 py-12 md:px-12 border-b border-linen/10 bg-neutral-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-gold mb-4">
              <Mountain className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-[0.4em]">Personal Project</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif italic font-bold leading-tight">
              {UI_TEXT.hikingTitle[locale]}
            </h1>
            <p className="text-linen/60 mt-4 max-w-lg font-light tracking-wide leading-relaxed">
              {UI_TEXT.hikingSubtitle[locale]}
            </p>
          </div>
          <div className="flex gap-8 border-l border-linen/10 pl-8 h-fit">
            <div className="text-center">
              <p className="text-3xl font-serif text-gold font-bold">{hikes.length}</p>
              <p className="text-[10px] uppercase tracking-widest text-linen/40 mt-1">{UI_TEXT.hikesCount[locale]}</p>
            </div>
            <div className="text-center border-x border-linen/10 px-8">
              <p className="text-3xl font-serif text-gold font-bold">
                {(hikes.reduce((acc, h) => acc + h.distance, 0) / 1000).toFixed(1)}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-linen/40 mt-1">{UI_TEXT.totalDistance[locale]} (KM)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif text-gold font-bold">
                {Math.round(hikes.reduce((acc, h) => acc + h.elevationGain, 0))}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-linen/40 mt-1">{UI_TEXT.totalElevation[locale]} (m)</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar - Hike List */}
        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          <h2 className="text-xl font-serif italic border-b border-linen/10 pb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-gold" />
            {locale === 'zh' ? '登山时间线' : 'Hiking Timeline'}
          </h2>
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {hikes.map((hike, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedHike(hike)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 group border ${
                  selectedHike === hike 
                    ? 'bg-gold border-gold text-neutral-950 shadow-xl shadow-gold/20 scale-[1.02]' 
                    : 'bg-neutral-900/50 border-linen/5 hover:border-gold/30 hover:bg-neutral-900 text-linen'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${selectedHike === hike ? 'bg-neutral-950/20' : 'bg-gold/10 text-gold'}`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedHike === hike ? 'text-neutral-950/60' : 'text-linen/40'}`}>
                    {hike.startTime.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
                  </span>
                </div>
                <h3 className="text-xl font-serif italic font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  {hike.name}
                </h3>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5">
                    <MapIcon className="w-3.5 h-3.5 opacity-60" />
                    <span className="text-sm font-medium">{formatDistance(hike.distance)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    <span className="text-sm font-medium">{Math.round(hike.elevationGain)}m</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Map & Stats */}
        <div className="lg:col-span-8 space-y-8 order-1 lg:order-2">
          {selectedHike ? (
            <>
              {/* Map Section */}
              <div className="relative rounded-3xl overflow-hidden border border-linen/10 shadow-2xl h-[500px] bg-neutral-900 group">
                <MapContainer 
                  center={selectedHike.points[0]} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                >
                  <TileLayer
                    url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
                    subdomains={["1", "2", "3", "4"]}
                    attribution='&copy; <a href="http://datav.aliyun.com/static/reference/main.html">AutoNavi</a> contributors'
                  />
                  <Polyline 
                    pathOptions={{ color: '#D4AF37', weight: 4, opacity: 0.8, lineJoin: 'round' }} 
                    positions={selectedHike.points} 
                  />
                  <RecenterMap points={selectedHike.points} />
                </MapContainer>
                
                {/* Map Overlay Stats */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 pointer-events-none">
                  <div className="bg-neutral-950/80 backdrop-blur-xl border border-linen/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl">
                    <div className="p-3 bg-gold/10 rounded-xl text-gold">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-linen/40 font-bold">{UI_TEXT.duration[locale]}</p>
                      <p className="text-lg font-serif italic text-linen">{formatDuration(selectedHike.duration)}</p>
                    </div>
                  </div>
                  <div className="bg-neutral-950/80 backdrop-blur-xl border border-linen/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl">
                    <div className="p-3 bg-gold/10 rounded-xl text-gold">
                      <Mountain className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-linen/40 font-bold">{UI_TEXT.elevationGain[locale]}</p>
                      <p className="text-lg font-serif italic text-linen">{Math.round(selectedHike.elevationGain)}m</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hike Details */}
              <div className="bg-neutral-900/30 border border-linen/5 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-serif italic font-bold">{UI_TEXT.activityAnalysis[locale]}</h2>
                  <span className="px-4 py-1.5 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest">{UI_TEXT.completedStatus[locale]}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-linen/40 font-bold">{UI_TEXT.startTime[locale]}</p>
                    <p className="text-lg font-light">{selectedHike.startTime.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US')}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-linen/40 font-bold">{UI_TEXT.avgSpeed[locale]}</p>
                    <p className="text-lg font-light">
                      {((selectedHike.distance / 1000) / (selectedHike.duration / 3600000)).toFixed(1)} km/h
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-linen/40 font-bold">{UI_TEXT.trackingSource[locale]}</p>
                    <p className="text-lg font-light italic">{UI_TEXT.miFitness[locale]}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-linen/20 space-y-4">
              <MapIcon className="w-20 h-20 opacity-10" />
              <p className="text-2xl font-serif italic">
                {locale === 'zh' ? '请选择一次登山活动以查看详情' : 'Select a hike to view details'}
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-20 md:px-12 border-t border-linen/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold flex items-center justify-center rounded-full text-neutral-950">
              <Mountain className="w-6 h-6" />
            </div>
            <span className="font-serif italic text-xl font-bold tracking-tight">{UI_TEXT.hikingTitle[locale]}</span>
          </div>
          <p className="text-linen/40 text-sm font-light">
            Built with React, Leaflet & Mi Fitness Data. &copy; 2026 Hiking Project.
          </p>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.4);
        }
        .leaflet-container {
          background: #0a0a0a !important;
        }
      `}</style>
    </div>
  );
};

export default GoFor2026;
