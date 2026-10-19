import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code, 
  Cpu, 
  Globe, 
  Terminal, 
  Layers, 
  Radio, 
  CheckCircle2, 
  Wrench 
} from 'lucide-react';
import { headerEntrance, gridStagger, cardEntrance } from '../utils/motionVariants.ts';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'programming' | 'web' | 'hardware' | 'telecom'>('all');

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'programming', label: 'Programming & Java' },
    { id: 'web', label: 'Web & Frontend' },
    { id: 'hardware', label: 'Embedded & IoT' },
    { id: 'telecom', label: 'Telecom & AI' },
  ];

  const skillCards = [
    {
      category: 'programming',
      title: 'Java & OOP Architecture',
      skills: ['Java Core', 'Object-Oriented Programming (OOP)', 'Java Full Stack Development', 'Data Structures Logic', 'Exception Handling', 'Package Management'],
      icon: <Code className="w-5 h-5 text-blue-400" />,
      level: 'Strong Foundation',
      verification: 'Unique Innovibe Certified & Academic Projects'
    },
    {
      category: 'web',
      title: 'Web Technologies & Responsive UI',
      skills: ['HTML5 Semantic Markup', 'CSS3 Modern Styling', 'Bootstrap Framework', 'Flexbox Layouts', 'Mobile Responsiveness', 'Cross-Browser UI'],
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      level: 'Certified Developer',
      verification: 'NxtWave CCBP 4.0 Academy Certified'
    },
    {
      category: 'hardware',
      title: 'Embedded Systems & IoT Hardware',
      skills: ['ESP32 Microcontrollers', 'Arduino IDE & Toolchain', 'IR Sensor Interfaces', 'Relay Switching Modules', 'Hardware-Software Integration', 'Circuit Troubleshooting'],
      icon: <Cpu className="w-5 h-5 text-violet-400" />,
      level: 'Lead Implementer',
      verification: 'Patent-Applied Project & Kings CoE Workshop'
    },
    {
      category: 'telecom',
      title: 'Telecommunications & Optical Networks',
      skills: ['Telecom Switch Fundamentals', 'Digital Communication', 'Optical Fibre Cable (OFC)', 'Splicing & Transmission', 'Broadband & FTTH', 'Network Routing'],
      icon: <Radio className="w-5 h-5 text-cyan-400" />,
      level: 'Industrial Training',
      verification: 'BSNL Thanjavur Business Area In-Plant'
    },
    {
      category: 'hardware',
      title: 'Engineering Tools & Testing',
      skills: ['Visual Studio Code', 'Arduino IDE', 'Hardware Multimeters & Probes', 'Firmware Flashing', 'System Debugging', 'Git / GitHub Version Control'],
      icon: <Wrench className="w-5 h-5 text-emerald-400" />,
      level: 'Daily Toolset',
      verification: 'Academic Lab & Project Expo Execution'
    },
    {
      category: 'telecom',
      title: 'Artificial Intelligence & Machine Learning',
      skills: ['Supervised Machine Learning', 'Linear Regression Modeling', 'Salary Prediction Pipelines', 'Feature Preprocessing', 'AI Fundamentals'],
      icon: <Terminal className="w-5 h-5 text-indigo-400" />,
      level: 'Credentialed',
      verification: 'IBM SkillsBuild & Edunet/AICTE Certified'
    }
  ];

  const filteredCards = activeCategory === 'all' 
    ? skillCards 
    : skillCards.filter(c => c.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 bg-[#030712] overflow-hidden scroll-mt-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/10 blur-[200px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-violet-600/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll-Triggered Reveal */}
        <motion.div
          variants={headerEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col items-center text-center space-y-3 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>02. TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-300">Proficiencies</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Verified technical capabilities certified through accredited academies, industrial training, and practical deployment.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-[#070e1c]/90 border border-slate-800/80 mt-6 shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Cards Grid with Staggered Entrance */}
        <motion.div 
          key={activeCategory}
          variants={gridStagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardEntrance}
              whileHover={{ y: -8, scale: 1.015 }}
              className="p-6 rounded-2xl bg-[#070e1c]/90 border border-blue-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] flex flex-col justify-between group backdrop-blur-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-blue-500/40 transition-colors">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30">
                    {card.level}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-base font-bold text-white font-heading mb-3 group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>

                {/* Skill Items */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800 group-hover:border-slate-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{card.verification}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
