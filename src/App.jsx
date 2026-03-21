import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';

function App() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `/#`;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-background text-slate-900">
        {/* Navigation Bar */}
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 py-4 px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold flex items-center gap-2 text-slate-900">
            <span className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">R</span>
            Resume Builder
          </Link>
          
          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 uppercase text-xs tracking-widest">
            <button onClick={() => scrollToSection('features')} className="hover:text-blue-600 transition-colors uppercase">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-blue-600 transition-colors uppercase">How it Works</button>
            <Link to="/builder" className="hover:text-blue-600 transition-colors uppercase">Start</Link>
          </div>
          
          {/* Right Side Button */}
          <div className="flex shrink-0">
            <Link to="/builder" className="btn-primary py-2 px-3 sm:px-5 text-sm sm:text-base whitespace-nowrap">
              Start <span className="hidden sm:inline">Building</span>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24 pb-12">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/builder" element={<BuilderPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
