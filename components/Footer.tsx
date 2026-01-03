
import React from 'react';
import { useLanguage } from './LanguageContext';
import { UI_TEXT } from '../constants';

const Footer: React.FC = () => {
  const { locale } = useLanguage();

  const navLinks = [
    { name: UI_TEXT.navAbout[locale], href: '#about' },
    { name: UI_TEXT.navResearch[locale], href: '#research' },
    { name: UI_TEXT.navLife[locale], href: '#life' },
    { name: UI_TEXT.navExperience[locale], href: '#experience' },
  ];

  return (
    <footer id="contact" className="bg-moss text-linen pt-24 pb-12 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-24">
          <div className="max-w-md space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-linen leading-tight">{UI_TEXT.footerTag[locale]}</h2>
            <div className="space-y-4 pt-4">
              <a href="mailto:lizenghui98@zju.edu.cn" className="block text-xl md:text-2xl font-light hover:text-gold transition-colors">lizenghui98@zju.edu.cn</a>
              <p className="text-linen/40 uppercase tracking-widest text-xs font-bold">{UI_TEXT.location[locale]}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-12">
            <div className="space-y-4">
              <p className="text-gold font-bold uppercase tracking-widest text-xs">{UI_TEXT.footerNav[locale]}</p>
              <ul className="space-y-2 text-sm text-linen/60">
                {navLinks.map(link => (
                  <li key={link.name}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-gold font-bold uppercase tracking-widest text-xs">{UI_TEXT.footerResearchNodes[locale]}</p>
              <ul className="space-y-2 text-sm text-linen/60">
                <li><a href="#" className="hover:text-white">Google Scholar</a></li>
                <li><a href="#" className="hover:text-white">ORCID Profile</a></li>
                <li><a href="#" className="hover:text-white">ResearchGate</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-gold font-bold uppercase tracking-widest text-xs">{UI_TEXT.footerConnect[locale]}</p>
              <ul className="space-y-2 text-sm text-linen/60">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WeChat</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-linen/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-linen/30">
          <p>© 2026 ZENGHUI LI — ZHEJIANG UNIVERSITY</p>
          <p>Built With Gemini 3.0 Flash</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
