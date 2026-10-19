import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

export interface ExtractedPage {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * Extracts all pages of a PDF File into high-resolution PNG data URLs.
 * Renders at 2x scale for crisp reading on retina displays.
 */
export async function extractPdfPages(file: File, onProgress?: (current: number, total: number) => void): Promise<ExtractedPage[]> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;
  const pages: ExtractedPage[] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: 1.8 }); // High quality preview

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvas: canvas,
      canvasContext: context,
      viewport: viewport,
    } as any).promise;

    const dataUrl = canvas.toDataURL('image/png', 0.92);
    pages.push({
      pageNumber: i,
      dataUrl,
      width: viewport.width,
      height: viewport.height,
    });

    if (onProgress) {
      onProgress(i, numPages);
    }
  }

  return pages;
}

/**
 * Renders the primary page of an individual certificate PDF File or URL into a crisp high-resolution image data URL.
 */
export async function renderSinglePdfToDataUrl(fileOrUrl: File | string): Promise<string> {
  let arrayBuffer: ArrayBuffer;
  if (typeof fileOrUrl === 'string') {
    const res = await fetch(fileOrUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers.get('content-type');
    // If server returned html (e.g. index.html SPA fallback for 404), throw error
    if (contentType && contentType.includes('text/html')) {
      throw new Error('File not found (SPA fallback)');
    }
    arrayBuffer = await res.arrayBuffer();
  } else {
    arrayBuffer = await fileOrUrl.arrayBuffer();
  }

  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  const page = await pdfDoc.getPage(1);
  const viewport = page.getViewport({ scale: 2.0 });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not initialize canvas context');

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({
    canvas: canvas,
    canvasContext: context,
    viewport: viewport,
  } as any).promise;

  return canvas.toDataURL('image/png', 0.95);
}
