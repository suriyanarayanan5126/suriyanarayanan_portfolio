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
  Sparkles
} from 'lucide-react';

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
      skills: ['Java Core', 'Object-Oriented Programming (OOP)', 'Software Architecture', 'Data Structures Logic', 'Exception Handling', 'Backend Logic'],
      icon: <Code className="w-5 h-5 text-blue-600" />,
      level: 'Strong Foundation',
      verification: 'Certified & Academic Projects'
    },
    {
      category: 'web',
      title: 'Web Technologies & Responsive UI',
      skills: ['HTML5 Semantic Markup', 'CSS3 Modern Styling', 'Bootstrap Framework', 'Flexbox Layouts', 'Mobile Responsiveness', 'Cross-Browser UI'],
      icon: <Globe className="w-5 h-5 text-indigo-600" />,
      level: 'Certified Developer',
      verification: 'NxtWave CCBP 4.0 Academy Certified'
    },
    {
      category: 'hardware',
      title: 'Embedded Systems & IoT Hardware',
      skills: ['ESP32 Microcontrollers', 'Arduino IDE & Toolchain', 'IR Sensor Interfaces', 'Relay Switching Modules', 'Hardware–Software Integration', 'Circuit Troubleshooting'],
      icon: <Cpu className="w-5 h-5 text-sky-600" />,
      level: 'Lead Implementer',
      verification: 'Patent Project & Kings CoE Workshop'
    },
    {
      category: 'telecom',
      title: 'Telecommunications & Optical Networks',
      skills: ['Telecom Switch Fundamentals', 'Digital Communication', 'Optical Fibre Cable (OFC)', 'Splicing & Transmission', 'Broadband & FTTH', 'Network Routing'],
      icon: <Radio className="w-5 h-5 text-blue-600" />,
      level: 'Industrial Training',
      verification: 'BSNL Thanjavur Business Area In-Plant'
    },
    {
      category: 'hardware',
      title: 'Engineering Tools & Testing',
      skills: ['Visual Studio Code', 'Arduino IDE', 'Hardware Multimeters & Probes', 'Firmware Flashing', 'Testing & Troubleshooting', 'Git / GitHub Version Control'],
      icon: <Wrench className="w-5 h-5 text-emerald-600" />,
      level: 'Daily Toolset',
      verification: 'Academic Lab & Project Expo Execution'
    },
    {
      category: 'telecom',
      title: 'Artificial Intelligence & Machine Learning',
      skills: ['Supervised Machine Learning', 'Linear Regression Modeling', 'Salary Prediction Pipelines', 'Feature Preprocessing', 'AI Fundamentals'],
      icon: <Terminal className="w-5 h-5 text-indigo-600" />,
      level: 'Credentialed',
      verification: 'IBM SkillsBuild & Edunet/AICTE Certified'
    }
  ];

  const filteredCards = activeCategory === 'all' 
    ? skillCards 
    : skillCards.filter(c => c.category === activeCategory);

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
            <span className="font-semibold tracking-wider uppercase">02. TECHNICAL ARSENAL</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">Proficiencies</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-sans">
            Verified technical capabilities certified through accredited academies, industrial training, and practical deployment.
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

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="p-7 rounded-3xl bg-[#fafafc] border border-slate-200 hover:border-blue-400 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs group-hover:bg-blue-50 transition-colors">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    {card.level}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-lg mb-4 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>

                {/* Skills tags list */}
                <div className="space-y-2 mb-6">
                  {card.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-700 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification footer */}
              <div className="pt-4 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                <span>{card.verification}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
