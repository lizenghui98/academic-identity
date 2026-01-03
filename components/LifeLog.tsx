
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { LIFE_LOG_IMAGES, UI_TEXT } from '../constants';

const LifeLog: React.FC = () => {
  const { locale } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Fix: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to resolve cross-environment type definition errors
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % LIFE_LOG_IMAGES.length);
      setIsTransitioning(false);
    }, 500);
    startTimer(); // 重置计时器
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? LIFE_LOG_IMAGES.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 500);
    startTimer();
  };

  return (
    <section id="life" className="py-32 px-6 md:px-24 bg-charcoal text-linen overflow-hidden relative">
      {/* Background Decorative Element: Large blurry colored orb based on current photo */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-moss/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-0 items-center relative">
          
          {/* Left Column: Index & Context (Editorial Style) */}
          <div className="w-full lg:w-1/3 space-y-12 z-20 pointer-events-none">
            <div className="pointer-events-auto">
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-linen leading-none tracking-tighter mb-4 mix-blend-difference">
                {UI_TEXT.navLife[locale]}
              </h2>
              <div className="h-2 w-24 bg-gold"></div>
            </div>

            <div className="hidden lg:block">
              <span className="text-9xl font-serif text-white/10 font-bold italic block -mb-8">
                0{currentIndex + 1}
              </span>
              <p className="text-sm font-bold uppercase tracking-[0.4em] text-gold/80 vertical-text h-64">
                {locale === 'zh' ? '· 生活即学术 · 记录瞬间 ·' : '· LIFE AS RESEARCH · MOMENTS ·'}
              </p>
            </div>

            <div className="flex items-center gap-6 pointer-events-auto">
              <button 
                onClick={handlePrev} 
                className="w-14 h-14 flex items-center justify-center border border-linen/30 rounded-full hover:bg-gold hover:border-gold transition-all group backdrop-blur-sm"
              >
                <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={handleNext} 
                className="w-14 h-14 flex items-center justify-center border border-linen/30 rounded-full hover:bg-gold hover:border-gold transition-all group backdrop-blur-sm"
              >
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Right Column: Large Cinema Display (Overlap with Left) */}
          <div className="w-full lg:w-3/4 -ml-0 lg:-ml-32 mt-12 lg:mt-0 relative z-10">
            <div className="relative aspect-[4/5] md:aspect-[16/9] overflow-visible group">
              {/* Decorative Frame Elements */}
              <div className="absolute -inset-6 border border-white/10 rounded-sm -z-10 group-hover:-inset-10 transition-all duration-700"></div>
              
              {/* The Image Container with Organic Feel */}
              <div className={`w-full h-full transition-all duration-1000 ease-in-out shadow-[0_0_80px_rgba(0,0,0,0.8)] ${isTransitioning ? 'opacity-0 scale-[0.95] blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                <img
                  src={LIFE_LOG_IMAGES[currentIndex].url}
                  className="w-full h-full object-cover rounded-sm brightness-75 group-hover:brightness-90 transition-all duration-[10s]"
                  alt="Life Log Photo"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80';
                  }}
                />
              </div>

              {/* Top Index Overlay (Mobile Only) */}
              <div className="absolute top-6 left-6 lg:hidden">
                 <span className="text-4xl font-serif text-white/20 italic font-bold">0{currentIndex + 1}</span>
              </div>
            </div>

            {/* 配文显示在图片下方 */}
            <div className={`mt-10 transition-all duration-1000 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <p className="text-white font-serif text-xl md:text-2xl italic leading-relaxed text-center drop-shadow-lg">
                {LIFE_LOG_IMAGES[currentIndex].caption[locale]}
              </p>
            </div>

            {/* Bottom Progress Bar */}
            <div className="mt-10 flex items-center gap-6 px-4 md:px-20">
              <div className="flex-grow h-[2px] bg-white/10 relative overflow-hidden">
                 <div key={currentIndex} className="absolute top-0 left-0 h-full bg-gold animate-progress"></div>
              </div>
              <div className="flex gap-3">
                {LIFE_LOG_IMAGES.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 transition-all duration-500 ${idx === currentIndex ? 'w-12 bg-gold' : 'w-3 bg-white/20'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footnote Decoration */}
        <div className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center opacity-30">
           <p className="text-[10px] font-bold uppercase tracking-[0.5em]">Capture the soil. Record the thought.</p>
           <p className="text-[10px] font-bold uppercase tracking-[0.5em]">Z.H. Li / Ph.D.</p>
        </div>
      </div>
    </section>
  );
};

export default LifeLog;