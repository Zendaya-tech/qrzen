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
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200/80 dark:border-slate-800/80">
      <div className="p-2">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1 flex space-x-1">
          {tabs.map(({ id, name, icon }) => (
            <button
              key={id}
              onClick={() => selectTab(id)}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-800 ${
                tab === id
                  ? 'bg-white dark:bg-slate-950 text-primary-600 dark:text-primary-400 shadow'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-950/60'
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
            className="w-full h-36 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm"
          />
        )}
        {tab === 'vcard' && <VCardForm onChange={onChange} />}
        {tab === 'wifi' && <WifiForm onChange={onChange} />}
      </div>
    </div>
  );
};

export default InputPanel;
