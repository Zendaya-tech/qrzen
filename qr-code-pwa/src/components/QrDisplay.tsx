import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toSvg } from 'qrcode';
import { QrOptions } from './QrGenerator';
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
    if(url.startsWith('blob:')) URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    const canvas = getCanvas();
    if (canvas) {
      download(canvas.toDataURL('image/png'), 'qrcode.png');
    }
  };

  const downloadSVG = () => {
    // Note: SVG download via this method won't include the embedded logo from the canvas.
    // A more complex solution would be needed to merge SVG logo into SVG QR code.
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
              title: 'QR Code',
              text: `QR Code for: ${value}`,
            });
          } catch (error) {
            console.error('Error sharing:', error);
          }
        }
      }, 'image/png');
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const imageSettings = options.logoImage
    ? {
        src: options.logoImage,
        height: options.size * 0.2,
        width: options.size * 0.2,
        excavate: true,
      }
    : undefined;

  const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; primary?: boolean }> = ({ onClick, children, primary }) => (
    <button
      onClick={onClick}
      className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg shadow-sm transition-transform transform active:scale-95
        ${primary
          ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
        }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={qrRef}
        className="p-4 bg-white rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 transition-transform duration-300 hover:scale-105"
        style={{ backgroundColor: options.bgColor }}
      >
        <QRCodeCanvas
          value={value}
          size={options.size}
          fgColor={options.fgColor}
          bgColor={options.bgColor}
          level={options.level}
          imageSettings={imageSettings}
        />
      </div>
      <div className="w-full flex flex-col sm:flex-row gap-3">
        <ActionButton onClick={downloadPNG} primary><Download size={16} /> PNG</ActionButton>
        <ActionButton onClick={downloadSVG}><Download size={16} /> SVG</ActionButton>
        {navigator.share && <ActionButton onClick={handleShare}><Share2 size={16} /> Share</ActionButton>}
      </div>
    </div>
  );
};

export default QrDisplay;