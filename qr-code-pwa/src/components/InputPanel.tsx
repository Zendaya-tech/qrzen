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
    <div className="glass-panel rounded-2xl overflow-hidden animate-fade-in">
      <div className="p-2 border-b border-slate-100 dark:border-slate-800/50">
        <div className="flex space-x-1">
          {tabs.map(({ id, name, icon }) => (
            <button
              key={id}
              onClick={() => selectTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${tab === id
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              {icon}
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
            className="w-full h-40 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none text-base"
          />
        )}
        {tab === 'vcard' && <VCardForm onChange={onChange} />}
        {tab === 'wifi' && <WifiForm onChange={onChange} />}
      </div>
    </div>
  );
};

export default InputPanel;
