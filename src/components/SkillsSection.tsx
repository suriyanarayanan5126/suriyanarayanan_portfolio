import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code, 
  Cpu, 
  Globe, 
  Terminal, 
  Layers, 
  Radio, 
  Wrench,
  CheckCircle2,
  Sparkles,
  Zap,
  Sliders,
  Laptop
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'software' | 'hardware' | 'web'>('all');

  // Exact mandated primary skills
  const coreCompetencies = [
    { name: "Java", category: "software", desc: "Object-Oriented Programming (OOP), Backend Logic & Data Structures", icon: <Code className="w-5 h-5 text-blue-600" /> },
    { name: "HTML", category: "web", desc: "HTML5 Semantic Markup, Accessibility & Modern Web Structure", icon: <Globe className="w-5 h-5 text-indigo-600" /> },
    { name: "CSS", category: "web", desc: "CSS3 Flexbox, Grid, Animations & Clean Responsive Styling", icon: <Globe className="w-5 h-5 text-sky-600" /> },
    { name: "Bootstrap", category: "web", desc: "Responsive Framework, Mobile-First Layouts & UI Components", icon: <Layers className="w-5 h-5 text-violet-600" /> },
    { name: "Embedded Systems", category: "hardware", desc: "ESP32, Microcontrollers, Firmware Programming & Memory Control", icon: <Cpu className="w-5 h-5 text-blue-600" /> },
    { name: "Internet of Things (IoT)", category: "hardware", desc: "Sensor Interfacing, Relay Actuation, Wireless System Architectures", icon: <Radio className="w-5 h-5 text-sky-600" /> },
    { name: "Hardware–Software Integration", category: "hardware", desc: "Microcontroller Sensor-to-Display Pipelines & Driver Calibration", icon: <Sliders className="w-5 h-5 text-indigo-600" /> },
    { name: "Testing and Troubleshooting", category: "hardware", desc: "Hardware Multimeters, Probes, Circuit Debugging & Diagnostics", icon: <Wrench className="w-5 h-5 text-emerald-600" /> },
  ];

  const categories = [
    { id: 'all', label: 'All Core Skills' },
    { id: 'hardware', label: 'Embedded Systems & IoT' },
    { id: 'software', label: 'Java & Programming' },
    { id: 'web', label: 'HTML, CSS & Bootstrap' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? coreCompetencies
    : coreCompetencies.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 bg-white text-slate-900 overflow-hidden scroll-mt-16 border-y border-slate-200">
      {/* Background ambient lighting on pure white */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-100/35 blur-[200px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-100/35 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll-Triggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold tracking-wider uppercase">02. TECHNICAL SKILLS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">Arsenal</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-sans">
            Demonstrated engineering expertise in embedded systems, IoT hardware architectures, and modern software technologies.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200 mt-6 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Primary Mandated Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-[#fafafc] border border-slate-200 hover:border-blue-400 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs group-hover:bg-blue-50 transition-colors">
                    {skill.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 uppercase tracking-wider">
                    {skill.category}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed font-sans mb-4">
                  {skill.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-xs text-emerald-600 font-mono font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Core Competency</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
