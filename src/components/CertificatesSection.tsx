import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  CheckCircle2, 
  X, 
  Building, 
  Trophy, 
  FileCheck, 
  Upload, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  FileText, 
  AlertCircle,
  FolderCheck,
  Award,
  ExternalLink,
  Download
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
  // Uploaded filenames mapped by cert.id
  const [uploadedFileNames, setUploadedFileNames] = useState<Record<string, string>>({});
  
  // Static path status
  const [verifiedStaticPaths, setVerifiedStaticPaths] = useState<Record<string, string>>({});
  const [missingPaths, setMissingPaths] = useState<Record<string, boolean>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  // User feedback notice & modal zoom
  const [batchNotice, setBatchNotice] = useState<string | null>(null);
  const [modalZoom, setModalZoom] = useState(1);
  const batchFileInputRef = useRef<HTMLInputElement>(null);

  // Active certificates list (Java Full Stack is strictly excluded per user instructions)
  const activeCertificates = CERTIFICATES_DATA.filter((cert) => !cert.isExcluded);

  // Check on mount for saved browser uploads & discover static PDF files in public/certificates/
  useEffect(() => {
    // 1. Check localStorage for persistent individual user uploads
    try {
      const savedPreviews = localStorage.getItem('suriyanarayanan_pdf_certificate_previews');
      if (savedPreviews) {
        const parsed = JSON.parse(savedPreviews);
        if (parsed && typeof parsed === 'object') {
          setCertificatePreviews(parsed);
        }
      }
      const savedNames = localStorage.getItem('suriyanarayanan_pdf_certificate_names');
      if (savedNames) {
        const parsedNames = JSON.parse(savedNames);
        if (parsedNames && typeof parsedNames === 'object') {
          setUploadedFileNames(parsedNames);
        }
      }
    } catch {
      // LocalStorage access fallback
    }

    // 2. Discover static PDF files in public/certificates/
    activeCertificates.forEach(async (cert) => {
      const targetPath = cert.filePath || cert.imagePath;
      if (!targetPath) return;

      try {
        const res = await fetch(targetPath, { method: 'HEAD' });
        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (!contentType.includes('text/html')) {
            // Render high-res preview from static PDF
            setVerifiedStaticPaths(prev => ({ ...prev, [cert.id]: targetPath }));
            setCertificatePdfUrls(prev => ({ ...prev, [cert.id]: targetPath }));
            setMissingPaths(prev => ({ ...prev, [cert.id]: false }));

            // If not cached, render PDF page 1 to dataUrl
            const currentCache = localStorage.getItem('suriyanarayanan_pdf_certificate_previews');
            const hasCache = currentCache && JSON.parse(currentCache)?.[cert.id];
            if (!hasCache) {
              const previewUrl = await renderSinglePdfToDataUrl(targetPath);
              setCertificatePreviews(prev => {
                const updated = { ...prev, [cert.id]: previewUrl };
                try {
                  localStorage.setItem('suriyanarayanan_pdf_certificate_previews', JSON.stringify(updated));
                } catch {
                  // ignore
                }
                return updated;
              });
            }
            return;
          }
        }
        setMissingPaths(prev => ({ ...prev, [cert.id]: true }));
      } catch {
        setMissingPaths(prev => ({ ...prev, [cert.id]: true }));
      }
    });
  }, []);

  // Match uploaded PDF filename to a certificate ID
  const matchFileToCertId = (filename: string): string | null => {
    const clean = filename.trim().toLowerCase();
    
    // 1. Exact match with configured fileName (e.g. kings-project-expo-2026.pdf)
    const exact = activeCertificates.find(c => c.fileName.toLowerCase() === clean);
    if (exact) return exact.id;

    // 2. Exact match without extension
    const cleanNoExt = clean.replace(/\.[^/.]+$/, '');
    const exactNoExt = activeCertificates.find(c => c.fileName.toLowerCase().replace(/\.[^/.]+$/, '') === cleanNoExt);
    if (exactNoExt) return exactNoExt.id;

    // 3. Page number aliases (e.g. cert_page_01.pdf or page-1.pdf)
    if (clean.includes('page_01') || clean.includes('page-01') || clean.includes('page1')) return 'cert-kings-project-expo-2026';
    if (clean.includes('page_02') || clean.includes('page-02') || clean.includes('page2')) return 'cert-freq-fest-24';
    if (clean.includes('page_03') || clean.includes('page-03') || clean.includes('page3')) return 'cert-acmet-2k25';
    if (clean.includes('page_04') || clean.includes('page-04') || clean.includes('page4')) return 'cert-electrovibez-23';
    if (clean.includes('page_05') || clean.includes('page-05') || clean.includes('page5')) return 'cert-mini-project-expo-2023';
    if (clean.includes('page_06') || clean.includes('page-06') || clean.includes('page6')) return 'cert-mini-project-expo-2024';
    if (clean.includes('page_07') || clean.includes('page-07') || clean.includes('page7')) return 'cert-ibm-credly';
    if (clean.includes('page_08') || clean.includes('page-08') || clean.includes('page8')) return 'cert-nxtwave-static';
    if (clean.includes('page_10') || clean.includes('page-10') || clean.includes('page10')) return 'cert-nxtwave-responsive';
    if (clean.includes('page_11') || clean.includes('page-11') || clean.includes('page11')) return 'cert-iot-workshop-kings';
    if (clean.includes('page_12') || clean.includes('page-12') || clean.includes('page12')) return 'cert-ipr-mic-aicte';
    if (clean.includes('page_14') || clean.includes('page-14') || clean.includes('page14')) return 'cert-edunet-internship';
    if (clean.includes('page_13') || clean.includes('page-13') || clean.includes('page13')) return 'cert-bsnl-training';

    // 4. Keyword matching
    if (clean.includes('oorai') || clean.includes('kings-project')) return 'cert-kings-project-expo-2026';
    if (clean.includes('freq') || clean.includes('pillay')) return 'cert-freq-fest-24';
    if (clean.includes('acmet') || clean.includes('mam')) return 'cert-acmet-2k25';
    if (clean.includes('electrovibez')) return 'cert-electrovibez-23';
    if (clean.includes('mini-project') && clean.includes('2023')) return 'cert-mini-project-expo-2023';
    if (clean.includes('mini-project') && clean.includes('2024')) return 'cert-mini-project-expo-2024';
    if (clean.includes('credly') || (clean.includes('ibm') && clean.includes('fundamentals'))) return 'cert-ibm-credly';
    if (clean.includes('static') || (clean.includes('nxtwave') && clean.includes('static'))) return 'cert-nxtwave-static';
    if (clean.includes('responsive') || (clean.includes('nxtwave') && clean.includes('responsive'))) return 'cert-nxtwave-responsive';
    if (clean.includes('arduino') || clean.includes('raspberry') || clean.includes('iot-workshop')) return 'cert-iot-workshop-kings';
    if (clean.includes('ipr') || clean.includes('patent')) return 'cert-ipr-mic-aicte';
    if (clean.includes('edunet') || clean.includes('skillsbuild')) return 'cert-edunet-internship';
    if (clean.includes('bsnl') || clean.includes('thanjavur')) return 'cert-bsnl-training';

    return null;
  };

  // Handle single card PDF upload
  const handleSinglePdfUpload = async (certId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      let previewDataUrl: string;

      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        previewDataUrl = await renderSinglePdfToDataUrl(file);
      } else if (file.type.startsWith('image/')) {
        // Fallback support if an image is provided
        previewDataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } else {
        setBatchNotice(`File "${file.name}" is not a recognized PDF or image. Please select a .pdf file.`);
        return;
      }

      const pdfBlobUrl = URL.createObjectURL(file);
      const updatedPreviews = { ...certificatePreviews, [certId]: previewDataUrl };
      const updatedPdfUrls = { ...certificatePdfUrls, [certId]: pdfBlobUrl };
      const updatedNames = { ...uploadedFileNames, [certId]: file.name };

      setCertificatePreviews(updatedPreviews);
      setCertificatePdfUrls(updatedPdfUrls);
      setUploadedFileNames(updatedNames);
      setMissingPaths(prev => ({ ...prev, [certId]: false }));

      try {
        localStorage.setItem('suriyanarayanan_pdf_certificate_previews', JSON.stringify(updatedPreviews));
        localStorage.setItem('suriyanarayanan_pdf_certificate_names', JSON.stringify(updatedNames));
      } catch {
        // storage fallback
      }

      setBatchNotice(`Connected PDF "${file.name}" to certificate card!`);
    } catch (err: any) {
      console.error('Failed to process certificate PDF:', err);
      setBatchNotice(`Could not process PDF "${file.name}". Please ensure the file is valid and unencrypted.`);
    } finally {
      setIsProcessing(false);
      e.target.value = '';
    }
  };

  // Handle batch PDF upload matching
  const handleBatchPdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    let matchCount = 0;
    const updatedPreviews = { ...certificatePreviews };
    const updatedPdfUrls = { ...certificatePdfUrls };
    const updatedNames = { ...uploadedFileNames };

    const fileList = Array.from(files);

    for (const file of fileList) {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const isImg = file.type.startsWith('image/');
      if (!isPdf && !isImg) continue;

      const targetId = matchFileToCertId(file.name);
      if (targetId) {
        try {
          const previewUrl = isPdf 
            ? await renderSinglePdfToDataUrl(file)
            : await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
              });

          updatedPreviews[targetId] = previewUrl;
          updatedPdfUrls[targetId] = URL.createObjectURL(file);
          updatedNames[targetId] = file.name;
          matchCount++;
        } catch (err) {
          console.warn(`Failed rendering preview for ${file.name}`, err);
        }
      }
    }

    setCertificatePreviews(updatedPreviews);
    setCertificatePdfUrls(updatedPdfUrls);
    setUploadedFileNames(updatedNames);
    setIsProcessing(false);

    try {
      localStorage.setItem('suriyanarayanan_pdf_certificate_previews', JSON.stringify(updatedPreviews));
      localStorage.setItem('suriyanarayanan_pdf_certificate_names', JSON.stringify(updatedNames));
    } catch {
      // storage fallback
    }

    if (matchCount > 0) {
      setBatchNotice(`Connected ${matchCount} certificate PDF(s) to their respective cards!`);
    } else {
      setBatchNotice(`Selected ${fileList.length} file(s). Use the 'Select Certificate PDF' button on each card to connect specific files.`);
    }

    if (batchFileInputRef.current) batchFileInputRef.current.value = '';
  };

  // Retrieve active preview image URL for a certificate
  const getCertificatePreview = (certId: string): string | null => {
    return certificatePreviews[certId] || null;
  };

  // Retrieve active PDF document URL
  const getCertificatePdfUrl = (cert: CertificateItem): string | null => {
    if (certificatePdfUrls[cert.id]) {
      return certificatePdfUrls[cert.id];
    }
    if (verifiedStaticPaths[cert.id]) {
      return verifiedStaticPaths[cert.id];
    }
    return null;
  };

  const getConnectedFilename = (cert: CertificateItem): string => {
    return uploadedFileNames[cert.id] || cert.fileName;
  };

  const categories = [
    { id: 'all', label: 'All Credentials' },
    { id: 'award', label: 'Symposium Prizes & Awards' },
    { id: 'certification', label: 'Technical Certifications' },
    { id: 'workshop', label: 'Workshops & Seminars' },
    { id: 'internship', label: 'Industrial Internships' },
  ];

  const filteredCerts = activeCertificates.filter((cert) => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const connectedCertsCount = activeCertificates.filter(c => !!getCertificatePreview(c.id)).length;

  const handleNextModalCert = () => {
    if (!activeModalCert) return;
    const currentIndex = filteredCerts.findIndex(c => c.id === activeModalCert.id);
    if (currentIndex !== -1 && currentIndex < filteredCerts.length - 1) {
      setActiveModalCert(filteredCerts[currentIndex + 1]);
      setModalZoom(1);
    }
  };

  const handlePrevModalCert = () => {
    if (!activeModalCert) return;
    const currentIndex = filteredCerts.findIndex(c => c.id === activeModalCert.id);
    if (currentIndex > 0) {
      setActiveModalCert(filteredCerts[currentIndex - 1]);
      setModalZoom(1);
    }
  };

  return (
    <section id="certificates" className="relative py-28 bg-[#04070b] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-emerald-500/6 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-circuit-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll-Triggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-xs font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Trophy className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTOR 05 // CREDENTIALS & HONORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Certificates & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-200">Awards</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            {activeCertificates.length} authentic credentials from international student symposiums, IBM SkillsBuild, AICTE, BSNL, NxtWave, and collegiate competitions, managed as individual PDF files.
          </p>

          {/* Centralized Certificate PDF Manager Banner */}
          <div className="w-full max-w-3xl mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#070d13] via-[#091118] to-[#070d13] border border-emerald-500/35 shadow-[0_0_30px_rgba(16,185,129,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                <FolderCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {connectedCertsCount > 0 ? 'Certificate PDFs Connected' : 'Connect Certificate PDFs'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    connectedCertsCount > 0 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {connectedCertsCount} / {activeCertificates.length} PDFs Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                  {connectedCertsCount > 0
                    ? `${connectedCertsCount} individual certificate PDF(s) active with high-resolution visual previews and PDF downloads.`
                    : 'Upload each separate certificate PDF (.pdf) using the buttons on each card, or place them into public/certificates/.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <input
                ref={batchFileInputRef}
                type="file"
                multiple
                accept="application/pdf,.pdf,image/png,image/jpeg,image/jpg,image/webp,.png,.jpg,.jpeg,.webp"
                onChange={handleBatchPdfUpload}
                className="hidden"
                id="batch-certificate-upload"
              />
              <label
                htmlFor="batch-certificate-upload"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer shadow-md ${
                  isProcessing
                    ? 'bg-slate-800 text-slate-400 cursor-wait'
                    : 'bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                }`}
                title="Select multiple individual certificate PDF files"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Rendering Previews...' : 'Connect Multiple PDFs'}</span>
              </label>
            </div>
          </div>

          {/* Feedback Notice Banner */}
          {batchNotice && (
            <div className="w-full max-w-3xl mt-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{batchNotice}</span>
              </span>
              <button onClick={() => setBatchNotice(null)} className="text-emerald-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Search & Category Filter Controls */}
          <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center gap-3 mt-6">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificate PDFs..."
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 outline-none font-mono transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Segmented Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-slate-950/90 border border-slate-800/80 w-full sm:w-auto shadow-md">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certificates Grid with Staggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, idx) => {
            const previewImg = getCertificatePreview(cert.id);
            const isMissing = missingPaths[cert.id] && !previewImg;
            const connectedName = getConnectedFilename(cert);

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 sm:p-6 rounded-2xl bg-[#090e15]/90 border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-sm"
              >
                <div>
                  {/* REAL PDF PREVIEW CONTAINER — object-fit: contain without cropping */}
                  {previewImg ? (
                    <div 
                      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/95 border border-emerald-500/30 mb-4 group-hover:border-emerald-400 transition-colors cursor-pointer"
                      onClick={() => {
                        setActiveModalCert(cert);
                        setModalZoom(1);
                      }}
                      title="Click to inspect PDF document"
                    >
                      <img
                        src={previewImg}
                        alt={cert.title}
                        className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 pointer-events-none">
                        <span className="text-[11px] font-mono text-emerald-300 font-semibold flex items-center gap-1">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Inspect PDF</span>
                        </span>
                        <span className="text-[10px] font-mono bg-black/80 px-2 py-0.5 rounded text-slate-300 border border-emerald-500/30 truncate max-w-[140px]">
                          {connectedName}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* PENDING CONNECTION CARD SLOT FOR INDIVIDUAL PDF */
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-[#0c141d] to-[#06090e] border border-dashed border-emerald-500/30 mb-4 flex flex-col items-center justify-center p-4 text-center group-hover:border-emerald-500/50 transition-colors">
                      <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 mb-2">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-white">
                        Certificate PDF Needed
                      </span>
                      <div className="text-[10px] font-mono text-slate-400 mt-1 max-w-xs break-all">
                        Expected file: <span className="text-emerald-300 font-semibold">{cert.fileName}</span>
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 mt-0.5">
                        Target path: {cert.filePath || cert.imagePath}
                      </div>

                      {/* Clear Missing Path Alert if verified missing on server */}
                      {isMissing && (
                        <div className="mt-2 text-[9px] font-mono text-amber-300/90 bg-amber-950/40 border border-amber-500/30 px-2 py-1 rounded">
                          File not found at {cert.filePath || cert.imagePath}. Place {cert.fileName} in public/certificates/ or click below.
                        </div>
                      )}

                      {/* Individual card upload button */}
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono transition-colors shadow-sm cursor-pointer mt-3">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Select Certificate PDF (.pdf)</span>
                        <input
                          type="file"
                          accept="application/pdf,.pdf,image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                          onChange={(e) => handleSinglePdfUpload(cert.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}

                  {/* Header Badge */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/30">
                      {cert.category === 'award' ? '🏆 Podium Prize' : cert.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{cert.date}</span>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide font-heading mb-1.5 line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* Issuing Organization */}
                  <div className="flex items-start gap-2 text-xs text-slate-400 mb-3 font-sans">
                    <Building className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{cert.issuer}</span>
                  </div>

                  {/* Achievement Level or Verification ID */}
                  {cert.achievementLevel && (
                    <div className="mb-3 px-2.5 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                      <span className="truncate">{cert.achievementLevel}</span>
                    </div>
                  )}

                  {cert.verificationId && (
                    <div className="mb-3 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                      <span className="text-slate-500">ID:</span>
                      <span className="text-emerald-400 truncate max-w-[170px]" title={cert.verificationId}>
                        {cert.verificationId}
                      </span>
                    </div>
                  )}

                  {/* Details Paragraph */}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4 font-sans">
                    {cert.details}
                  </p>
                </div>

                {/* Card Footer: Individual Upload / Replace Controls */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  {previewImg ? (
                    <>
                      <button
                        onClick={() => {
                          setActiveModalCert(cert);
                          setModalZoom(1);
                        }}
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Document</span>
                      </button>

                      <label className="text-slate-400 hover:text-white hover:underline cursor-pointer flex items-center gap-1">
                        <Upload className="w-3 h-3 text-emerald-400" />
                        <span>Replace PDF</span>
                        <input
                          type="file"
                          accept="application/pdf,.pdf,image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                          onChange={(e) => handleSinglePdfUpload(cert.id, e)}
                          className="hidden"
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-500 truncate max-w-[150px]">
                        {cert.fileName}
                      </span>

                      <label className="text-emerald-400 hover:underline cursor-pointer flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload PDF</span>
                        <input
                          type="file"
                          accept="application/pdf,.pdf,image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                          onChange={(e) => handleSinglePdfUpload(cert.id, e)}
                          className="hidden"
                        />
                      </label>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search Results Fallback */}
        {filteredCerts.length === 0 && (
          <div className="mt-12 p-8 rounded-2xl bg-slate-950/60 border border-slate-800 text-center max-w-md mx-auto">
            <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-mono text-slate-400">No certificates match "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono hover:bg-emerald-500/20 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* MODAL: HIGH-RESOLUTION ENLARGE VIEW WITH ZOOM, METADATA, AND DIRECT PDF DOWNLOAD */}
        <AnimatePresence>
          {activeModalCert && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
              onClick={() => setActiveModalCert(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-4xl max-h-[92vh] bg-gradient-to-b from-[#0e141c] via-[#090d14] to-[#05070a] border border-emerald-500/40 rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.3)] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Top Bar */}
                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-black/60">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                        AUTHENTIC VERIFIED CREDENTIAL
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {activeModalCert.fileName} · Issued {activeModalCert.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Prev / Next buttons */}
                    <button
                      onClick={handlePrevModalCert}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500 cursor-pointer"
                      title="Previous Certificate"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextModalCert}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500 cursor-pointer"
                      title="Next Certificate"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveModalCert(null)}
                      className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
                      title="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Body: Two Columns on Desktop (Preview Image + Full Credential Details) */}
                <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Certificate Image & Zoom Controls */}
                  <div className="lg:col-span-7 flex flex-col items-center">
                    {getCertificatePreview(activeModalCert.id) ? (
                      <div className="w-full flex flex-col items-center space-y-3">
                        {/* Enlarge / Zoom Tool Bar */}
                        <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/80 border border-slate-800 text-xs font-mono">
                          <span className="text-slate-400">Zoom: {Math.round(modalZoom * 100)}%</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setModalZoom(z => Math.max(0.6, z - 0.2))}
                              className="p-1.5 rounded bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
                              title="Zoom Out"
                            >
                              <ZoomOut className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setModalZoom(1)}
                              className="p-1.5 rounded bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
                              title="Reset Zoom"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setModalZoom(z => Math.min(2.5, z + 0.2))}
                              className="p-1.5 rounded bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
                              title="Zoom In"
                            >
                              <ZoomIn className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Certificate Image Canvas Container */}
                        <div className="w-full max-h-[460px] overflow-auto rounded-2xl border border-emerald-500/40 bg-black/95 flex items-center justify-center p-2 shadow-2xl">
                          <img
                            src={getCertificatePreview(activeModalCert.id)!}
                            alt={activeModalCert.title}
                            style={{ transform: `scale(${modalZoom})`, transformOrigin: 'center center' }}
                            className="max-w-full max-h-[440px] object-contain transition-transform duration-200"
                          />
                        </div>

                        {/* File path label & Direct PDF Download Button */}
                        <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                          <span className="truncate max-w-[200px]">
                            File: <span className="text-emerald-300">{getConnectedFilename(activeModalCert)}</span>
                          </span>

                          {getCertificatePdfUrl(activeModalCert) && (
                            <a
                              href={getCertificatePdfUrl(activeModalCert)!}
                              target="_blank"
                              rel="noreferrer"
                              download={activeModalCert.fileName}
                              className="inline-flex items-center gap-1 text-emerald-400 hover:underline hover:text-emerald-300 font-semibold"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download PDF</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/3] rounded-2xl border border-dashed border-emerald-500/35 bg-gradient-to-b from-[#0a1017] to-[#05070a] p-8 flex flex-col items-center justify-center text-center space-y-3">
                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                          <FileCheck className="w-10 h-10" />
                        </div>
                        <h4 className="text-base font-bold text-white font-heading">
                          Certificate PDF Pending
                        </h4>
                        <p className="text-xs text-slate-400 font-sans max-w-sm">
                          Upload <span className="text-emerald-300 font-mono font-semibold">{activeModalCert.fileName}</span> to <span className="text-emerald-300 font-mono">public/certificates/</span> or click below to select it from your device.
                        </p>
                        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono transition-colors shadow-sm cursor-pointer mt-2">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Select PDF File (.pdf)</span>
                          <input
                            type="file"
                            accept="application/pdf,.pdf,image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                            onChange={(e) => handleSinglePdfUpload(activeModalCert.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Full Official Details & Verification */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 inline-block mb-2">
                          {activeModalCert.category === 'award' ? '🏆 Podium Prize' : activeModalCert.category.toUpperCase()}
                        </span>
                        <h3 className="text-xl font-bold text-white font-heading leading-snug">
                          {activeModalCert.title}
                        </h3>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2 text-xs font-mono">
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-500">Issuer:</span>
                          <span className="text-right text-white font-sans">{activeModalCert.issuer}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-500">Date Issued:</span>
                          <span className="text-emerald-400">{activeModalCert.date}</span>
                        </div>
                        {activeModalCert.achievementLevel && (
                          <div className="flex justify-between text-slate-300">
                            <span className="text-slate-500">Recognition:</span>
                            <span className="text-lime-300 font-semibold">{activeModalCert.achievementLevel}</span>
                          </div>
                        )}
                        {activeModalCert.verificationId && (
                          <div className="flex justify-between text-slate-300">
                            <span className="text-slate-500">Credential ID:</span>
                            <span className="text-emerald-300 break-all text-right">{activeModalCert.verificationId}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-500">Target PDF:</span>
                          <span className="text-slate-300 truncate max-w-[180px]">{activeModalCert.fileName}</span>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-1.5 font-semibold">
                          Official Scope & Verification
                        </h5>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans text-justify bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                          {activeModalCert.details}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Credential Record</span>
                      </span>

                      {/* Replace PDF in modal */}
                      <label className="text-slate-300 hover:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Replace PDF</span>
                        <input
                          type="file"
                          accept="application/pdf,.pdf,image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                          onChange={(e) => handleSinglePdfUpload(activeModalCert.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
