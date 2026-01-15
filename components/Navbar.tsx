
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { UI_TEXT } from '../constants';

import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, toggleLocale } = useLanguage();
  const location = useLocation();

  const isHikingPage = location.pathname === '/go-for-2026';

  const navLinks = [
    { name: UI_TEXT.navAbout[locale], href: isHikingPage ? '/#about' : '#about' },
    { name: UI_TEXT.navResearch[locale], href: isHikingPage ? '/#research' : '#research' },
    { name: UI_TEXT.navLife[locale], href: isHikingPage ? '/#life' : '#life' },
    { name: UI_TEXT.navExperience[locale], href: isHikingPage ? '/#experience' : '#experience' },
    { name: UI_TEXT.navContact[locale], href: isHikingPage ? '/#contact' : '#contact' },
    { name: locale === 'zh' ? '登山计划' : 'Hiking 2026', href: '/go-for-2026', special: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isHikingPage ? 'bg-neutral-950/80 backdrop-blur-md border-b border-gold/10' : 'bg-linen/90 backdrop-blur-md border-b border-moss/10'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <Link to="/" className={`font-serif text-2xl font-bold tracking-tight ${isHikingPage ? 'text-gold' : 'text-moss'}`}>
          Zenghui Li<span className={isHikingPage ? 'text-linen' : 'text-gold'}>.</span>
          <span className={`hidden sm:inline ml-2 font-sans text-sm font-normal ${isHikingPage ? 'text-linen/30' : 'text-moss/30'}`}>李增辉</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navLinks.map((link) => (
            link.special ? (
              <Link 
                key={link.name} 
                to={link.href}
                className={`text-[10px] lg:text-xs font-bold transition-all uppercase tracking-widest px-4 py-2 rounded-full ${
                  isHikingPage 
                    ? 'bg-gold text-neutral-950 shadow-lg shadow-gold/20' 
                    : 'bg-moss/5 text-moss hover:bg-gold hover:text-neutral-950'
                }`}
              >
                {link.name}
              </Link>
            ) : (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-[10px] lg:text-xs font-bold transition-colors uppercase tracking-widest ${isHikingPage ? 'text-linen/60 hover:text-gold' : 'text-charcoal/70 hover:text-moss'}`}
                >
                  {link.name}
                </Link>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-[10px] lg:text-xs font-bold transition-colors uppercase tracking-widest ${isHikingPage ? 'text-linen/60 hover:text-gold' : 'text-charcoal/70 hover:text-moss'}`}
                >
                  {link.name}
                </a>
              )
            )
          ))}
          
          <button 
            onClick={toggleLocale}
            className={`px-3 py-1 border rounded-full text-[10px] font-bold transition-all uppercase tracking-tighter ${
              isHikingPage 
                ? 'border-gold/30 text-gold hover:bg-gold hover:text-neutral-950' 
                : 'border-moss/20 text-moss hover:bg-moss hover:text-linen'
            }`}
          >
            {locale === 'en' ? '中文' : 'EN'}
          </button>
        </div>

        <button className={`md:hidden focus:outline-none ${isHikingPage ? 'text-gold' : 'text-moss'}`} onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full h-screen flex flex-col items-center justify-center space-y-8 py-12 ${isHikingPage ? 'bg-neutral-950 text-linen' : 'bg-moss text-linen'}`}>
          {navLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`text-2xl font-serif transition-colors ${link.special ? 'text-gold italic' : 'hover:text-gold'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-2xl font-serif hover:text-gold transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            )
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
