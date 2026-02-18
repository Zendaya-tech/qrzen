import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toSvg } from 'qrcode';
import type { QrOptions } from './QrGenerator';
import { Download, Share2 } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

const QrDisplay: React.FC<{ value: string; options: QrOptions; }> = ({ value, options }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const getCanvas = (): HTMLCanvasElement | null => {
    return qrRef.current ? qrRef.current.querySelector('canvas') : null;
  };

  const download = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (url.startsWith('blob:')) URL.revokeObjectURL(url);
  };

  const saveNativeFile = async (base64Data: string, filename: string) => {
    const platform = Capacitor.getPlatform();
    const directory = platform === 'android' ? Directory.External : Directory.Documents;
    await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory,
      recursive: true,
    });
    const fileUri = await Filesystem.getUri({ directory, path: filename });
    await Share.share({
      title: filename,
      url: fileUri.uri,
      dialogTitle: 'Save or share',
    });
  };

  const downloadPNG = async () => {
    const canvas = getCanvas();
    if (!canvas) return;
    // Render onto an opaque canvas so the exported PNG uses the selected background color.
    const output = document.createElement('canvas');
    output.width = canvas.width;
    output.height = canvas.height;
    const ctx = output.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = options.bgColor;
    ctx.fillRect(0, 0, output.width, output.height);
    ctx.drawImage(canvas, 0, 0);
    const dataUrl = output.toDataURL('image/png');
    if (Capacitor.isNativePlatform()) {
      const base64 = dataUrl.split(',')[1];
      try {
        await saveNativeFile(base64, 'qrcode.png');
      } catch (error) {
        console.error('Native save error:', error);
      }
      return;
    }
    download(dataUrl, 'qrcode.png');
  };

  const downloadSVG = () => {
    // Note: SVG download via this method won't include the embedded logo from the canvas.
    toSvg(value, {
      width: options.size,
      color: { dark: options.fgColor, light: options.bgColor },
      errorCorrectionLevel: options.level,
    }, (err, svgString) => {
      if (err) throw err;
      if (Capacitor.isNativePlatform()) {
        const base64 = btoa(unescape(encodeURIComponent(svgString)));
        saveNativeFile(base64, 'qrcode.svg').catch((error) => {
          console.error('Native save error:', error);
        });
        return;
      }
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
      download(URL.createObjectURL(svgBlob), 'qrcode.svg');
    });
  };

  const handleShare = async () => {
    const canvas = getCanvas();
    if (canvas && navigator.share) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.share({
              files: [new File([blob], 'qrcode.png', { type: 'image/png' })],
            });
          } catch (error) { console.error('Share error:', error); }
        }
      }, 'image/png');
    } else {
      alert('Web Share API not available.');
    }
  };

  const imageSettings = options.logoImage ? {
    src: options.logoImage,
    height: options.size * 0.2,
    width: options.size * 0.2,
    excavate: true,
  } : undefined;

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 animate-scale-in">
      <div className="relative group w-full flex justify-center">
        {/* Glow effect on hover - hidden on mobile for performance */}
        <div className="hidden sm:block absolute -inset-5 bg-gradient-to-r from-orange-200/50 via-amber-200/40 to-sky-200/50 dark:from-sky-500/20 dark:via-cyan-500/10 dark:to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
        
        <div
          ref={qrRef}
          className="relative p-4 sm:p-6 lg:p-8 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-white/70 dark:border-slate-800/80 qr-glow transition-all duration-300 sm:group-hover:scale-[1.02] backdrop-blur"
          style={{ backgroundColor: options.bgColor }}
        >
          <QRCodeCanvas
            value={value}
            size={options.size}
            fgColor={options.fgColor}
            bgColor="transparent"
            level={options.level}
            imageSettings={imageSettings}
          />
        </div>
      </div>
      
      <div className="w-full flex flex-col gap-2 sm:gap-2.5">
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          <button 
            onClick={downloadPNG} 
            className="group flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl bg-[color:var(--brand)] text-white hover:bg-[color:var(--brand-dark)] card-shadow hover:card-shadow-hover transition-all duration-200 active:scale-[0.98]"
          >
            <Download size={16} className="sm:group-hover:scale-110 transition-transform" /> 
            PNG
          </button>
          <button 
            onClick={downloadSVG} 
            className="group flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900/90 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 card-shadow hover:card-shadow-hover transition-all duration-200 active:scale-[0.98]"
          >
            <Download size={16} className="sm:group-hover:scale-110 transition-transform" /> 
            SVG
          </button>
        </div>
        {navigator.share && (
          <button 
            onClick={handleShare} 
            className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-800 card-shadow hover:card-shadow-hover transition-all duration-200 active:scale-[0.98]"
          >
            <Share2 size={16} className="sm:group-hover:scale-110 transition-transform" /> 
            Share
          </button>
        )}
      </div>
    </div>
  );
};

export default QrDisplay;
