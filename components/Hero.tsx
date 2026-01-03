
import React from 'react';
import { useLanguage } from './LanguageContext';
import { UI_TEXT, HERO_IMAGE, HERO_FOOTER_TEXT, HERO_ASSETS } from '../constants';
import DynamicChart from './DynamicChart';

const Hero: React.FC = () => {
  const { locale } = useLanguage();

  const navLinks = [
    { name: UI_TEXT.navAbout[locale], href: '#about' },
    { name: UI_TEXT.navResearch[locale], href: '#research' },
    { name: UI_TEXT.navLife[locale], href: '#life' },
    { name: UI_TEXT.navExperience[locale], href: '#experience' },
    { name: UI_TEXT.navContact[locale], href: '#contact' },
  ];

  return (
    <section className="relative min-h-screen pt-24 md:pt-0 flex flex-col md:flex-row items-center overflow-hidden bg-grid">
      <div className="w-full md:w-3/5 px-6 md:px-24 py-12 md:py-0 z-10">
        <div className="space-y-4 relative">
          <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-bold uppercase tracking-[0.2em] rounded">
            {UI_TEXT.heroTag[locale]}
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-moss leading-tight group relative">
            {locale === 'zh' ? '李增辉' : 'Zenghui Li'}<span className="text-gold">.</span>
            
            {/* 隐藏的彩蛋：鼠标移到名字上时，小朋友的头会从名字后面冒出来 */}
            <div className="absolute -top-32 -right-32 w-64 h-64 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 pointer-events-none">
              <div className="relative w-full h-full">
                <img 
                  src={HERO_ASSETS.easterEggKid} 
                  className="w-full h-full object-contain rotate-12 sticker-effect"
                  alt="Easter egg"
                />
                <div className="absolute top-10 -left-40 bg-moss text-linen px-3 py-1.5 rounded-2xl text-xs font-bold shadow-xl animate-bounce whitespace-nowrap after:content-[''] after:absolute after:top-1/2 after:left-full after:-translate-y-1/2 after:border-8 after:border-transparent after:border-l-moss">
                  {UI_TEXT.easterEggText[locale]}
                </div>
              </div>
            </div>
          </h1>
          <p className="text-xl md:text-3xl text-charcoal/80 font-light max-w-2xl leading-relaxed text-balance">
            {UI_TEXT.heroBio[locale]}
          </p>
        </div>
        <div className="relative inline-block">
          <DynamicChart />
        </div>
      </div>

      <div className="w-full md:w-2/5 h-[400px] md:h-screen relative overflow-hidden group">
        <div className="absolute inset-0 bg-transparent z-10 transition-all duration-700 group-hover:bg-moss/80 backdrop-blur-0 group-hover:backdrop-blur-md"></div>
        <div className="w-full h-full scale-x-[-1]">
          <img 
            src={HERO_IMAGE} 
            alt="Modern Agricultural Pattern" 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
        </div>
        
        {/* Sliding Navigation Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-12 group-hover:translate-x-0">
          <div className="space-y-8 text-center">
            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-12 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">Navigation</p>
            {navLinks.map((link, index) => (
              <a 
                key={link.name} 
                href={link.href}
                className="block text-3xl md:text-4xl lg:text-5xl font-serif text-linen hover:text-gold transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 opacity-0 group-hover:opacity-100"
                style={{ 
                  transitionDelay: `${(index + 2) * 100}ms`,
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 right-12 z-20 text-linen text-right hidden md:block transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">{HERO_FOOTER_TEXT.top[locale]}</p>
          <p className="font-serif italic text-lg">{HERO_FOOTER_TEXT.bottom[locale]}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
