import React from 'react';
import { QrOptions } from './QrGenerator';
import { Settings, ChevronDown, Upload, X, Image as ImageIcon } from 'lucide-react';

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
      reader.onloadend = () => setLogoImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200/80 dark:border-slate-800/80">
      <details className="group" open>
        <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Customize</h3>
          <ChevronDown size={20} className="text-slate-500 transition-transform duration-300 group-open:rotate-180" />
        </summary>

        <div className="p-4 sm:p-6 border-t border-slate-200/80 dark:border-slate-800/80 space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Logo</label>
            <div className="flex items-center gap-2">
              <input type="file" id="logo-upload" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              <label htmlFor="logo-upload" className="flex-1 cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Upload size={16} />
                <span>{logoImage ? 'Change' : 'Upload'}</span>
              </label>
              {logoImage && (
                <button onClick={() => setLogoImage(undefined)} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-300 transition-colors">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Size & Error Correction */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Size</label>
              <input type="range" min="128" max="512" step="32" value={options.size} onChange={(e) => handleOptionChange('size', parseInt(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Precision</label>
              <div className="grid grid-cols-4 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                {(['L', 'M', 'Q', 'H'] as const).map(level => (
                  <button key={level} onClick={() => handleOptionChange('level', level)} className={`px-2 py-1 text-xs font-bold rounded-md transition-colors ${options.level === level ? 'bg-white dark:bg-slate-950 text-primary-600 dark:text-primary-400 shadow' : 'text-slate-500 hover:bg-white/60 dark:hover:bg-slate-950/60'}`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Dot Color</label>
              <input type="color" value={options.fgColor} onChange={(e) => handleOptionChange('fgColor', e.target.value)} className="w-full h-10 p-0 border-none rounded-lg cursor-pointer bg-transparent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Background</label>
              <input type="color" value={options.bgColor} onChange={(e) => handleOptionChange('bgColor', e.target.value)} className="w-full h-10 p-0 border-none rounded-lg cursor-pointer bg-transparent" />
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default OptionsPanel;