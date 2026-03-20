import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, Printer, Plus, Trash2, ShieldAlert, BarChart, Check, Copy } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const formatLastEdited = (date) => {
  const datePart = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const timePart = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return `${datePart} – ${timePart}`;
};

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState({
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    phone: '+1 (555) 123-4567',
    summary: 'A passionate Full Stack Developer with 4 years of experience building scalable web applications. Dedicated to modern design principles and robust architectures.',
    education: [{ id: 1, degree: 'B.Sc. Computer Science', school: 'Tech University', year: '2022' }],
    experience: [{ id: 1, role: 'Frontend Engineer', company: 'Tech Solutions', duration: '2023 - Present' }],
    skills: ['React', 'Node.js', 'Tailwind CSS'],
    projects: [{ id: 1, title: 'AI Portfolio Builder', description: 'Built an automated resume generation platform using React.', role: 'Lead Developer' }],
    certifications: [{ id: 1, name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023' }],
    achievements: [{ id: 1, title: 'Dean\'s List', details: 'Top 5% of the graduating class at Tech University.' }]
  });

  const [stats, setStats] = useState({ words: 0, characters: 0, lettersWithSpaces: 0, paragraphs: 0, readTime: 0 });
  const [warnings, setWarnings] = useState([]);
  const [skillWarning, setSkillWarning] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [lastEdited, setLastEdited] = useState(formatLastEdited(new Date()));
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    try {
      setIsDownloading(true);
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error('PDF Generation Error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    const shareUrl = window.location.href;
    
    // Attempt Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Resume of ${resumeData.name}`,
          text: `Check out my resume built with Pro Resume Builder`,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share canceled or failed');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareUrl);
    }
    
    setTimeout(() => setIsSharing(false), 2000);
  };

  // Analytical & Smart Features Effect
  useEffect(() => {
    let wordCount = 0;
    let charCount = 0; // Excl. spaces
    let letterCountSpaces = 0; // Incl. spaces
    let paraCount = 0;
    
    const countText = (text) => {
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      wordCount += words.length;
      charCount += text.replace(/\s+/g, '').length;
      letterCountSpaces += text.length;
      paraCount += text.split(/\n+/).filter(p => p.trim().length > 0).length;
    };

    countText(resumeData.name + ' ' + resumeData.email + ' ' + resumeData.phone + ' ' + resumeData.summary);
    resumeData.education.forEach(e => countText(e.degree + ' ' + e.school + ' ' + e.year));
    resumeData.experience.forEach(e => countText(e.role + ' ' + e.company + ' ' + e.duration));
    resumeData.skills.forEach(s => countText(s));
    resumeData.projects.forEach(p => countText(p.title + ' ' + p.description + ' ' + p.role));
    resumeData.certifications.forEach(c => countText(c.name + ' ' + c.issuer + ' ' + c.year));
    resumeData.achievements.forEach(a => countText(a.title + ' ' + a.details));

    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    setStats({ words: wordCount, characters: charCount, lettersWithSpaces: letterCountSpaces, paragraphs: paraCount, readTime });

    setLastEdited(formatLastEdited(new Date()));

    // Word count warning
    if (wordCount > 700) {
      if (!warnings.includes("Word count exceeds 700 (Optimal standard)")) {
         setWarnings(prev => [...prev.filter(w=> !w.includes("Word count")), "Word count exceeds 700 (Optimal standard)"]);
      }
    } else {
      setWarnings(prev => prev.filter(w => !w.includes("Word count")));
    }
    
  }, [resumeData]);

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (type, index, field, value) => {
    const updated = [...resumeData[type]];
    updated[index][field] = value;
    setResumeData({ ...resumeData, [type]: updated });
  };

  const addItem = (type, template) => {
    setResumeData({ ...resumeData, [type]: [...resumeData[type], { id: Date.now(), ...template }] });
  };

  const removeItem = (type, index) => {
    const updated = resumeData[type].filter((_, i) => i !== index);
    setResumeData({ ...resumeData, [type]: updated });
  };

  // Smart Auto-Capitalize
  const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    
    const formattedSkill = toTitleCase(newSkill.trim());
    
    // Check duplication
    if (resumeData.skills.some(s => s.toLowerCase() === formattedSkill.toLowerCase())) {
        setSkillWarning(`Duplicate skill detected: ${formattedSkill}`);
        setTimeout(() => setSkillWarning(''), 3000);
        return;
    }

    setSkillWarning('');
    setResumeData({ ...resumeData, skills: [...resumeData.skills, formattedSkill] });
    setNewSkill('');
  };

  const removeSkill = (index) => {
    setResumeData({ ...resumeData, skills: resumeData.skills.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto min-h-[85vh] px-4 py-8 bg-white">
       {/* Sidebar Configuration Panel */}
       <div className="w-full lg:w-[500px] space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          
          <div className="card-light px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-blue-200">
             <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
               Last Edited: <span className="text-slate-900">{lastEdited}</span>
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={handleDownloadPDF} 
                  disabled={isDownloading}
                  className={`p-2 rounded-lg transition-all border border-blue-200 flex items-center justify-center ${isDownloading ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'}`} 
                  title="Download PDF"
                >
                  <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                </button>
                
                <button 
                   onClick={handlePrint}
                   className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors border border-blue-200" 
                   title="Print"
                >
                   <Printer className="w-4 h-4" />
                </button>
                
                <button 
                   onClick={handleShare}
                   className={`p-2 rounded-lg transition-all border border-blue-300 shadow-sm flex items-center justify-center ${isSharing ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`} 
                   title="Share Session"
                >
                   {isSharing ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                </button>
             </div>
          </div>

          {/* Analytics Panel */}
          <div className="card-light p-6 border-blue-200">
             <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900"><BarChart className="text-blue-600 w-5 h-5" /> Resume Content Analysis</h3>
             <div className="space-y-3 mb-4 text-sm font-medium text-slate-700">
                <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                   <span className="text-slate-500">Words</span>
                   <span className={`font-black ${stats.words < 300 || stats.words > 700 ? 'text-red-500' : 'text-slate-900'}`}>{stats.words}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                   <span className="text-slate-500">Characters</span>
                   <span className="font-black text-slate-900">{stats.characters}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                   <span className="text-slate-500">Letters (Including Spaces)</span>
                   <span className="font-black text-slate-900">{stats.lettersWithSpaces}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                   <span className="text-slate-500">Paragraphs</span>
                   <span className="font-black text-slate-900">{stats.paragraphs}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                   <span className="text-slate-500">Estimated Reading Time</span>
                   <span className="font-black text-slate-900">{stats.readTime} minutes</span>
                </div>
             </div>
             
             <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                <span className="text-xs font-bold text-slate-900 tracking-wider block mb-1">Rules:</span>
                <span className={`text-xs font-semibold ${stats.words >= 300 && stats.words <= 700 ? 'text-blue-700' : 'text-red-600'}`}>• Recommended length: 300–700 words</span>
             </div>
             {warnings.length > 0 && (
               <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex flex-col gap-2">
                 {warnings.map((w, i) => (
                    <div key={i} className="flex flex-start gap-2 text-red-600 font-medium text-sm items-center">
                       <ShieldAlert className="w-4 h-4 shrink-0" />
                       {w}
                    </div>
                 ))}
               </div>
             )}
          </div>

          {/* Form Sections */}
          <div className="card-light p-6 space-y-8 border-blue-200">
             
             {/* Personal Details */}
             <section>
               <h3 className="text-lg font-bold text-slate-900 border-b border-blue-200 pb-2 mb-4">Personal Details</h3>
               <div className="space-y-4">
                  <input type="text" name="name" value={resumeData.name} onChange={handleChange} className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-500" placeholder="Full Name" />
                  <div className="grid grid-cols-2 gap-4">
                     <input type="email" name="email" value={resumeData.email} onChange={handleChange} className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-500" placeholder="Email" />
                     <input type="text" name="phone" value={resumeData.phone} onChange={handleChange} className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-500" placeholder="Phone" />
                  </div>
                  <textarea name="summary" value={resumeData.summary} onChange={handleChange} className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none h-28 custom-scrollbar placeholder:text-slate-500" placeholder="Professional Summary"></textarea>
               </div>
             </section>

             {/* Experience */}
             <section>
               <div className="flex justify-between items-center border-b border-blue-200 pb-2 mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Experience</h3>
                  <button onClick={() => addItem('experience', { role: 'Position', company: 'Company Name', duration: 'Date - Date' })} className="text-blue-600 hover:bg-blue-100 p-1 rounded-md transition-colors"><Plus className="w-5 h-5"/></button>
               </div>
               <div className="space-y-4">
                  {resumeData.experience.map((exp, i) => (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={exp.id} className="p-4 bg-blue-50 rounded-xl border border-blue-200 relative group">
                        <button onClick={() => removeItem('experience', i)} className="absolute top-3 right-3 text-slate-500 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100">
                           <Trash2 className="w-4 h-4"/>
                        </button>
                        <input value={exp.role} onChange={(e) => handleArrayChange('experience', i, 'role', e.target.value)} className="w-full bg-transparent border-b-2 border-transparent hover:border-blue-300 focus:border-blue-600 outline-none text-slate-900 font-bold mb-3 pb-1 transition-all" placeholder="Role"/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                           <input value={exp.company} onChange={(e) => handleArrayChange('experience', i, 'company', e.target.value)} className="w-full bg-white rounded-md px-3 py-2 outline-none border border-blue-200 focus:border-blue-500 text-slate-800 font-medium shadow-sm placeholder:text-slate-400" placeholder="Company"/>
                           <input value={exp.duration} onChange={(e) => handleArrayChange('experience', i, 'duration', e.target.value)} className="w-full bg-white rounded-md px-3 py-2 outline-none border border-blue-200 focus:border-blue-500 text-slate-800 font-medium shadow-sm placeholder:text-slate-400" placeholder="Duration"/>
                        </div>
                    </motion.div>
                  ))}
               </div>
             </section>

             {/* Education */}
             <section>
               <div className="flex justify-between items-center border-b border-blue-200 pb-2 mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Education</h3>
                  <button onClick={() => addItem('education', { degree: 'Degree Name', school: 'University Name', year: 'Year' })} className="text-blue-600 hover:bg-blue-100 p-1 rounded-md transition-colors"><Plus className="w-5 h-5"/></button>
               </div>
               <div className="space-y-4">
                  {resumeData.education.map((edu, i) => (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={edu.id} className="p-4 bg-blue-50 rounded-xl border border-blue-200 relative group">
                        <button onClick={() => removeItem('education', i)} className="absolute top-3 right-3 text-slate-500 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100">
                           <Trash2 className="w-4 h-4"/>
                        </button>
                        <input value={edu.degree} onChange={(e) => handleArrayChange('education', i, 'degree', e.target.value)} className="w-full bg-transparent border-b-2 border-transparent hover:border-blue-300 focus:border-blue-600 outline-none text-slate-900 font-bold mb-3 pb-1 transition-all" placeholder="Degree / Credential"/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                           <input value={edu.school} onChange={(e) => handleArrayChange('education', i, 'school', e.target.value)} className="w-full bg-white rounded-md px-3 py-2 outline-none border border-blue-200 focus:border-blue-500 text-slate-800 font-medium shadow-sm placeholder:text-slate-400" placeholder="Institution"/>
                           <input value={edu.year} onChange={(e) => handleArrayChange('education', i, 'year', e.target.value)} className="w-full bg-white rounded-md px-3 py-2 outline-none border border-blue-200 focus:border-blue-500 text-slate-800 font-medium shadow-sm placeholder:text-slate-400" placeholder="Year Graduated"/>
                        </div>
                    </motion.div>
                  ))}
               </div>
             </section>

             {/* Skills */}
             <section>
               <h3 className="text-lg font-bold text-slate-900 border-b border-blue-200 pb-2 mb-4">Skills</h3>
               <div className="flex flex-wrap gap-2 mb-4">
                  {resumeData.skills.map((skill, i) => (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} key={i} className="group relative bg-blue-100 hover:bg-red-50 text-slate-900 font-bold hover:text-red-600 text-sm px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-blue-200 hover:border-red-200 shadow-sm" onClick={() => removeSkill(i)}>
                       {skill}
                       <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 shadow">
                          <Trash2 className="w-3 h-3"/>
                       </span>
                    </motion.div>
                  ))}
               </div>
               <form onSubmit={addSkill} className="flex gap-2">
                  <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="flex-1 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-500" placeholder="Enter a skill (e.g. TypeScript)" />
                  <button type="submit" className="bg-blue-100 text-slate-800 hover:bg-blue-600 hover:text-white px-4 py-2.5 rounded-lg transition-colors border border-blue-200 shadow-sm font-semibold flex items-center justify-center"><Plus className="w-5 h-5"/></button>
               </form>
               {skillWarning && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm font-semibold text-red-500 flex items-center gap-1">
                     <ShieldAlert className="w-4 h-4" />
                     {skillWarning}
                  </motion.div>
               )}
             </section>

             {/* Projects */}
             <section>
               <div className="flex justify-between items-center border-b border-blue-200 pb-2 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-bold">Projects</h3>
                  <button onClick={() => addItem('projects', { title: 'Project Title', description: 'Briefly describe your project...', role: 'Lead Developer' })} className="text-blue-600 hover:bg-blue-100 p-1 rounded-md transition-colors"><Plus className="w-5 h-5"/></button>
               </div>
               <div className="space-y-4">
                  {resumeData.projects.map((proj, i) => (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={proj.id} className="p-4 bg-blue-50 rounded-xl border border-blue-200 relative group">
                        <button onClick={() => removeItem('projects', i)} className="absolute top-3 right-3 text-slate-500 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100">
                           <Trash2 className="w-4 h-4"/>
                        </button>
                        <input value={proj.title} onChange={(e) => handleArrayChange('projects', i, 'title', e.target.value)} className="w-full bg-transparent border-b-2 border-transparent hover:border-blue-300 focus:border-blue-600 outline-none text-slate-900 font-bold mb-3 pb-1 transition-all" placeholder="Project Name"/>
                        <textarea value={proj.description} onChange={(e) => handleArrayChange('projects', i, 'description', e.target.value)} className="w-full bg-white rounded-md px-3 py-2 outline-none border border-blue-200 focus:border-blue-500 text-slate-800 font-medium shadow-sm placeholder:text-slate-400 text-sm mb-3 h-20 resize-none" placeholder="Description"/>
                        <input value={proj.role} onChange={(e) => handleArrayChange('projects', i, 'role', e.target.value)} className="w-full bg-white rounded-md px-3 py-2 outline-none border border-blue-200 focus:border-blue-500 text-slate-800 font-medium shadow-sm placeholder:text-slate-400 text-sm" placeholder="Your Role"/>
                    </motion.div>
                  ))}
               </div>
             </section>

             {/* Certifications */}
             <section>
               <div className="flex justify-between items-center border-b border-blue-200 pb-2 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-bold">Certifications</h3>
                  <button onClick={() => addItem('certifications', { name: 'Certification Name', issuer: 'Issuer', year: 'Year' })} className="text-blue-600 hover:bg-blue-100 p-1 rounded-md transition-colors"><Plus className="w-5 h-5"/></button>
               </div>
               <div className="space-y-4">
                  {resumeData.certifications.map((cert, i) => (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={cert.id} className="p-4 bg-blue-50 rounded-xl border border-blue-200 relative group">
                        <button onClick={() => removeItem('certifications', i)} className="absolute top-3 right-3 text-slate-500 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100">
                           <Trash2 className="w-4 h-4"/>
                        </button>
                        <input value={cert.name} onChange={(e) => handleArrayChange('certifications', i, 'name', e.target.value)} className="w-full bg-transparent border-b-2 border-transparent hover:border-blue-300 focus:border-blue-600 outline-none text-slate-900 font-bold mb-3 pb-1 transition-all" placeholder="Certification Name"/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                           <input value={cert.issuer} onChange={(e) => handleArrayChange('certifications', i, 'issuer', e.target.value)} className="w-full bg-white rounded-md px-3 py-2 outline-none border border-blue-200 focus:border-blue-500 text-slate-800 font-medium shadow-sm placeholder:text-slate-400" placeholder="Issuer"/>
                           <input value={cert.year} onChange={(e) => handleArrayChange('certifications', i, 'year', e.target.value)} className="w-full bg-white rounded-md px-3 py-2 outline-none border border-blue-200 focus:border-blue-500 text-slate-800 font-medium shadow-sm placeholder:text-slate-400" placeholder="Year"/>
                        </div>
                    </motion.div>
                  ))}
               </div>
             </section>

             {/* Achievements */}
             <section>
               <div className="flex justify-between items-center border-b border-blue-200 pb-2 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-bold">Achievements</h3>
                  <button onClick={() => addItem('achievements', { title: 'Achievement Title', details: 'Details...' })} className="text-blue-600 hover:bg-blue-100 p-1 rounded-md transition-colors"><Plus className="w-5 h-5"/></button>
               </div>
               <div className="space-y-4">
                  {resumeData.achievements.map((ach, i) => (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={ach.id} className="p-4 bg-blue-50 rounded-xl border border-blue-200 relative group">
                        <button onClick={() => removeItem('achievements', i)} className="absolute top-3 right-3 text-slate-500 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100">
                           <Trash2 className="w-4 h-4"/>
                        </button>
                        <input value={ach.title} onChange={(e) => handleArrayChange('achievements', i, 'title', e.target.value)} className="w-full bg-transparent border-b-2 border-transparent hover:border-blue-300 focus:border-blue-600 outline-none text-slate-900 font-bold mb-3 pb-1 transition-all" placeholder="Achievement Name"/>
                        <textarea value={ach.details} onChange={(e) => handleArrayChange('achievements', i, 'details', e.target.value)} className="w-full bg-white rounded-md px-3 py-2 outline-none border border-blue-200 focus:border-blue-500 text-slate-800 font-medium shadow-sm placeholder:text-slate-400 text-sm h-16 resize-none" placeholder="Details..."/>
                    </motion.div>
                  ))}
               </div>
             </section>
          </div>
       </div>

       {/* Realtime Canvas Preview (A4 Aspect Ratio) */}
       <div className="flex-1 flex justify-center sticky top-28 h-[calc(100vh-140px)] bg-white">
          <div className="w-full max-w-[800px] aspect-[1/1.414] bg-white rounded border border-blue-200 shadow-xl overflow-hidden relative overflow-y-auto print:border-none print:shadow-none custom-scrollbar">
             {/* A4 Content Container */}
             <div className="p-10 text-slate-900 h-full w-full font-sans print:p-0 print:m-0" id="resume-preview">
                {/* Header Section */}
                <div className="border-b-2 border-slate-900 pb-5 mb-5 text-center">
                   <h1 className="text-4xl font-black text-black tracking-tight leading-none mb-3 uppercase">{resumeData.name || 'Your Name'}</h1>
                   <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-slate-700">
                      {resumeData.email && <span>{resumeData.email}</span>}
                      {resumeData.email && resumeData.phone && <span className="text-blue-300">|</span>}
                      {resumeData.phone && <span>{resumeData.phone}</span>}
                   </div>
                </div>

                {/* Summary Section */}
                {resumeData.summary && (
                  <div className="mb-6">
                     <p className="text-[14px] leading-relaxed text-slate-800 font-medium">{resumeData.summary}</p>
                  </div>
                )}

                {/* Experience Detail */}
                {(resumeData.experience.length > 0) && (
                   <div className="mb-6">
                      <h2 className="text-[16px] font-black uppercase tracking-wider text-black mb-3 border-b border-blue-200 pb-1">Professional Experience</h2>
                      <div className="space-y-4">
                         {resumeData.experience.map((exp, i) => (
                            <div key={i}>
                               <div className="flex justify-between items-baseline mb-1">
                                  <h3 className="font-bold text-slate-950">{exp.role}</h3>
                                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">{exp.duration}</span>
                               </div>
                               <div className="text-[14px] text-slate-700 font-semibold">{exp.company}</div>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                {/* Education Detail */}
                {(resumeData.education.length > 0) && (
                   <div className="mb-6">
                      <h2 className="text-[16px] font-black uppercase tracking-wider text-black mb-3 border-b border-blue-200 pb-1">Education</h2>
                      <div className="space-y-4">
                         {resumeData.education.map((edu, i) => (
                            <div key={i}>
                               <div className="flex justify-between items-baseline mb-1">
                                  <h3 className="font-bold text-slate-950">{edu.degree}</h3>
                                  <span className="text-xs font-bold text-slate-500 uppercase">{edu.year}</span>
                               </div>
                               <div className="text-[14px] text-slate-700 font-semibold">{edu.school}</div>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                {/* Projects Detail */}
                 {(resumeData.projects.length > 0) && (
                    <div className="mb-6">
                       <h2 className="text-[16px] font-black uppercase tracking-wider text-black mb-3 border-b border-blue-200 pb-1">Projects</h2>
                       <div className="space-y-4">
                          {resumeData.projects.map((proj, i) => (
                             <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                   <h3 className="font-bold text-slate-950">{proj.title}</h3>
                                   <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{proj.role}</span>
                                </div>
                                <p className="text-[13px] text-slate-700 font-medium leading-relaxed">{proj.description}</p>
                             </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {/* Certifications Detail */}
                 {(resumeData.certifications.length > 0) && (
                    <div className="mb-6">
                       <h2 className="text-[16px] font-black uppercase tracking-wider text-black mb-3 border-b border-blue-200 pb-1">Certifications</h2>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                          {resumeData.certifications.map((cert, i) => (
                             <div key={i} className="flex justify-between items-start">
                                <div>
                                   <h4 className="text-[14px] font-bold text-slate-900 leading-tight">{cert.name}</h4>
                                   <span className="text-[12px] text-slate-600 font-semibold">{cert.issuer}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-500 uppercase">{cert.year}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {/* Achievements */}
                 {(resumeData.achievements.length > 0) && (
                    <div className="mb-6">
                       <h2 className="text-[16px] font-black uppercase tracking-wider text-black mb-3 border-b border-blue-200 pb-1">Achievements</h2>
                       <ul className="list-disc list-inside space-y-2">
                          {resumeData.achievements.map((ach, i) => (
                             <li key={i} className="text-[13px] text-slate-800 font-medium leading-relaxed marker:text-blue-500">
                                <span className="font-bold text-slate-950">{ach.title}: </span>
                                {ach.details}
                             </li>
                          ))}
                       </ul>
                    </div>
                 )}

                {/* Skills Summary */}
                {(resumeData.skills.length > 0) && (
                   <div>
                      <h2 className="text-[16px] font-black uppercase tracking-wider text-black mb-3 border-b border-blue-200 pb-1">Core Competencies</h2>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                         {resumeData.skills.map((skill, i) => (
                            <span key={i} className="text-xs font-bold bg-blue-50 border border-blue-100 px-2.5 py-1 rounded text-slate-900 uppercase tracking-wide">
                               {skill}
                            </span>
                         ))}
                      </div>
                   </div>
                )}

                <div className="mt-8 pt-8 border-t border-slate-100 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Generated by Pro Resume Builder • Secure Session #{Math.floor(Math.random() * 900000) + 100000}
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
}
