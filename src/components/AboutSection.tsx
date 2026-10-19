import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Code2, 
  Users, 
  CheckCircle, 
  Compass, 
  Radio, 
  Sparkles,
  Award,
  Zap,
  Target,
  BookOpen
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      title: "Embedded & IoT Systems",
      badge: "Hardware Lead",
      description: "Hands-on implementation with ESP32 microcontrollers, solid-state relay drivers, infrared sensors, and real-time hardware-software architectures."
    },
    {
      icon: <Code2 className="w-6 h-6 text-indigo-600" />,
      title: "Java Full Stack & Web",
      badge: "Software Foundation",
      description: "Strong grounding in Java, Object-Oriented Programming, HTML5, CSS3, Bootstrap grid architectures, and responsive frontend systems certified by NxtWave."
    },
    {
      icon: <Radio className="w-6 h-6 text-violet-600" />,
      title: "Telecom & Networking",
      badge: "Industrial In-Plant",
      description: "Industrial training at BSNL Thanjavur covering telecommunication switching, optical fibre cable (OFC) splicing, and broadband routing technologies."
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: "Technical Mentorship",
      badge: "Resource Person",
      description: "Invited Resource Person conducting an interactive hands-on workshop on IoT and AI in Electronics for 80+ engineering peers."
    }
  ];

  const quickFacts = [
    { label: "Degree", value: "B.E. Electronics & Communication Engineering" },
    { label: "Institution", value: "Kings College of Engineering (Anna University)" },
    { label: "Academic Score", value: "80.6% Anna University Standing" },
    { label: "Graduation Year", value: "Class of 2026" },
    { label: "Hometown", value: "Mannargudi, Tamil Nadu, India" },
    { label: "Primary Focus", value: "Software Development & Embedded IoT Systems" }
  ];

  return (
    <section id="about" className="relative py-28 bg-[#fafafc] text-slate-900 overflow-hidden scroll-mt-16 border-y border-slate-200">
      {/* Subtle Designed Grid & Warm Ivory Radiant Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-blue-100/60 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-violet-100/60 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold tracking-wider uppercase">01. IDENTITY & ENGINEERING CORE</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Suriyanarayanan</span>
          </h2>
          
          <p className="text-slate-600 text-base max-w-2xl font-sans leading-relaxed">
            Bridging hardware circuits and software systems with rigorous engineering discipline, continuous curiosity, and verifiable results.
          </p>
        </motion.div>

        {/* Story & Quick Facts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Main Story Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5 text-blue-600">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span className="font-heading font-bold text-lg text-slate-900">Engineering Philosophy</span>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Anna University 80.6%
                </span>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify font-sans">
                I am a 2026 Electronics and Communication Engineering graduate from <strong className="text-slate-900">Kings College of Engineering</strong> with an academic score of <strong className="text-blue-700 font-mono">80.6%</strong> under Anna University. My hometown is <span className="font-semibold text-slate-900">Mannargudi, Tamil Nadu</span>, where I laid my academic foundation with high academic distinction.
              </p>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify font-sans">
                My engineering focus bridges physical hardware—microcontrollers, sensor arrays, and IoT architectures—with robust software engineering in Java, HTML, CSS, and modern web technologies. I actively author academic inventions, have filed a confidential embedded system patent, and share knowledge through technical workshops.
              </p>

              <div className="pt-2 flex flex-wrap gap-2.5">
                {["Strong Problem Solving", "Quick Learner", "Hardware Troubleshooting", "Team Leadership", "Circuit Debugging"].map((trait) => (
                  <span
                    key={trait}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{trait}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Academic & Profile Facts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Verified Academic Credentials</span>
              </div>

              <div className="space-y-3 pt-2">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-slate-700/60 text-xs">
                    <span className="text-slate-400 font-medium font-sans">{fact.label}:</span>
                    <span className="text-slate-100 font-semibold font-mono sm:text-right mt-0.5 sm:mt-0">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Architectural Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
