
import React, { useEffect, useState } from 'react';

const DynamicChart: React.FC = () => {
  const [points, setPoints] = useState<number[]>([]);

  useEffect(() => {
    // Generate some initial random points
    setPoints(Array.from({ length: 20 }, () => Math.random() * 50 + 10));

    const interval = setInterval(() => {
      setPoints(prev => {
        const next = [...prev.slice(1), Math.random() * 50 + 10];
        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const width = 200;
  const height = 60;
  const padding = 5;

  const pathData = points.map((p, i) => {
    const x = (width / (points.length - 1)) * i;
    const y = height - p - padding;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="flex items-center gap-4 mt-8 opacity-60">
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={pathData}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000 ease-in-out"
        />
        {points.map((p, i) => (
          <circle 
            key={i}
            cx={(width / (points.length - 1)) * i}
            cy={height - p - padding}
            r="2"
            fill="#4A6FA5"
          />
        ))}
      </svg>
      <span className="text-[10px] uppercase tracking-tighter text-slate font-bold">Live Research Feed</span>
    </div>
  );
};

export default DynamicChart;
