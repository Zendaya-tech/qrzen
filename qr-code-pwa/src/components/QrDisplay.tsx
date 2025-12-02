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
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl blur opacity-20 dark:opacity-40"></div>
        <div
          ref={qrRef}
          className="relative p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800/80"
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
      <div className="w-full flex flex-col sm:flex-row gap-3">
        <button onClick={downloadPNG} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg shadow-md transition-transform transform active:scale-95 bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950">
          <Download size={16} /> Download PNG
        </button>
        <button onClick={downloadSVG} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg shadow-md transition-transform transform active:scale-95 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500">
          <Download size={16} /> Download SVG
        </button>
        {navigator.share && (
          <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg shadow-md transition-transform transform active:scale-95 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500">
            <Share2 size={16} /> Share
          </button>
        )}
      </div>
    </div>
  );
};

export default QrDisplay;