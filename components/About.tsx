
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { UI_TEXT, SKILLS_DATA, ABOUT_ASSETS } from '../constants';

const About: React.FC = () => {
  const { locale } = useLanguage();
  const [bubble, setBubble] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoActive, setIsAutoActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAutoActive(true);
          setTimeout(() => {
            setIsAutoActive(false);
          }, 3000);
          // 停止观察，因为只需要触发一次
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    const quotes = UI_TEXT.aboutQuotes[locale];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setBubble(randomQuote);
    setTimeout(() => setBubble(null), 2500);
  };

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32 px-6 md:px-24 bg-linen relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Interactive Double Headshot Container */}
        <div className="relative w-full md:w-2/5 flex justify-center items-center h-[400px]">
          <div 
            className="relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
          >
            {/* Dialogue Bubble */}
            {bubble && (
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-moss text-linen px-4 py-2 rounded-2xl text-xs font-bold animate-bounce z-50 shadow-xl whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-moss">
                {bubble}
              </div>
            )}

            {/* Background "Peeking" Head (小朋友) */}
            <div className={`absolute transition-all duration-500 transform ${(isHovered || isAutoActive) ? 'animate-peek' : 'opacity-0 translate-y-10'}`}>
               <img 
                src={ABOUT_ASSETS.sticker1} 
                className="w-32 h-32 md:w-40 md:h-40 object-contain sticker-effect"
                alt="Secondary funny avatar"
               />
            </div>

            {/* Background "Peeking" Head Left (另一个贴纸) */}
            <div className={`absolute transition-all duration-500 transform ${(isHovered || isAutoActive) ? 'animate-peek-left' : 'opacity-0 translate-y-10'}`}>
               <img 
                src={ABOUT_ASSETS.sticker2} 
                className="w-32 h-32 md:w-40 md:h-40 object-contain sticker-effect"
                alt="Tertiary funny avatar"
               />
            </div>

            {/* Primary Head (你) */}
            <div className="relative z-10 group">
              <div className="w-56 h-56 md:w-72 md:h-72 frog-mask overflow-hidden border-4 border-frog/20 bg-moss/5 hover:bg-transparent transition-all">
                <img 
                  src={ABOUT_ASSETS.mainAvatar} 
                  className="w-full h-full object-contain sticker-effect transform group-hover:scale-110 transition-transform duration-500"
                  alt="Primary funny avatar"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-gold text-white text-[10px] font-bold py-1 px-3 rounded-full rotate-[-10deg] shadow-lg animate-float">
                AG-ECON SURVIVOR
              </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-3/5 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif text-moss flex items-center gap-4">
            {UI_TEXT.aboutTagline[locale]}
            <span className="text-2xl animate-pulse">🌱</span>
          </h2>
          
          <div className="space-y-6 text-lg text-charcoal/80 leading-relaxed font-light">
            {UI_TEXT.aboutBio[locale]}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-moss/10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-3">{UI_TEXT.skillsTitle[locale]}</h4>
              <ul className="text-sm space-y-2 text-charcoal/70">
                {SKILLS_DATA.programming[locale].map(s => <li key={s} className="flex items-center gap-2"><span className="w-1 h-1 bg-moss rounded-full"></span>{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate mb-3">{UI_TEXT.skillMedia[locale]}</h4>
              <ul className="text-sm space-y-2 text-charcoal/70">
                {SKILLS_DATA.software[locale].map(s => <li key={s} className="flex items-center gap-2"><span className="w-1 h-1 bg-slate rounded-full"></span>{s}</li>)}
              </ul>
            </div>
          </div>

          <div className="pt-6">
            <a href="#" className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-white rounded-full font-bold uppercase tracking-widest hover:bg-moss transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gold/20">
              <span>{UI_TEXT.downloadCV[locale]}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
