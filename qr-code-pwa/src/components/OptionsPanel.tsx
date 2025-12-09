import React from 'react';
import type { QrOptions } from './QrGenerator';
import { ChevronDown, Upload, X } from 'lucide-react';

type WritableQrOptions = Omit<QrOptions, 'logoImage'>;

interface OptionsPanelProps {
  options: WritableQrOptions;
  setOptions: (opts: WritableQrOptions) => void;
  logoImage?: string;
  setLogoImage: (image?: string) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, setOptions, logoImage, setLogoImage }) => {
  const handleOptionChange = (key: keyof WritableQrOptions, value: string | number) => {
    setOptions({ ...options, [key]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden card-shadow animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <details className="group" open>
        <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <h3 className="text-base sm:text-base font-semibold text-slate-900 dark:text-white">Customize</h3>
          <ChevronDown size={18} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-all duration-200 group-open:rotate-180" />
        </summary>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-slate-200 dark:border-slate-800 space-y-5 sm:space-y-6 pt-4 sm:pt-6">
          {/* Logo Upload */}
          <div className="space-y-2 sm:space-y-2.5">
            <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">Logo</label>
            <div className="flex items-center gap-2">
              <input type="file" id="logo-upload" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              <label htmlFor="logo-upload" className="group flex-1 cursor-pointer bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700">
                <Upload size={14} className="sm:w-4 sm:h-4 sm:group-hover:scale-110 transition-transform" />
                <span>{logoImage ? 'Change' : 'Upload'}</span>
              </label>
              {logoImage && (
                <button onClick={() => setLogoImage(undefined)} className="group p-2 sm:p-2.5 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 transition-all border border-slate-200 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-900">
                  <X size={14} className="sm:w-4 sm:h-4 sm:group-hover:rotate-90 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Size & Error Correction */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-2 sm:space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">Size</label>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 sm:py-1 rounded">{options.size}px</span>
              </div>
              <input type="range" min="128" max="512" step="32" value={options.size} onChange={(e) => handleOptionChange('size', parseInt(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white hover:accent-slate-700 dark:hover:accent-slate-200 transition-all" />
            </div>
            <div className="space-y-2 sm:space-y-2.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">Precision</label>
              <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
                {(['L', 'M', 'Q', 'H'] as const).map(level => (
                  <button key={level} onClick={() => handleOptionChange('level', level)} className={`px-2 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${options.level === level ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm scale-105' : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:scale-105'}`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-2.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">Dot Color</label>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative group">
                  <input type="color" value={options.fgColor} onChange={(e) => handleOptionChange('fgColor', e.target.value)} className="w-10 h-10 sm:w-12 sm:h-12 p-1 border-2 border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700 transition-all sm:hover:scale-110" />
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono uppercase bg-slate-100 dark:bg-slate-950 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">{options.fgColor}</span>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-2.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">Background</label>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative group">
                  <input type="color" value={options.bgColor} onChange={(e) => handleOptionChange('bgColor', e.target.value)} className="w-10 h-10 sm:w-12 sm:h-12 p-1 border-2 border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700 transition-all sm:hover:scale-110" />
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono uppercase bg-slate-100 dark:bg-slate-950 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">{options.bgColor}</span>
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default OptionsPanel;