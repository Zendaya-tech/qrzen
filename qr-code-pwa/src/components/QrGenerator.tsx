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
  const [value, setValue] = useState('https://github.com/Jules-AI');
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
      setDisplaySize(screenWidth < 768 ? screenWidth * 0.85 : options.size);
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
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left Panel */}
        <div className="lg:col-span-3 space-y-6">
          <InputPanel onChange={setValue} />
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            logoImage={logoImage}
            setLogoImage={setLogoImage}
          />
        </div>

        {/* Right Panel (QR Code) */}
        <div className="lg:col-span-2 lg:sticky top-24 self-start flex justify-center items-start order-first lg:order-last mb-8 lg:mb-0">
          {value && (
            <div className="transition-all duration-500 ease-in-out w-full max-w-sm mx-auto">
              <QrDisplay value={value} options={finalOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;