import React, { useState } from 'react';
import VCardForm from './VCardForm';
import WifiForm from './WifiForm';
import { Type, User, Wifi } from 'lucide-react';

const InputPanel: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  const [tab, setTab] = useState('text');
  const [textValue, setTextValue] = useState('https://zendaya.tech');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    onChange(e.target.value);
  };

  const selectTab = (selectedTab: string) => {
    setTab(selectedTab);
    if (selectedTab === 'text') {
      onChange(textValue);
    } else {
      onChange('');
    }
  }

  const tabs = [
    { id: 'text', name: 'Text', icon: <Type size={16} /> },
    { id: 'vcard', name: 'Contact', icon: <User size={16} /> },
    { id: 'wifi', name: 'Wi-Fi', icon: <Wifi size={16} /> },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-white/60 dark:border-slate-800/80 overflow-hidden card-shadow animate-fade-in-up backdrop-blur">
      <div className="p-1 sm:p-1.5 border-b border-slate-200/70 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/60">
        <div className="flex gap-1">
          {tabs.map(({ id, name, icon }) => (
            <button
              key={id}
              onClick={() => selectTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${tab === id
                ? 'bg-[color:var(--brand)] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-900/80'
                }`}
            >
              <span className="w-4 h-4 sm:w-auto sm:h-auto">{icon}</span>
              <span className="hidden sm:inline">{name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-6">
        {tab === 'text' && (
          <textarea
            value={textValue}
            onChange={handleTextChange}
            placeholder="Enter any text or URL..."
            className="w-full h-32 sm:h-40 p-3 sm:p-4 bg-white/70 dark:bg-slate-950 rounded-xl border border-slate-200/70 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:border-transparent transition-all resize-none text-sm sm:text-base placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
        )}
        {tab === 'vcard' && <VCardForm onChange={onChange} />}
        {tab === 'wifi' && <WifiForm onChange={onChange} />}
      </div>
    </div>
  );
};

export default InputPanel;
