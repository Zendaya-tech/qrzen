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
    <div className="glass-panel rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <details className="group" open>
        <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <h3 className="font-medium text-slate-900 dark:text-slate-100">Customize</h3>
          <ChevronDown size={20} className="text-slate-400 transition-transform duration-300 group-open:rotate-180" />
        </summary>

        <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-slate-800 space-y-8">
          {/* Logo Upload */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Logo</label>
            <div className="flex items-center gap-3">
              <input type="file" id="logo-upload" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              <label htmlFor="logo-upload" className="flex-1 cursor-pointer bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-slate-700 border-dashed">
                <Upload size={18} />
                <span>{logoImage ? 'Change Logo' : 'Upload Logo'}</span>
              </label>
              {logoImage && (
                <button onClick={() => setLogoImage(undefined)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors border border-slate-200 dark:border-slate-700">
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Size & Error Correction */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Size</label>
              <input type="range" min="128" max="512" step="32" value={options.size} onChange={(e) => handleOptionChange('size', parseInt(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Precision</label>
              <div className="grid grid-cols-4 gap-2">
                {(['L', 'M', 'Q', 'H'] as const).map(level => (
                  <button key={level} onClick={() => handleOptionChange('level', level)} className={`px-2 py-2 text-sm font-medium rounded-lg transition-all ${options.level === level ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Dot Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={options.fgColor} onChange={(e) => handleOptionChange('fgColor', e.target.value)} className="w-12 h-12 p-1 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer bg-white dark:bg-slate-800" />
                <span className="text-sm text-slate-500 uppercase">{options.fgColor}</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Background</label>
              <div className="flex items-center gap-3">
                <input type="color" value={options.bgColor} onChange={(e) => handleOptionChange('bgColor', e.target.value)} className="w-12 h-12 p-1 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer bg-white dark:bg-slate-800" />
                <span className="text-sm text-slate-500 uppercase">{options.bgColor}</span>
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default OptionsPanel;