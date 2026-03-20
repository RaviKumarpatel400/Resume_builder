import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-textMain">
        {/* Navigation Bar */}
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 py-4 px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold flex items-center gap-2 text-slate-900">
            <span className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">R</span>
            Resume Builder
          </Link>
          
          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <Link to="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link to="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</Link>
            <Link to="/builder" className="hover:text-blue-600 transition-colors">Start</Link>
          </div>
          
          {/* Right Side Button */}
          <div>
            <Link to="/builder" className="btn-primary py-2 px-5">
              Start Building
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
