import React, { useRef } from 'react';
import { X, Download, Printer, Copy, Check, FileText, ExternalLink, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { PERSONAL_INFO, SKILLS_DATA, PROJECTS_DATA, INTERNSHIPS_DATA, EDUCATION_DATA, ACHIEVEMENTS_DATA } from '../data/portfolioData.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
${PERSONAL_INFO.nameUpper}
${PERSONAL_INFO.title} | ${PERSONAL_INFO.college} | 2026 Graduate
Academic Result: ${PERSONAL_INFO.academicScore}
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location}
LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

TECHNICAL SKILLS
- Programming: ${SKILLS_DATA.programming.join(', ')}
- Web Technologies: ${SKILLS_DATA.webTechnologies.join(', ')}
- Development: ${SKILLS_DATA.development.join(', ')}
- Tools: ${SKILLS_DATA.tools.join(', ')}
- Hardware & IoT: ${SKILLS_DATA.hardwareIoT.join(', ')}
- Telecom & AI: ${SKILLS_DATA.telecomAI.join(', ')}

PROJECTS
1. Design and Implementation of a Digital Oorai Display using Embedded System (Patent-Applied Academic Project)
2. Smart Home Automation — Developed an IoT-based system for controlling home appliances using embedded hardware.
3. Bidirectional Visitor Counter — Developed an IR-sensor-based system for automated entry and exit counting with automated lighting control. Awarded II Prize at Electrovibez '23.
4. Smart Scrolling Display — Microcontroller-based dynamic message broadcasting and real-time scrolling display system.
5. Suriya AI & Salary Prediction — Developed a machine-learning project using Linear Regression during internship training.
6. Surveillance Car — Embedded robotics vehicle system featuring wireless motor navigation and live surveillance monitoring.

INTERNSHIPS & PRACTICAL TRAINING
- IBM SkillsBuild: Virtual Internship in AI (Linear Regression ML model)
- BSNL Thanjavur: Telecommunication and Networking Practical Training
- Edunet Foundation & AICTE: 6-Week AI & ML Internship
- Fantasy Solution Trichy: Artificial Intelligence Inplant Training

EDUCATION
- Kings College of Engineering — B.E. ECE (2026) — ${PERSONAL_INFO.academicScore}
- National Govt Aided Higher Secondary School, Mannargudi — HSC (2022)
- St. Joseph Matric High School, Mannargudi — SSLC (2020)

CERTIFICATIONS & ACHIEVEMENTS
- Certification: Java Full Stack Development — Unique Innovibe
- Resource Person: Conducted hands-on workshop on IoT and AI in Electronics for 80+ students
- 1st Prize Winner: Freq Fest '24 International Symposium, Acmet '2k25 National Fest, Kings Mini Project Expo
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in no-print">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-b from-[#0e141d] to-[#070a0e] border border-emerald-500/40 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.2)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-emerald-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-wide">
                Suriyanarayanan R — Professional Resume
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Verified 2026 Engineering Graduate · {PERSONAL_INFO.academicScore}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Copy plain text resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-emerald-500 hover:bg-emerald-400 text-black transition-all cursor-pointer shadow-md"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable ATS Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0a0e14]">
          <div 
            ref={printAreaRef}
            className="max-w-3xl mx-auto bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-10 shadow-2xl text-slate-200 font-sans leading-normal selection:bg-emerald-500/30"
          >
            {/* Header info */}
            <div className="border-b border-slate-700/80 pb-5 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase font-heading">
                {PERSONAL_INFO.nameUpper}
              </h1>
              <p className="text-sm font-medium text-emerald-400 mt-1">
                {PERSONAL_INFO.title} · 2026 Graduate · {PERSONAL_INFO.college}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-2 font-mono">
                <span>{PERSONAL_INFO.phone}</span>
                <span aria-hidden="true">·</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 hover:underline">{PERSONAL_INFO.email}</a>
                <span aria-hidden="true">·</span>
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-400 mt-1.5">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-300">
                  linkedin.com/in/suriya-narayanan-r-1690862a2
                </a>
                <span aria-hidden="true">·</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-emerald-300">
                  github.com/suriyanarayanan5126
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mt-5">
              <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold border-b border-slate-800 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
                {PERSONAL_INFO.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mt-5">
              <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold border-b border-slate-800 pb-1 mb-2">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 gap-1.5 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-slate-200">Programming:</span>{' '}
                  <span className="text-slate-300">{SKILLS_DATA.programming.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-200">Web Technologies:</span>{' '}
                  <span className="text-slate-300">{SKILLS_DATA.webTechnologies.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-200">Development:</span>{' '}
                  <span className="text-slate-300">{SKILLS_DATA.development.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-200">Tools:</span>{' '}
                  <span className="text-slate-300">{SKILLS_DATA.tools.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-200">Hardware & Other:</span>{' '}
                  <span className="text-slate-300">{SKILLS_DATA.hardwareIoT.concat(SKILLS_DATA.telecomAI).join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="mt-5">
              <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold border-b border-slate-800 pb-1 mb-2">
                Projects
              </h2>
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-100">
                      Design and Implementation of a Digital Oorai Display using Embedded System
                    </span>
                    <span className="text-xs font-mono text-emerald-400">Patent Applied</span>
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    Confidential intellectual property pursuant to patent filing.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-100">
                    Smart Home Automation
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Developed an IoT-based system for controlling home appliances using embedded hardware.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-100">
                    Bidirectional Visitor Counter
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Developed an IR-sensor-based system for automated entry and exit counting with automated lighting control. Awarded II Prize at Electrovibez '23.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-100">
                    Smart Scrolling Display
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Microcontroller-based dynamic message broadcasting and real-time scrolling display system.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-100">
                    Suriya AI & Salary Prediction
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Developed a machine-learning project using Linear Regression during internship training.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-100">
                    Surveillance Car
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Embedded robotics vehicle system featuring wireless motor navigation and live surveillance monitoring.
                  </p>
                </div>
              </div>
            </div>

            {/* Internships */}
            <div className="mt-5">
              <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold border-b border-slate-800 pb-1 mb-2">
                Internships & Practical Training
              </h2>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div>
                  <div className="flex justify-between items-baseline font-semibold text-slate-200">
                    <span>IBM SkillsBuild — Artificial Intelligence</span>
                    <span className="text-xs font-mono text-slate-400">Virtual Internship</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Completed virtual internship training in Artificial Intelligence and developed an Employee Salary Prediction project using Linear Regression.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-semibold text-slate-200">
                    <span>BSNL Internship — Telecommunication and Networking</span>
                    <span className="text-xs font-mono text-slate-400">Practical Training</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Gained exposure to telecommunication, networking systems, communication infrastructure, optical fibre cables, and broadband technology.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-5">
              <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold border-b border-slate-800 pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-slate-100">Kings College of Engineering</span>
                    <div className="text-slate-400 text-xs">B.E. Electronics and Communication Engineering</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-emerald-400 font-semibold">{PERSONAL_INFO.academicScore}</span>
                    <div className="text-xs text-slate-400 font-mono">2026</div>
                  </div>
                </div>

                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-slate-100">National Government Aided Higher Secondary School, Mannargudi</span>
                    <div className="text-slate-400 text-xs">Higher Secondary Certificate (HSC)</div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">2022</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-slate-100">St. Joseph Matric High School, Mannargudi</span>
                    <div className="text-slate-400 text-xs">Secondary School Leaving Certificate (SSLC)</div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">2020</span>
                </div>
              </div>
            </div>

            {/* Certifications & Achievements */}
            <div className="mt-5">
              <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold border-b border-slate-800 pb-1 mb-2">
                Certifications & Achievements
              </h2>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-300">
                <li><span className="font-medium text-slate-100">Certification:</span> Java Full Stack Development — Unique Innovibe.</li>
                <li><span className="font-medium text-slate-100">Resource Person:</span> Served as a Resource Person and conducted a hands-on workshop on IoT and AI in Electronics for 80+ students.</li>
                <li><span className="font-medium text-slate-100">Inter-College Awards:</span> Secured 1st prizes and cash awards in various inter-college symposiums (Freq Fest 24, Acmet '2k25, Kings Mini Project Expo).</li>
              </ul>
            </div>

            {/* Core Strengths */}
            <div className="mt-5 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 text-center">
              Problem Solving · Leadership · Teamwork · Communication · Adaptability · Quick Learning
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="px-6 py-3 bg-[#0a0e14] border-t border-emerald-500/20 flex items-center justify-between text-xs text-slate-400">
          <span>Click "Print / Download PDF" to save as clean ATS PDF via browser print.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
