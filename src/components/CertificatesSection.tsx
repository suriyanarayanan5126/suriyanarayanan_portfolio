import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Search, 
  CheckCircle2, 
  X, 
  Building, 
  Trophy, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  ExternalLink,
  ShieldCheck,
  FileText,
  Calendar,
  Sparkles
} from 'lucide-react';
import { CERTIFICATES_DATA, CertificateItem } from '../data/portfolioData.ts';
import { renderSinglePdfToDataUrl } from '../utils/pdfExtractor.ts';

export const CertificatesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'award' | 'certification' | 'workshop' | 'internship'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);
  
  // Rendered preview images (data URLs) mapped by cert.id
  const [certificatePreviews, setCertificatePreviews] = useState<Record<string, string>>({});
  // PDF download / blob URLs mapped by cert.id
  const [certificatePdfUrls, setCertificatePdfUrls] = useState<Record<string, string>>({});
  const [modalZoom, setModalZoom] = useState(1);

  // Active certificates list (Java Full Stack is strictly excluded per Priority 7)
  const activeCertificates = CERTIFICATES_DATA.filter((cert) => !cert.isExcluded);

  // Load certificate previews and PDF references from public assets and browser cache
  useEffect(() => {
    // 1. Check cached renders in localStorage from previous extractions
    try {
      const savedPreviews = localStorage.getItem('suriyanarayanan_pdf_certificate_previews');
      if (savedPreviews) {
        const parsed = JSON.parse(savedPreviews);
        if (parsed && typeof parsed === 'object') {
          setCertificatePreviews(parsed);
        }
      }
    } catch {
      // Storage access catch
    }

    // 2. Discover static PDF assets across possible locations
    activeCertificates.forEach(async (cert) => {
      const candidatePaths = [
        cert.uploadedFileName ? `/certificates/${cert.uploadedFileName}` : '',
        cert.uploadedFileName ? `/${cert.uploadedFileName}` : '',
        cert.uploadedFileName ? `/assets/certificates/${cert.uploadedFileName}` : '',
        `/certificates/${cert.fileName}`,
        `/assets/certificates/${cert.fileName}`,
        cert.filePath,
        ...(cert.aliases ? cert.aliases.map(a => `/certificates/${a}`) : [])
      ].filter(Boolean);

      for (const targetPath of candidatePaths) {
        try {
          const res = await fetch(targetPath, { method: 'HEAD' });
          if (res.ok) {
            const contentType = res.headers.get('content-type') || '';
            if (!contentType.includes('text/html')) {
              setCertificatePdfUrls(prev => ({ ...prev, [cert.id]: targetPath }));

              const currentCache = localStorage.getItem('suriyanarayanan_pdf_certificate_previews');
              const hasCache = currentCache && JSON.parse(currentCache)?.[cert.id];
              if (!hasCache) {
                const previewUrl = await renderSinglePdfToDataUrl(targetPath);
                setCertificatePreviews(prev => {
                  const updated = { ...prev, [cert.id]: previewUrl };
                  try {
                    localStorage.setItem('suriyanarayanan_pdf_certificate_previews', JSON.stringify(updated));
                  } catch {
                    // Storage quota catch
                  }
                  return updated;
                });
              }
              break;
            }
          }
        } catch {
          // fetch error catch
        }
      }
    });
  }, []);

  const filteredCertificates = activeCertificates.filter((cert) => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="certificates" className="relative py-28 bg-[#fafaf8] text-slate-900 overflow-hidden scroll-mt-16 border-y border-slate-200">
      {/* Subtle Warm Ivory & Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-amber-100/50 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-100/50 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-semibold tracking-wider uppercase">05. CREDENTIALS & HONORS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Certificates & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-blue-600">Awards</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-sans">
            Authentic certificates, inter-college symposium prize accolades, and verified professional credentials from IBM SkillsBuild, NxtWave, AICTE, and Kings College of Engineering.
          </p>

          {/* Category Tabs & Search Bar */}
          <div className="w-full max-w-4xl pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[
                { id: 'all', label: 'All Honors' },
                { id: 'award', label: 'Awards & Expo Wins' },
                { id: 'certification', label: 'Certifications' },
                { id: 'internship', label: 'Internships' },
                { id: 'workshop', label: 'Workshops' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white font-bold shadow-md'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificates..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-sans shadow-sm"
              />
            </div>

          </div>
        </motion.div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, idx) => {
            const previewUrl = certificatePreviews[cert.id];
            const pdfUrl = certificatePdfUrls[cert.id] || `/assets/certificates/${cert.fileName}`;
            const isAward = cert.category === 'award';

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-white border border-slate-200/90 hover:border-blue-500/60 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                onClick={() => {
                  setActiveModalCert(cert);
                  setModalZoom(1);
                }}
              >
                {/* Certificate Visual Preview Canvas / Document Header */}
                <div className="relative w-full h-52 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={cert.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="p-6 text-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mx-auto text-blue-600">
                        {isAward ? <Trophy className="w-6 h-6 text-amber-500" /> : <Award className="w-6 h-6" />}
                      </div>
                      <p className="text-xs font-mono font-semibold text-slate-700 truncate max-w-[240px]">
                        {cert.uploadedFileName || cert.fileName}
                      </p>
                      <span className="inline-block text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        Inspect Certificate
                      </span>
                    </div>
                  )}

                  {/* Uploaded File Reference Tag */}
                  {cert.uploadedFileName && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/90 text-slate-600 border border-slate-200 shadow-xs">
                        {cert.uploadedFileName}
                      </span>
                    </div>
                  )}

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm ${
                      isAward 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-blue-600 text-white'
                    }`}>
                      {isAward ? 'Podium Award' : cert.category}
                    </span>
                  </div>

                  {/* Zoom Preview Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-white/95 text-slate-900 text-xs font-semibold shadow-lg flex items-center gap-1.5">
                      <ZoomIn className="w-4 h-4 text-blue-600" />
                      <span>View Full Certificate</span>
                    </span>
                  </div>
                </div>

                {/* Certificate Meta Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    
                    <p className="text-xs font-semibold text-blue-600 font-sans mt-1">
                      {cert.issuer}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs font-sans leading-relaxed line-clamp-3">
                    {cert.details}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cert.date}</span>
                    </span>

                    {cert.verificationId && (
                      <span className="text-blue-600 font-semibold truncate max-w-[140px]" title={cert.verificationId}>
                        ID: {cert.verificationId}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Enlarged High-Resolution Certificate Modal */}
      <AnimatePresence>
        {activeModalCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveModalCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg">
                      {activeModalCert.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-sans">
                      {activeModalCert.issuer} · {activeModalCert.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModalZoom(z => Math.min(2, z + 0.25))}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setModalZoom(z => Math.max(0.75, z - 0.25))}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setModalZoom(1)}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    title="Reset zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveModalCert(null)}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Document Viewer */}
              <div className="flex-1 overflow-auto p-6 bg-slate-100 flex items-center justify-center min-h-[350px]">
                {certificatePreviews[activeModalCert.id] ? (
                  <img
                    src={certificatePreviews[activeModalCert.id]}
                    alt={activeModalCert.title}
                    style={{ transform: `scale(${modalZoom})` }}
                    className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-lg transition-transform duration-200"
                  />
                ) : (
                  <div className="p-8 text-center bg-white rounded-2xl shadow-sm border border-slate-200 max-w-md">
                    <FileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-heading font-bold text-slate-900 text-base mb-1">
                      {activeModalCert.title}
                    </h4>
                    <p className="text-xs text-slate-600 mb-4">
                      {activeModalCert.details}
                    </p>
                    <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      File: {activeModalCert.fileName}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs font-sans">
                <span className="text-slate-500 font-mono">
                  {activeModalCert.verificationId ? `Verification ID: ${activeModalCert.verificationId}` : `Category: ${activeModalCert.category}`}
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href={certificatePdfUrls[activeModalCert.id] || `/assets/certificates/${activeModalCert.fileName}`}
                    download={activeModalCert.fileName}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Document</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
