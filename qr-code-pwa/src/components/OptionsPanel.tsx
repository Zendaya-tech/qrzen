import React from 'react';
import { QrOptions } from './QrGenerator';
import { Settings, ChevronDown, Upload, X } from 'lucide-react';

type WritableQrOptions = Omit<QrOptions, 'logoImage' | 'size'> & { size: number };

interface OptionsPanelProps {
  options: WritableQrOptions;
  setOptions: (opts: WritableQrOptions) => void;
  logoImage?: string;
  setLogoImage: (image?: string) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, setOptions, logoImage, setLogoImage }) => {
  const handleOptionChange = (key: keyof WritableQrOptions, value: any) => {
    setOptions({ ...options, [key]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <details className="group" open>
        <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-gray-600 dark:text-gray-300" />
            <span className="font-medium text-gray-800 dark:text-gray-200">Advanced Options</span>
          </div>
          <ChevronDown size={20} className="text-gray-500 transition-transform duration-300 group-open:rotate-180" />
        </summary>

        <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo</label>
            <div className="mt-1 flex items-center gap-2">
              <input type="file" id="logo-upload" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoUpload} className="hidden" />
              <label htmlFor="logo-upload" className="flex-1 cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
                <Upload size={16} />
                <span>{logoImage ? 'Change Logo' : 'Upload Logo'}</span>
              </label>
              {logoImage && (
                <button onClick={() => setLogoImage(undefined)} className="p-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors">
                  <X size={16} />
                </button>
              )}
            </div>
            {logoImage && <img src={logoImage} alt="Logo Preview" className="mt-2 h-10 w-10 object-contain rounded-md border border-gray-200 dark:border-gray-600" />}
          </div>

          {/* Size Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Size ({options.size}px)</label>
            <input type="range" min="128" max="512" step="32" value={options.size} onChange={(e) => handleOptionChange('size', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" />
          </div>

          {/* Error Correction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Error Correction</label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {(['L', 'M', 'Q', 'H'] as const).map(level => (
                <button key={level} onClick={() => handleOptionChange('level', level)} className={`px-2 py-1 text-sm rounded-md transition-colors ${options.level === level ? 'bg-indigo-600 text-white font-semibold' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Foreground</label>
              <input type="color" value={options.fgColor} onChange={(e) => handleOptionChange('fgColor', e.target.value)} className="mt-1 w-full h-10 p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Background</label>
              <input type="color" value={options.bgColor} onChange={(e) => handleOptionChange('bgColor', e.target.value)} className="mt-1 w-full h-10 p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer" />
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default OptionsPanel;