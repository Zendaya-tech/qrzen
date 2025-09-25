import React, { useState, useEffect } from 'react';

interface WifiFormProps {
  onChange: (data: string) => void;
}

const InputField = ({ label, type = 'text', onChange }: { label: string; type?: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input
            type={type}
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
);

const SelectField = ({ label, value, onChange, children }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }) => (
    <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
            {children}
        </select>
    </div>
);

const WifiForm: React.FC<WifiFormProps> = ({ onChange }) => {
  const [wifi, setWifi] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA',
  });

  useEffect(() => {
    const { ssid, password, encryption } = wifi;
    if (!ssid) {
      onChange('');
      return;
    }
    let wifiString = `WIFI:T:${encryption};S:${ssid};`;
    if (password) wifiString += `P:${password};`;
    wifiString += ';';
    onChange(wifiString);
  }, [wifi, onChange]);

  const handleChange = (field: keyof typeof wifi) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setWifi({ ...wifi, [field]: event.target.value });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <InputField label="Network Name (SSID)" onChange={handleChange('ssid')} />
      </div>
      <InputField label="Password" type="password" onChange={handleChange('password')} />
      <SelectField label="Encryption" value={wifi.encryption} onChange={handleChange('encryption')}>
        <option value="WPA">WPA/WPA2</option>
        <option value="WEP">WEP</option>
        <option value="nopass">None</option>
      </SelectField>
    </div>
  );
};

export default WifiForm;