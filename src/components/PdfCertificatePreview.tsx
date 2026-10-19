import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Loader2, FileText, AlertCircle } from 'lucide-react';

// Configure PDF.js worker to local static file
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
}

interface PdfCertificatePreviewProps {
  pdfUrl: string;
  title: string;
  className?: string;
  highResolution?: boolean;
}

export const PdfCertificatePreview: React.FC<PdfCertificatePreviewProps> = ({
  pdfUrl,
  title,
  className = '',
  highResolution = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderedImage, setRenderedImage] = useState<string | null>(null);
  const [renderStatus, setRenderStatus] = useState<'loading' | 'success' | 'fallback'>('loading');

  useEffect(() => {
    let isCancelled = false;
    let renderTask: any = null;

    async function renderPdf() {
      setRenderStatus('loading');
      setRenderedImage(null);

      try {
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          standardFontDataUrl: '/pdfjs/standard_fonts/',
          cMapUrl: '/pdfjs/cmaps/',
          cMapPacked: true,
        });

        const pdfDoc = await loadingTask.promise;
        if (isCancelled) return;

        const page = await pdfDoc.getPage(1);
        if (isCancelled) return;

        const canvas = canvasRef.current || document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          setRenderStatus('fallback');
          return;
        }

        // Calculate scale for sharp retina rendering
        const unscaledViewport = page.getViewport({ scale: 1 });
        const targetWidth = highResolution ? 1000 : 540;
        const scale = Math.max(1.4, targetWidth / unscaledViewport.width);
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        renderTask = page.render({
          canvasContext: context,
          canvas: canvas,
          viewport: viewport,
        } as any);

        await renderTask.promise;
        if (isCancelled) return;

        try {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          if (!isCancelled) {
            setRenderedImage(dataUrl);
            setRenderStatus('success');
          }
        } catch {
          // If toDataURL is tainted or restricted, fallback to canvas render directly
          if (!isCancelled) {
            setRenderStatus('success');
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.warn('PDF.js rendering notice for', pdfUrl, err);
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
          // cancel errors are expected during unmount
        }
      }
    };
  }, [pdfUrl, highResolution]);

  return (
    <div className={`relative w-full h-full bg-slate-50 flex items-center justify-center overflow-hidden ${className}`}>
      {/* 1. Captured Image Snapshot (Best performance & responsiveness) */}
      {renderStatus === 'success' && renderedImage && (
        <img
          src={renderedImage}
          alt={title}
          className="w-full h-full object-contain select-none"
          loading="lazy"
        />
      )}

      {/* 2. Direct Canvas Render (when data URL is not used) */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain ${
          renderStatus === 'success' && !renderedImage ? 'block' : 'hidden'
        }`}
      />

      {/* 3. Embedded PDF Object / Iframe Fallback */}
      {renderStatus === 'fallback' && (
        <div className="w-full h-full relative flex items-center justify-center bg-slate-100">
          <object
            data={`${pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
            type="application/pdf"
            className="w-full h-full border-0 pointer-events-none"
            title={title}
          >
            <iframe
              src={`${pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
              className="w-full h-full border-0 pointer-events-none"
              title={title}
            />
          </object>
        </div>
      )}

      {/* 4. Loading Spinner */}
      {renderStatus === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/90 text-slate-500 gap-2 font-mono text-xs z-10">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <span>Rendering Original PDF...</span>
        </div>
      )}
    </div>
  );
};
