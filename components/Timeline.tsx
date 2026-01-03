
import React from 'react';
import { useLanguage } from './LanguageContext';
import { TIMELINE_DATA, UI_TEXT } from '../constants';

const Timeline: React.FC = () => {
  const { locale } = useLanguage();

  return (
    <section id="experience" className="py-24 px-6 md:px-24 bg-linen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-moss mb-20 text-center">{UI_TEXT.navExperience[locale]}</h2>
        
        <div className="relative">
          {/* 中轴线 - 降低层级 */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-moss via-moss/50 to-gold/20 z-0"></div>

          <div className="space-y-16 relative z-10">
            {TIMELINE_DATA.map((event, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-gold group hover:shadow-md transition-all relative z-20">
                    <span className="text-[10px] font-bold text-slate tracking-widest uppercase block mb-1">{event.year}</span>
                    <h4 className="text-lg font-serif text-moss mb-1">{event.title[locale]}</h4>
                    <p className="text-sm text-charcoal/60 font-medium">{event.institution[locale]}</p>
                  </div>
                </div>
                <div className="relative z-20 flex items-center justify-center w-10 h-10 bg-linen rounded-full border-2 border-moss text-moss shrink-0">
                  <div className="w-2 h-2 bg-moss rounded-full"></div>
                </div>
                <div className="hidden md:block w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
