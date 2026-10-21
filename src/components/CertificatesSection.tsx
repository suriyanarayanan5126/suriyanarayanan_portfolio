import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Search, 
  X, 
  Trophy, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  FileCheck,
  FileText
} from 'lucide-react';
import { CERTIFICATES_DATA, CertificateItem } from '../data/portfolioData.ts';
import { PdfCertificatePreview } from './PdfCertificatePreview.tsx';

export const CertificatesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'award' | 'certification' | 'workshop' | 'internship'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);
  const [modalZoom, setModalZoom] = useState(1);
  const [modalViewMode, setModalViewMode] = useState<'preview' | 'embedded'>('preview');

  // Active certificates list (Java Full Stack 9.pdf is strictly excluded per user instructions)
  const activeCertificates = CERTIFICATES_DATA.filter((cert) => !cert.isExcluded);

  const filteredCertificates = activeCertificates.filter((cert) => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.uploadedFileName && cert.uploadedFileName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (cert: CertificateItem, fileType: 'pdf' | 'image' = 'image', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const downloadUrl = (fileType === 'image' && cert.imagePath) ? cert.imagePath : cert.filePath;
    const downloadName = fileType === 'image' 
      ? (cert.uploadedFileName || `${cert.id}.jpeg`)
      : (cert.fileName || `${cert.id}.pdf`);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenPdf = (cert: CertificateItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const targetUrl = cert.filePath || cert.imagePath;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="certificates" className="relative py-28 bg-[#fafafc] text-slate-900 overflow-hidden scroll-mt-16 border-y border-slate-200">
      {/* Background subtle radiant lighting & grid on pure white */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-100/40 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-100/40 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-800 shadow-xs">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold tracking-wider uppercase">05. CREDENTIALS & HONORS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Certificates & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-red-500">Awards</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-sans">
            Authentic certificate original previews, inter-college symposium prize accolades, and verified professional credentials from Kings College of Engineering, IBM SkillsBuild, NxtWave, and AICTE.
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
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
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
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-sans shadow-xs"
              />
            </div>

          </div>
        </motion.div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, idx) => {
            const isAward = cert.category === 'award';

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-white border border-slate-200/90 hover:border-blue-500 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer h-full min-h-[440px]"
                onClick={() => {
                  setActiveModalCert(cert);
                  setModalZoom(1);
                  setModalViewMode('preview');
                }}
              >
                {/* Certificate Visual Preview Canvas Header */}
                <div className="relative w-full h-56 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100 p-2">
                  {/* Real original PDF or JPEG image preview */}
                  <PdfCertificatePreview
                    pdfUrl={cert.filePath}
                    imagePath={cert.imagePath}
                    title={cert.title}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Uploaded File Reference Tag */}
                  {cert.uploadedFileName && (
                    <div className="absolute top-3 right-3 z-10 pointer-events-none">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/95 text-slate-700 border border-slate-200 shadow-xs">
                        {cert.uploadedFileName}
                      </span>
                    </div>
                  )}

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs ${
                      isAward 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-blue-600 text-white'
                    }`}>
                      {isAward ? 'Podium Award' : cert.category}
                    </span>
                  </div>

                  {/* Hover Overlay with "View Full Certificate" */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                    <span className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-semibold shadow-lg flex items-center gap-1.5">
                      <ZoomIn className="w-4 h-4 text-blue-600" />
                      <span>View Full Certificate</span>
                    </span>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-blue-700 font-semibold mt-1">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed font-sans">
                      {cert.details}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cert.date}</span>
                    </span>

                    {/* Separate View & Download Actions */}
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleOpenPdf(cert, e)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 transition-colors cursor-pointer"
                        title="Open original PDF in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDownload(cert, 'image', e)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs border border-blue-200 transition-colors cursor-pointer"
                        title="Download original certificate"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Polished Certificate Modal / Lightbox */}
      <AnimatePresence>
        {activeModalCert && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-fade-in"
            onClick={() => setActiveModalCert(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      {activeModalCert.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {activeModalCert.issuer} · {activeModalCert.uploadedFileName || activeModalCert.fileName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mode switcher: Preview vs Embedded PDF */}
                  <div className="hidden sm:flex items-center bg-slate-200/80 p-0.5 rounded-xl text-xs font-mono">
                    <button
                      onClick={() => setModalViewMode('preview')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        modalViewMode === 'preview'
                          ? 'bg-white text-slate-900 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Image Preview
                    </button>
                    <button
                      onClick={() => setModalViewMode('embedded')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        modalViewMode === 'embedded'
                          ? 'bg-white text-slate-900 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Interactive PDF
                    </button>
                  </div>

                  <button
                    onClick={() => setModalZoom(prev => Math.min(2.5, prev + 0.25))}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-xs cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setModalZoom(prev => Math.max(0.75, prev - 0.25))}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-xs cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setModalZoom(1)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-xs cursor-pointer"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveModalCert(null)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Certificate Viewer Area */}
              <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-100 flex items-center justify-center min-h-[420px]">
                {modalViewMode === 'preview' ? (
                  <div 
                    className="transition-transform duration-200 origin-center bg-white shadow-xl rounded-2xl overflow-hidden max-w-full"
                    style={{ transform: `scale(${modalZoom})` }}
                  >
                    <PdfCertificatePreview
                      pdfUrl={activeModalCert.filePath}
                      imagePath={activeModalCert.imagePath}
                      title={activeModalCert.title}
                      highResolution={true}
                      className="w-[740px] max-w-full h-[520px]"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-full h-[520px] bg-white rounded-2xl overflow-hidden shadow-xl"
                    style={{ transform: `scale(${modalZoom})` }}
                  >
                    <iframe
                      src={`${activeModalCert.filePath}#toolbar=1&navpanes=0`}
                      className="w-full h-full border-0"
                      title={activeModalCert.title}
                    />
                  </div>
                )}
              </div>

              {/* Footer Controls & Details */}
              <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 font-sans">
                  {activeModalCert.details}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => handleOpenPdf(activeModalCert)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-xs font-semibold border border-slate-200 shadow-xs transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in New Tab</span>
                  </button>

                  {activeModalCert.imagePath && (
                    <button
                      onClick={() => handleDownload(activeModalCert, 'image')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Image</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDownload(activeModalCert, 'pdf')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
