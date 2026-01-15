import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Research from '../components/Research';
import LifeLog from '../components/LifeLog';
import Timeline from '../components/Timeline';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
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
    // Initial scroll if hash is present
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <div className="fixed top-0 left-12 w-px h-full bg-moss/5 z-0 hidden lg:block"></div>
      <div className="fixed top-0 right-12 w-px h-full bg-moss/5 z-0 hidden lg:block"></div>
      
      <Navbar />
      <Hero />
      <About />
      <Research />
      <LifeLog />
      <Timeline />
      <Footer />
    </main>
  );
};

export default HomePage;
