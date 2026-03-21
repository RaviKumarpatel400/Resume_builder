import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Wand2, ShieldCheck, Download, Users, FileText, PenTool, Eye, Linkedin, Twitter, Github, Mail, Phone, MapPin } from 'lucide-react';

const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [
    '/images/hero-1.png',
    '/images/hero-2.png',
    '/images/hero-3.png'
  ];

  // Auto-changing images effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 2000); // Changed within 2 seconds for visibility, adjusted from "within a second" for better UX
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const features = [
    {
      icon: <Wand2 className="w-6 h-6 text-blue-600" />,
      title: "AI-Powered Intelligence",
      description: "Auto-capitalization and spell corrections to ensure your resume is flawlessly written.",
      color: "bg-blue-100"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      title: "Real-Time Validation",
      description: "See your modifications instantly with our pixel-perfect A4 canvas preview.",
      color: "bg-blue-100"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Time-Controlled Access",
      description: "Exclusive access. Create and export within 20 minutes of server load for high security.",
      color: "bg-blue-100"
    },
    {
      icon: <Download className="w-6 h-6 text-blue-600" />,
      title: "Encrypted PDFs",
      description: "Secure your document against unauthorized viewers with unique password protection.",
      color: "bg-blue-100"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Instant Sharing",
      description: "Share directly to Email or WhatsApp with secure, expiring links tracked via Analytics.",
      color: "bg-blue-100"
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Professional Formats",
      description: "ATS-friendly layouts designed by industry experts to get past resume screeners.",
      color: "bg-blue-100"
    }
  ];

  return (
    <div className="relative overflow-hidden selection:bg-blue-600 selection:text-white bg-white">
      {/* Subtle Dot Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#bfdbfe_1px,transparent_1px)] [background-size:32px_32px] opacity-40 z-0"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-600 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>The Future of Resume Building</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] sm:leading-[1.05] tracking-tight">
              Hire-Ready <br />
              <span className="text-blue-600">Resumes.</span> <br className="hidden sm:block" />
              Instant Results.
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-700 font-medium max-w-xl leading-relaxed">
              Create an expert, ATS-optimized resume in under 10 minutes. Real-time analytics, professional layouts, and world-class security.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link to="/builder" className="btn-primary flex items-center gap-2 text-lg w-full sm:w-auto px-8 py-4 text-center">
                Start Building Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="#how-it-works" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline w-full sm:w-auto px-8 py-4 text-center">
                How It Works
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-6">
              {[
                { label: "100+", sub: "Users" },
                { label: "4.9/5", sub: "Rating" },
                { label: "100%", sub: "Secure" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl font-black text-slate-900">{stat.label}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square sm:aspect-video lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border-4 sm:border-8 border-white shadow-2xl bg-blue-50"
          >
            <AnimatePresence mode='wait'>
              <motion.img
                key={currentImage}
                src={heroImages[currentImage]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover"
                alt="Resume Builder Preview"
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* "What" Section - Value Proposition */}
      <section id="what" className="py-32 relative z-10 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-bold">What is the Resume Builder?</h2>
          <p className="text-lg text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed mb-16">
            More than just a template. Our engine analyzes your professional story in real-time, ensuring you present the best version of your career to every recruiter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Dynamic Data", desc: "Your experience is unique; your resume should be too. We adapt to your professional level.", icon: <FileText className="text-blue-600" /> },
              { title: "Smart Guard", desc: "Our system detects errors, duplicate skills, and formatting issues before they reach a recruiter.", icon: <ShieldCheck className="text-blue-600" /> },
              { title: "Live Sync", desc: "Every keystroke is reflected in a pixel-perfect A4 canvas that stays consistent across devices.", icon: <PenTool className="text-blue-600" /> },
              { title: "Fast Delivery", desc: "Finish your masterpiece in record time and share it securely via encrypted channels.", icon: <ArrowRight className="text-blue-600" /> }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-black text-slate-900 mb-2 font-bold">{item.title}</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Features Grid */}
      <section id="features" className="py-32 relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2 block">System Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-bold">Engineered for Perfection</h2>
          </div>
          <p className="text-slate-700 font-medium max-w-sm leading-relaxed">Reimagined structure offering unparalleled validation and high-fidelity sharing.</p>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {features.map((feature, idx) => (
             <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative p-10 bg-white border border-blue-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
             >
                {/* Numeric ID */}
                <div className="absolute top-8 right-8 text-4xl font-black text-blue-50/50 group-hover:text-blue-100/50 transition-colors duration-500">
                   {String(idx + 1).padStart(2, '0')}
                </div>

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                   {feature.icon}
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 tracking-tight font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-600 font-medium text-base leading-relaxed">{feature.description}</p>
                
                {/* Subtle bottom bar on hover */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             </motion.div>
           ))}
         </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 relative z-10 max-w-6xl mx-auto px-6 md:px-12 border-t border-blue-100">
        <div className="text-center mb-20 text-center">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2 block text-center">The Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 text-center font-bold">Mastery in Three Steps</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connection Line (Desktop only) */}
          <div className="hidden md:block absolute top-[64px] left-0 w-full h-[2px] bg-blue-50 z-0"></div>

          {[
            {
              step: "01",
              icon: <PenTool className="w-6 h-6 text-blue-600" />,
              title: "Craft Content",
              description: "Input your career highlights. Our assistant handles the styling, grammar, and layout."
            },
            {
              step: "02",
              icon: <Eye className="w-6 h-6 text-blue-600" />,
              title: "Live Review",
              description: "View immediate analysis of your word count and reading time on the A4 canvas."
            },
            {
              step: "03",
              icon: <Download className="w-6 h-6 text-blue-600" />,
              title: "Instant Export",
              description: "Download a production-grade PDF or share it via secure, one-time-access links."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-blue-100 flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-400 group-hover:shadow-md transition-all duration-300">
                {item.icon}
              </div>
              <div className="text-xs font-black text-blue-500 mb-2 tracking-widest uppercase">{item.step}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-bold">{item.title}</h3>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 items-center md:items-start text-center md:text-left">
            {/* Brand Col */}
            <div className="space-y-6 flex flex-col items-center md:items-start">
              <div className="text-2xl font-black flex items-center gap-2 font-bold">
                <span className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">R</span>
                Resume Builder
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Empowering professionals to tell their story with precision and style. The world's most advanced secure resume engine.
              </p>
              <div className="flex gap-4">
                <Link to="#" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors"><Linkedin className="w-4 h-4" /></Link>
                <Link to="#" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors"><Twitter className="w-4 h-4" /></Link>
                <Link to="#" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors"><Github className="w-4 h-4" /></Link>
              </div>
            </div>

            {/* Product Col */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-6 font-bold">Product</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-400 font-bold">
                <li><Link to="/builder" className="hover:text-white transition-colors">Resume Engine</Link></li>
                <li><Link to="#features" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Analytics Panel</Link></li>
                <li><Link to="#what" onClick={() => document.getElementById('what')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Smart Validator</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Security Specs</Link></li>
              </ul>
            </div>

            {/* Support Col */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-6 font-bold">Resources</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-400 font-bold">
                <li><Link to="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">API Reference</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Terms of Use</Link></li>
              </ul>
            </div>

            {/* Contact Col */}
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-6 font-bold">Get in Touch</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-400 font-bold flex flex-col items-center md:items-start">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-blue-600" /> hello@resumebuilder.com</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-blue-600" /> +1 (800) RESUME-ME</li>
                <li className="flex items-center gap-3 text-center md:text-left"><MapPin className="w-4 h-4 text-blue-600" /> Innovation Drive, Tech Valley</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
            <p>© {new Date().getFullYear()} Professional Resume Builder. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <Link to="#" className="hover:text-white transition-colors">License</Link>
              <Link to="#" className="hover:text-white transition-colors">Changelog</Link>
              <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
