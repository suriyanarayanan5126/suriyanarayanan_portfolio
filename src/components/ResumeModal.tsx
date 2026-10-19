import React, { useRef, useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  SKILLS_DATA, 
  PROJECTS_DATA, 
  INTERNSHIPS_DATA, 
  EDUCATION_DATA, 
  ACHIEVEMENTS_DATA 
} from '../data/portfolioData.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
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

HONORS & ACHIEVEMENTS
- Resource Person: Conducted hands-on workshop on IoT and AI in Electronics for 80+ students
- 1st Prize Winner: Freq Fest '24 International Symposium, Acmet '2k25 National Fest, Kings Mini Project Expo
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-md animate-fade-in no-print"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Suriyanarayanan R — Official Curriculum Vitae
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Verified 2026 Engineering Graduate · Anna University: 80.6%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 shadow-xs transition-all cursor-pointer"
              title="Copy plain text resume to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable ATS Resume Sheet (Pure White Theme) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100">
          <div 
            ref={printAreaRef}
            className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-12 shadow-sm text-slate-800 font-sans leading-normal selection:bg-blue-100"
          >
            {/* Header info */}
            <div className="border-b border-slate-200 pb-6 text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase font-heading">
                {PERSONAL_INFO.nameUpper}
              </h1>
              <p className="text-sm font-semibold text-blue-700 mt-1">
                {PERSONAL_INFO.title} · Class of 2026 · {PERSONAL_INFO.college}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2.5 font-mono">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {PERSONAL_INFO.phone}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-700 hover:underline flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  {PERSONAL_INFO.email}
                </a>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {PERSONAL_INFO.location}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-600 mt-2">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-slate-400" />
                  <span>linkedin.com/in/suriya-narayanan-r-1690862a2</span>
                </a>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                  <Github className="w-3 h-3 text-slate-400" />
                  <span>github.com/suriyanarayanan5126</span>
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mt-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Professional Summary</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {PERSONAL_INFO.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mt-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold border-b border-slate-200 pb-1.5 mb-2.5">
                Technical Skills & Tools
              </h2>
              <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-900 font-mono text-xs">Programming:</span>{' '}
                  <span className="text-slate-700">{SKILLS_DATA.programming.join(', ')}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 font-mono text-xs">Web Technologies:</span>{' '}
                  <span className="text-slate-700">{SKILLS_DATA.webTechnologies.join(', ')}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 font-mono text-xs">Development Paradigms:</span>{' '}
                  <span className="text-slate-700">{SKILLS_DATA.development.join(', ')}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 font-mono text-xs">Developer Tools:</span>{' '}
                  <span className="text-slate-700">{SKILLS_DATA.tools.join(', ')}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 font-mono text-xs">Hardware & IoT:</span>{' '}
                  <span className="text-slate-700">{SKILLS_DATA.hardwareIoT.concat(SKILLS_DATA.telecomAI).join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="mt-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold border-b border-slate-200 pb-1.5 mb-3">
                Key Projects & Inventions
              </h2>
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="font-bold text-slate-900">
                      Design and Implementation of a Digital Oorai Display using Embedded System
                    </span>
                    <span className="text-[11px] font-mono font-bold text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200 shrink-0">
                      Patent Applied
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 italic">
                    Confidential intellectual property pursuant to official patent application filing.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-900">
                    Smart Home Automation
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Developed an IoT-based system for controlling home appliances using embedded hardware.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-900">
                    Bidirectional Visitor Counter
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Developed an IR-sensor-based system for automated entry and exit counting with automated lighting control. Awarded II Prize at Electrovibez '23.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-900">
                    Smart Scrolling Display
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Microcontroller-based dynamic message broadcasting and real-time scrolling display system.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-900">
                    Suriya AI & Salary Prediction
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Developed a machine-learning project using Linear Regression during internship training.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-900">
                    Surveillance Car
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Embedded robotics vehicle system featuring wireless motor navigation and live surveillance monitoring.
                  </p>
                </div>
              </div>
            </div>

            {/* Internships & Practical Training */}
            <div className="mt-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold border-b border-slate-200 pb-1.5 mb-2.5">
                Internships & Practical Training
              </h2>
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-900">IBM SkillsBuild:</span>{' '}
                  <span className="text-slate-700">Virtual Internship in Artificial Intelligence & Machine Learning</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">BSNL Thanjavur:</span>{' '}
                  <span className="text-slate-700">Telecommunications & Optical Fibre Networking Practical Training</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Edunet Foundation & AICTE:</span>{' '}
                  <span className="text-slate-700">6-Week Artificial Intelligence & Machine Learning Internship</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Fantasy Solution, Trichy:</span>{' '}
                  <span className="text-slate-700">Artificial Intelligence Inplant Training</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Education</span>
              </h2>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">Kings College of Engineering</span> — B.E. Electronics and Communication
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-700">80.6% · 2022–2026</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">National Govt Aided Higher Secondary School, Mannargudi</span> — HSC
                  </div>
                  <span className="text-xs font-mono text-slate-600">First Class · 2022</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">St. Joseph Matric High School, Mannargudi</span> — SSLC
                  </div>
                  <span className="text-xs font-mono text-slate-600">High Standing · 2020</span>
                </div>
              </div>
            </div>

            {/* Key Honors & Achievements */}
            <div className="mt-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Honors & Key Achievements</span>
              </h2>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Resource Person:</strong> Conducted hands-on workshop on IoT and AI in Electronics for 80+ engineering students.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>1st Prize Winner:</strong> Freq Fest '24 International Level Technical Symposium (EGS Pillay Engg College).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>1st Prize Winner:</strong> Acmet '2k25 13th National Level Technical Fest Innovation Expo (MAM School of Engg).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>2nd Prize Winner:</strong> Electrovibez '23 National Level Technical Symposium (Kings College of Engineering).</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
