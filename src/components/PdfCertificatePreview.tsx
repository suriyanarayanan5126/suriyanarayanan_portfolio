import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FileText, Loader2 } from 'lucide-react';

// Configure pdfjs worker to local static file
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
}

interface PdfCertificatePreviewProps {
  pdfUrl: string;
  title: string;
  className?: string;
}

export const PdfCertificatePreview: React.FC<PdfCertificatePreviewProps> = ({
  pdfUrl,
  title,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderStatus, setRenderStatus] = useState<'loading' | 'success' | 'fallback'>('loading');

  useEffect(() => {
    let isCancelled = false;
    let renderTask: any = null;

    async function renderPdf() {
      setRenderStatus('loading');
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          standardFontDataUrl: '/pdfjs/standard_fonts/',
        });

        const pdfDoc = await loadingTask.promise;
        if (isCancelled) return;

        const page = await pdfDoc.getPage(1);
        if (isCancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) {
          setRenderStatus('fallback');
          return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
          setRenderStatus('fallback');
          return;
        }

        // Calculate scale to produce a crisp rendering
        const unscaledViewport = page.getViewport({ scale: 1 });
        const targetWidth = 460;
        const scale = targetWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale: Math.max(1.2, scale) });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        renderTask = page.render({
          canvasContext: context,
          viewport: viewport,
        } as any);

        await renderTask.promise;
        if (!isCancelled) {
          setRenderStatus('success');
        }
      } catch (err) {
        if (!isCancelled) {
          console.warn('PDF.js canvas render fallback for', pdfUrl, err);
          setRenderStatus('fallback');
        }
      }
    }

    renderPdf();

    return () => {
      isCancelled = true;
      if (renderTask && renderTask.cancel) {
        try {
          renderTask.cancel();
        } catch {
          // ignore cancel error
        }
      }
    };
  }, [pdfUrl]);

  return (
    <div className={`relative w-full h-full bg-slate-50 flex items-center justify-center overflow-hidden ${className}`}>
      {/* 1. PDF.js Canvas Render */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          renderStatus === 'success' ? 'opacity-100 block' : 'opacity-0 hidden'
        }`}
      />

      {/* 2. Embedded PDF Object Fallback */}
      {renderStatus === 'fallback' && (
        <div className="w-full h-full relative">
          <object
            data={`${pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
            type="application/pdf"
            className="w-full h-full pointer-events-none border-0"
            title={title}
          >
            <iframe
              src={`${pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
              className="w-full h-full pointer-events-none border-0"
              title={title}
            />
          </object>
        </div>
      )}

      {/* 3. Loading Indicator */}
      {renderStatus === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/90 text-slate-400 gap-2 font-mono text-xs z-10">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <span>Rendering Certificate...</span>
        </div>
      )}
    </div>
  );
};
