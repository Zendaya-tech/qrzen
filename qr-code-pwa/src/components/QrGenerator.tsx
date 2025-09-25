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
    size: 256,
    fgColor: '#000000',
    bgColor: '#ffffff',
  });
  const [logoImage, setLogoImage] = useState<string | undefined>(undefined);

  const [displaySize, setDisplaySize] = useState(256);

  // Effect to handle responsive QR code size
  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) { // sm breakpoint
        setDisplaySize(screenWidth * 0.8);
      } else {
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
    size: displaySize
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Panel */}
        <div className="space-y-6">
          <InputPanel onChange={setValue} />
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            logoImage={logoImage}
            setLogoImage={setLogoImage}
          />
        </div>

        {/* Right Panel (QR Code) */}
        <div className="lg:sticky top-8 self-start flex justify-center items-center">
          {value && (
            <div className="transition-opacity duration-500 ease-in-out opacity-100">
              <QrDisplay value={value} options={finalOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;