/**
 * ASSET MANAGEMENT UTILITY
 * 
 * Provides persistent storage, mapping, and lifecycle management for:
 * 1. Individually uploaded certificate images (PNG, JPG, JPEG)
 * 2. Individually uploaded project demonstration videos (MP4, WebM, MOV)
 * 3. Server-side static asset discovery
 */

import { 
  CERTIFICATE_REGISTRY, 
  PROJECT_VIDEO_REGISTRY, 
  CertificateAssetEntry, 
  ProjectVideoAssetEntry,
  matchCertificateByFilename,
  matchProjectVideoByFilename
} from '../data/assetRegistry.ts';

// IndexedDB database and store names for resilient binary storage
const DB_NAME = 'suriyanarayanan_portfolio_assets_db';
const CERT_STORE = 'certificates';
const VIDEO_STORE = 'videos';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(CERT_STORE)) {
        db.createObjectStore(CERT_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(VIDEO_STORE)) {
        db.createObjectStore(VIDEO_STORE, { keyPath: 'projectId' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export interface StoredCertificateAsset {
  id: string; // certificate ID or custom ID
  filename: string;
  dataUrl: string;
  uploadedAt: number;
  title?: string;
  isCustom?: boolean;
}

export interface StoredVideoAsset {
  projectId: string;
  filename: string;
  blobUrl: string;
  format: 'mp4' | 'webm' | 'mov';
  fileSize: number;
  uploadedAt: number;
}

// Memory caches
const memoryCertificates: Map<string, string> = new Map();
const memoryVideos: Map<string, string> = new Map();

/**
 * Check if browser supports playing the given video format
 */
export function checkVideoFormatSupport(file: File): { supported: boolean; reason?: string } {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  if (name.endsWith('.mp4') || type === 'video/mp4') {
    return { supported: true };
  }
  if (name.endsWith('.webm') || type === 'video/webm') {
    return { supported: true };
  }
  if (name.endsWith('.mov') || type === 'video/quicktime') {
    const video = document.createElement('video');
    const canPlay = video.canPlayType('video/quicktime');
    if (canPlay === 'probably' || canPlay === 'maybe') {
      return { supported: true };
    }
    return { 
      supported: false, 
      reason: 'Your browser cannot play Apple QuickTime (.mov) format directly. Please upload in MP4 (H.264) or WebM format.' 
    };
  }

  return {
    supported: false,
    reason: `Unsupported video format. Allowed formats: .mp4, .webm, or supported .mov files.`
  };
}

/**
 * Convert a File object to Data URL
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Save an uploaded certificate image to IndexedDB and cache
 */
export async function saveCertificateImage(
  certId: string, 
  filename: string, 
  dataUrl: string,
  title?: string
): Promise<void> {
  memoryCertificates.set(certId, dataUrl);

  try {
    const db = await openDB();
    const tx = db.transaction(CERT_STORE, 'readwrite');
    const store = tx.objectStore(CERT_STORE);
    store.put({
      id: certId,
      filename,
      dataUrl,
      uploadedAt: Date.now(),
      title
    });
  } catch (err) {
    console.warn('IndexedDB write failed, fallback to localStorage/memory:', err);
    try {
      localStorage.setItem(`cert_asset_${certId}`, dataUrl);
    } catch {
      // Memory only if quota exceeded
    }
  }
}

/**
 * Load all stored certificate images from IndexedDB
 */
export async function loadAllCertificateImages(): Promise<Map<string, string>> {
  const result = new Map<string, string>(memoryCertificates);

  try {
    const db = await openDB();
    const tx = db.transaction(CERT_STORE, 'readonly');
    const store = tx.objectStore(CERT_STORE);
    const request = store.getAll();

    return new Promise((resolve) => {
      request.onsuccess = () => {
        const items: StoredCertificateAsset[] = request.result || [];
        for (const item of items) {
          result.set(item.id, item.dataUrl);
          memoryCertificates.set(item.id, item.dataUrl);
        }
        resolve(result);
      };
      request.onerror = () => resolve(result);
    });
  } catch {
    // Fallback: check localStorage keys
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('cert_asset_')) {
          const certId = key.replace('cert_asset_', '');
          const val = localStorage.getItem(key);
          if (val) {
            result.set(certId, val);
            memoryCertificates.set(certId, val);
          }
        }
      }
    } catch {
      // Ignore
    }
    return result;
  }
}

/**
 * Save an uploaded project video to memory and session
 */
export function saveProjectVideo(
  projectId: string, 
  file: File
): { blobUrl: string; format: 'mp4' | 'webm' | 'mov' } {
  // Strict patent protection
  if (projectId === 'patent-oorai-display') {
    throw new Error('Confidential Project: No video demonstration may be linked or displayed for this patent project.');
  }

  const blobUrl = URL.createObjectURL(file);
  memoryVideos.set(projectId, blobUrl);

  const format = file.name.toLowerCase().endsWith('.webm') 
    ? 'webm' 
    : file.name.toLowerCase().endsWith('.mov') 
      ? 'mov' 
      : 'mp4';

  try {
    sessionStorage.setItem(`project_video_${projectId}`, blobUrl);
    sessionStorage.setItem(`project_video_meta_${projectId}`, JSON.stringify({
      filename: file.name,
      fileSize: file.size,
      format,
      uploadedAt: Date.now()
    }));
  } catch {
    // Session fallback
  }

  return { blobUrl, format };
}

/**
 * Load active video URL for a project
 */
export function getActiveProjectVideo(projectId: string): string | null {
  if (projectId === 'patent-oorai-display') return null;
  return memoryVideos.get(projectId) || sessionStorage.getItem(`project_video_${projectId}`) || null;
}
