
import React, { useEffect } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import LifeLog from './components/LifeLog'; // 新增
import Timeline from './components/Timeline';
import Footer from './components/Footer';

const App: React.FC = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <LanguageProvider>
      <main className="min-h-screen relative overflow-x-hidden">
        <div className="fixed top-0 left-12 w-px h-full bg-moss/5 z-0 hidden lg:block"></div>
        <div className="fixed top-0 right-12 w-px h-full bg-moss/5 z-0 hidden lg:block"></div>
        
        <Navbar />
        <Hero />
        <About />
        <Research />
        <LifeLog /> {/* 新增 */}
        <Timeline />
        <Footer />
      </main>
    </LanguageProvider>
  );
};

export default App;
