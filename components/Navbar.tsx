
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { UI_TEXT } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, toggleLocale } = useLanguage();

  const navLinks = [
    { name: UI_TEXT.navAbout[locale], href: '#about' },
    { name: UI_TEXT.navResearch[locale], href: '#research' },
    { name: UI_TEXT.navLife[locale], href: '#life' },
    { name: UI_TEXT.navExperience[locale], href: '#experience' },
    { name: UI_TEXT.navContact[locale], href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-linen/90 backdrop-blur-md border-b border-moss/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="font-serif text-2xl font-bold text-moss tracking-tight">
          Zenghui Li<span className="text-gold">.</span>
          <span className="hidden sm:inline ml-2 text-moss/30 font-sans text-sm font-normal">李增辉</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] lg:text-xs font-bold text-charcoal/70 hover:text-moss transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={toggleLocale}
            className="px-3 py-1 border border-moss/20 rounded-full text-[10px] font-bold text-moss hover:bg-moss hover:text-linen transition-all uppercase tracking-tighter"
          >
            {locale === 'en' ? '中文' : 'EN'}
          </button>
        </div>

        <button className="md:hidden text-moss focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-moss text-linen absolute top-full left-0 w-full h-screen flex flex-col items-center justify-center space-y-8 py-12">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-2xl font-serif hover:text-gold transition-colors" onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          <button onClick={() => { toggleLocale(); setIsOpen(false); }} className="text-gold font-bold">
            {locale === 'en' ? '切换至中文' : 'Switch to English'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
