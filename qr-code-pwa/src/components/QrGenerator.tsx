import React, { useState, useEffect } from 'react';
import InputPanel from './InputPanel';
import QrDisplay from './QrDisplay';
import OptionsPanel from './OptionsPanel';

export type QrOptions = {
  level: 'L' | 'M' | 'Q' | 'H';
  size: number;
  fgColor: string;
  bgColor: string;
  logoImage?: string;
};

const QrGenerator: React.FC = () => {
  const [value, setValue] = useState('https://zendaya.tech');
  const [options, setOptions] = useState<Omit<QrOptions, 'logoImage'>>({
    level: 'M',
    size: 280, // Default size for desktop
    fgColor: '#0f172a', // slate-900
    bgColor: '#ffffff',
  });
  const [logoImage, setLogoImage] = useState<string | undefined>(undefined);
  const [displaySize, setDisplaySize] = useState(280);

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      // Mobile: make the QR fill the available width
      if (screenWidth < 640) {
        setDisplaySize(Math.max(180, screenWidth - 64));
      } 
      // Tablet: medium QR code
      else if (screenWidth < 1024) {
        setDisplaySize(Math.min(screenWidth * 0.5, 280));
      } 
      // Desktop: use selected size
      else {
        setDisplaySize(options.size);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [options.size]);

  const finalOptions: QrOptions = {
    ...options,
    logoImage: logoImage,
    size: displaySize,
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
      {/* Mobile: QR Code first, then controls */}
      {/* Desktop: Controls left, QR Code right sticky */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
        
        {/* Controls Panel - Order 2 on mobile, 1 on desktop */}
        <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
          <InputPanel onChange={setValue} />
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            logoImage={logoImage}
            setLogoImage={setLogoImage}
          />
        </div>

        {/* QR Code Display - Order 1 on mobile (shows first), 2 on desktop */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-24 self-start">
          {value && (
            <div className="w-full mx-auto">
              <QrDisplay value={value} options={finalOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;
