import React, { useState } from 'react';
import VCardForm from './VCardForm';
import WifiForm from './WifiForm';
import { Type, Contact, Wifi } from 'lucide-react';

const InputPanel: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  const [tab, setTab] = useState('text');
  const [textValue, setTextValue] = useState('https://github.com/Jules-AI');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    onChange(e.target.value);
  };

  const selectTab = (selectedTab: string) => {
    setTab(selectedTab);
    if (selectedTab === 'text') {
        onChange(textValue);
    } else {
        onChange(''); // Clear value for form-based tabs
    }
  }

  const tabs = [
    { id: 'text', name: 'Text/URL', icon: <Type size={16} /> },
    { id: 'vcard', name: 'Contact', icon: <Contact size={16} /> },
    { id: 'wifi', name: 'Wi-Fi', icon: <Wifi size={16} /> },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map(({ id, name, icon }) => (
          <button
            key={id}
            onClick={() => selectTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm font-medium transition-colors duration-200 focus:outline-none ${
              tab === id
                ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 border-b-2 border-indigo-500'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            {icon}
            <span className="hidden sm:inline">{name}</span>
          </button>
        ))}
      </div>
      <div className="p-4 sm:p-6">
        {tab === 'text' && (
          <textarea
            value={textValue}
            onChange={handleTextChange}
            placeholder="Enter any text or URL..."
            className="w-full h-32 p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        )}
        {tab === 'vcard' && <VCardForm onChange={onChange} />}
        {tab === 'wifi' && <WifiForm onChange={onChange} />}
      </div>
    </div>
  );
};

export default InputPanel;