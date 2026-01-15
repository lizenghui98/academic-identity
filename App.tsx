import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageContext';
import HomePage from './pages/HomePage';
import GoFor2026 from './pages/GoFor2026';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/go-for-2026" element={<GoFor2026 />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
