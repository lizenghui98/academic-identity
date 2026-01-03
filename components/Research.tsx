
import React from 'react';
import { useLanguage } from './LanguageContext';
import { RESEARCH_PROJECTS, UI_TEXT } from '../constants';

const Research: React.FC = () => {
  const { locale } = useLanguage();

  return (
    <section id="research" className="py-24 px-6 md:px-24 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif text-moss mb-6">{UI_TEXT.navResearch[locale]}</h2>
            <p className="text-xl text-charcoal/60 font-light italic">
              {UI_TEXT.researchSub[locale]}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {RESEARCH_PROJECTS.map((project) => (
            <div key={project.id} className="group relative bg-white p-8 border border-moss/5 hover:border-moss/20 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-xl">
              <div className="space-y-2 mb-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate">
                  {project.tag[locale]}
                </div>
                {project.authorRole && (
                  <div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gold text-white tracking-wider inline-block">
                      {project.authorRole[locale]}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-moss mb-4 group-hover:text-gold transition-colors leading-snug">
                {project.title[locale]}
              </h3>
              <p className="text-charcoal/70 font-light mb-8 flex-grow line-clamp-4">
                {project.description[locale]}
              </p>
              <div className="mt-auto pt-6 flex items-center justify-between">
                <a href={project.link} className="text-sm font-bold uppercase tracking-widest text-moss hover:text-gold transition-colors flex items-center gap-2">
                  {UI_TEXT.viewProject[locale]}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
