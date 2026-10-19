import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  FileText,
  Volume2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface NavbarProps {
  onOpenAvatar: () => void;
  onOpenResume: () => void;
}

interface NavItem {
  label: string;
  href: string;
  id: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAvatar, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavItem[] = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Training', href: '#training', id: 'training' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  // High-performance Real-Time Scroll Spy handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 1. Calculate top progress bar percentage
    const maxScroll = documentHeight - windowHeight;
    const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));

    // 2. Set compact background on scroll
    setIsScrolled(scrollY > 20);

    // 3. Real-Time Active Section Detection
    if (scrollY < 200) {
      setActiveSection('hero');
      return;
    }

    if (windowHeight + scrollY >= documentHeight - 60) {
      setActiveSection('contact');
      return;
    }

    const focalLine = scrollY + windowHeight * 0.35;

    let currentActive = 'hero';
    for (const item of navLinks) {
      const el = document.getElementById(item.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (focalLine >= top && focalLine < top + height) {
          currentActive = item.id;
          break;
        }
      }
    }

    if (currentActive === 'hero' && scrollY >= 200) {
      let closestSection = navLinks[0].id;
      let minDistance = Infinity;

      for (const item of navLinks) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const distance = Math.abs(focalLine - top);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = item.id;
          }
        }
      }
      currentActive = closestSection;
    }

    setActiveSection(currentActive);
  }, [navLinks]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);

    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-slate-900/80 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-400 shadow-[0_0_12px_#06b6d4] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030712]/92 backdrop-blur-md border-b border-blue-500/20 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Name */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('hero');
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform font-mono">
                SR
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm sm:text-base text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                  {PERSONAL_INFO.nameUpper}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>ECE '26 · Builder</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links with Real-Time Sliding Scroll Spy Indicator */}
            <div className="hidden lg:flex items-center p-1 rounded-full bg-[#081020]/80 border border-blue-500/20 backdrop-blur-md shadow-inner">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-cyan-300 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full bg-blue-500/20 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]" />
                      )}
                      <span>{link.label}</span>
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Right Action Controls */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Social Icons */}
              <div className="flex items-center gap-1.5 pr-2 border-r border-slate-800">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-[#0077b5] hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              {/* Resume button */}
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-[#091122]/90 hover:bg-[#0f1d38] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resume</span>
              </button>

              {/* Meet Me Avatar Launcher */}
              <button
                onClick={onOpenAvatar}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] cursor-pointer"
              >
                <Volume2 className="w-4 h-4 fill-current" />
                <span>Meet Me</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenAvatar}
                className="px-2.5 py-1 rounded bg-cyan-500 text-black text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Meet</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Real-Time Active Indicators */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-[#030712]/98 backdrop-blur-xl border-b border-blue-500/30 px-6 py-5 mt-2 space-y-2 overflow-hidden"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                Navigation Index
              </div>

              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-mono uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-blue-950/60 border border-blue-500/40 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-slate-600 text-xs">→</span>
                    )}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 text-xs font-mono text-slate-200 border border-slate-700 hover:border-cyan-500/40 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>View & Print Resume</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAvatar();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs font-semibold cursor-pointer shadow-md"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Meet Talking Avatar</span>
                </button>

                <div className="flex justify-center gap-5 pt-2">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
