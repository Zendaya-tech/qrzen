import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toSvg } from 'qrcode';
import type { QrOptions } from './QrGenerator';
import { Download, Share2 } from 'lucide-react';

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

  const downloadPNG = () => {
    const canvas = getCanvas();
    if (canvas) download(canvas.toDataURL('image/png'), 'qrcode.png');
  };

  const downloadSVG = () => {
    // Note: SVG download via this method won't include the embedded logo from the canvas.
    toSvg(value, {
      width: options.size,
      color: { dark: options.fgColor, light: options.bgColor },
      errorCorrectionLevel: options.level,
    }, (err, svgString) => {
      if (err) throw err;
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
        <div className="hidden sm:block absolute -inset-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
        
        <div
          ref={qrRef}
          className="relative p-4 sm:p-6 lg:p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 qr-glow transition-all duration-300 sm:group-hover:scale-[1.02]"
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
        <button 
          onClick={downloadPNG} 
          className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 text-sm font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 card-shadow hover:card-shadow-hover transition-all duration-200 active:scale-[0.98]"
        >
          <Download size={16} className="sm:group-hover:scale-110 transition-transform" /> 
          <span className="hidden xs:inline">Download </span>PNG
        </button>
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          <button 
            onClick={downloadSVG} 
            className="group flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 card-shadow hover:card-shadow-hover transition-all duration-200 active:scale-[0.98]"
          >
            <Download size={14} className="sm:group-hover:scale-110 transition-transform" /> 
            SVG
          </button>
          {navigator.share && (
            <button 
              onClick={handleShare} 
              className="group flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 card-shadow hover:card-shadow-hover transition-all duration-200 active:scale-[0.98]"
            >
              <Share2 size={14} className="sm:group-hover:scale-110 transition-transform" /> 
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrDisplay;