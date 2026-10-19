import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setFormStatus('sending');
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formState.subject || `Inquiry from ${formState.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;

    setTimeout(() => {
      setFormStatus('sent');
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#02050c] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[200px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-violet-600/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-circuit-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll-Triggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTOR 07 // INITIATE TRANSMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">Touch</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Open for technical roles, embedded systems engineering, IoT development, and research collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info with Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            
            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-[#070d18]/90 border border-blue-500/20 hover:border-cyan-400/50 transition-all flex items-start justify-between shadow-lg backdrop-blur-sm group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/40 text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm sm:text-base font-semibold text-white hover:text-cyan-400 transition-colors block mt-0.5"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <span className="text-xs text-slate-500 font-sans">Verified Primary Channel</span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-[#070d18]/90 border border-blue-500/20 hover:border-cyan-400/50 transition-all flex items-start justify-between shadow-lg backdrop-blur-sm group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/40 text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-sm sm:text-base font-semibold text-white hover:text-cyan-400 transition-colors block mt-0.5"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                  <span className="text-xs text-slate-500 font-sans">India (+91 Standard Time)</span>
                </div>
              </div>

              <button
                onClick={handleCopyPhone}
                className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Copy Phone Number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-[#070d18]/90 border border-blue-500/20 flex items-start gap-4 shadow-lg backdrop-blur-sm">
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/40 text-cyan-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Location & Residence
                </span>
                <div className="text-sm sm:text-base font-semibold text-white mt-0.5 font-heading">
                  {PERSONAL_INFO.location}
                </div>
                <span className="text-xs text-slate-500 font-sans">Open to Relocation for Onsite & Hybrid Roles</span>
              </div>
            </div>

            {/* Social Network Badges */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0a1324]/90 to-[#050914]/90 border border-blue-500/20 flex items-center justify-between shadow-lg">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase">Professional Networks</div>
                <div className="text-sm font-semibold text-white mt-0.5 font-heading">Connect Online</div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-900/90 hover:bg-blue-600/20 border border-slate-700/80 hover:border-cyan-400 text-white transition-all shadow-md group"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 group-hover:text-cyan-300 transition-colors" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-900/90 hover:bg-blue-600/20 border border-slate-700/80 hover:border-[#0077b5] text-white hover:text-[#0077b5] transition-all shadow-md group"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:text-[#0077b5] transition-colors" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Transmission Form with Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-[#070d18]/90 border border-blue-500/20 shadow-2xl relative backdrop-blur-sm">
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Direct Message Console
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Send an instant dispatch directly to Suriyanarayanan's inbox.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[10px] font-mono text-cyan-400">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>24-Hour Response</span>
                </div>
              </div>

              {formStatus === 'sent' ? (
                <div className="p-8 rounded-xl bg-blue-950/40 border border-cyan-500/40 text-center space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading">
                    Transmission Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans">
                    Your message client has been triggered. You can also write directly to{' '}
                    <strong className="text-cyan-400">{PERSONAL_INFO.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setFormStatus('idle');
                      setFormState({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs cursor-pointer shadow-md hover:from-blue-500 hover:to-cyan-400 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. John Doe / Tech Recruiter"
                        className="w-full bg-[#030712]/90 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none font-sans transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1.5">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. recruiter@company.com"
                        className="w-full bg-[#030712]/90 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none font-sans transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1.5">
                      Subject / Role Topic
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Embedded Systems / IoT Engineer Opportunity"
                      className="w-full bg-[#030712]/90 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1.5">
                      Message Content *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write your note, job description, or message details here..."
                      className="w-full bg-[#030712]/90 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none font-sans transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(37,99,235,0.35)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{formStatus === 'sending' ? 'Transmitting...' : 'Dispatch Message'}</span>
                  </button>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
