import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Wand2, ShieldCheck, Download, Users, FileText, PenTool, Eye } from 'lucide-react';

const LandingPage = () => {
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
    <div className="relative overflow-hidden selection:bg-blue-600 selection:text-white px-6 md:px-12 bg-white">
      {/* Subtle Dot Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#bfdbfe_1px,transparent_1px)] [background-size:24px_24px] opacity-60 z-0 text-slate-900"></div>
      
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center pt-16">
        <motion.div
           initial="hidden"
           animate="visible"
           variants={containerVariants}
           className="max-w-3xl mx-auto space-y-6"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-600 mb-2 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>The Enterprise Resume Solution</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="heading-hero leading-[1.1] pb-2 text-slate-900">
            Build a Resume That <br />
            <span className="text-blue-600">Opens Doors.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            Create, manage, and share professional, ATS-optimized resumes in minutes. Powered by intelligent real-time validation and bank-level security.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/builder" className="btn-primary flex items-center gap-2 text-lg w-full sm:w-auto">
              Start Building Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="#features" className="btn-outline w-full sm:w-auto">
              View Capabilities
            </Link>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-xs font-semibold text-slate-500 mt-4 flex items-center justify-center gap-1.5">
             <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             No sign-up required // 20-min session limit
          </motion.p>
        </motion.div>
      </section>

      {/* Dashboard Preview Mockup Container */}
      <section className="relative z-10 w-full max-w-5xl mx-auto -mt-10 mb-32">
        <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, delay: 0.4 }}
            className="rounded-2xl border border-blue-200 bg-white shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Top Bar Mock */}
            <div className="h-10 bg-blue-50 border-b border-blue-200 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              </div>
              <div className="mx-auto w-64 h-5 bg-white border border-blue-200 rounded text-[10px] text-slate-500 flex items-center justify-center font-medium">resume-builder.com/session</div>
            </div>
            {/* Split View Mock */}
            <div className="h-[400px] flex bg-white relative overflow-hidden">
               {/* Left Pane */}
               <div className="w-1/3 border-r border-blue-100 bg-blue-50/30 p-6 flex flex-col gap-4">
                 <div className="h-4 w-1/3 bg-blue-200 rounded"></div>
                 <div className="h-10 w-full bg-blue-100 border border-blue-200 rounded-lg"></div>
                 <div className="h-10 w-full bg-blue-100 border border-blue-200 rounded-lg mt-2"></div>
                 <div className="h-20 w-full bg-blue-100 border border-blue-200 rounded-lg mt-2"></div>
               </div>
               {/* Right Pane */}
               <div className="w-2/3 flex items-center justify-center bg-blue-50 relative">
                  <div className="w-[60%] h-[85%] bg-white border border-blue-200 shadow-md rounded flex flex-col p-6 gap-4">
                     <div className="w-1/2 h-5 bg-blue-300 rounded mx-auto mb-2"></div>
                     <div className="w-full h-px bg-blue-200"></div>
                     <div className="w-full h-2 bg-blue-200 rounded"></div>
                     <div className="w-5/6 h-2 bg-blue-200 rounded"></div>
                     <div className="w-4/6 h-2 bg-blue-200 rounded"></div>
                  </div>
               </div>
            </div>
        </motion.div>
      </section>

      {/* Structured Features Grid */}
      <section id="features" className="py-20 relative z-10 max-w-6xl mx-auto border-t border-blue-100">
         <div className="text-center mb-16">
           <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2 block">System Capabilities</span>
           <h2 className="heading-section text-4xl text-slate-900">Engineered for Perfection</h2>
           <p className="text-slate-700 font-medium mt-4 max-w-xl mx-auto">Reimagined structure offering unparalleled validation, analytics, and sharing performance.</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {features.map((feature, idx) => (
             <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="card-light p-8 group flex flex-col gap-3"
             >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${feature.color}`}>
                   {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-slate-700 font-medium text-sm leading-relaxed">{feature.description}</p>
             </motion.div>
           ))}
         </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 relative z-10 max-w-6xl mx-auto border-t border-blue-100">
         <div className="text-center mb-16">
           <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2 block">The Process</span>
           <h2 className="heading-section text-4xl text-slate-900">How It Works</h2>
           <p className="text-slate-700 font-medium mt-4 max-w-xl mx-auto">Create your professional resume in three simple, secure steps.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Line (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-50 -translate-y-12 z-0"></div>
            
            {[
              {
                step: "01",
                icon: <PenTool className="w-6 h-6 text-blue-600" />,
                title: "Enter Your Details",
                description: "Fill in your experience, education, and skills. Our smart engine auto-validates your content as you type."
              },
              {
                step: "02",
                icon: <Eye className="w-6 h-6 text-blue-600" />,
                title: "Real-time Preview",
                description: "Watch your resume take shape on a pixel-perfect A4 canvas. Adjust formatting and content instantly."
              },
              {
                step: "03",
                icon: <Download className="w-6 h-6 text-blue-600" />,
                title: "Secure Export",
                description: "Download your password-protected PDF or share it via a tracked, expiring link for total control."
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
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-blue-100 flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300">
                  {item.icon}
                </div>
                <div className="text-xs font-black text-blue-600 mb-2 tracking-widest uppercase">{item.step}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
         </div>
      </section>

      <footer className="mt-20 border-t border-blue-100 text-center py-6 text-sm font-medium text-slate-500 bg-white">
        <p>&copy; {new Date().getFullYear()} Professional Resume Builder. Built with precision.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
