import React, { useState, useEffect } from 'react';

const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition placeholder:text-slate-400 dark:placeholder:text-slate-500" />
);

const StyledSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition" />
);

const WifiForm: React.FC<{ onChange: (data: string) => void }> = ({ onChange }) => {
  const [wifi, setWifi] = useState({ ssid: '', password: '', encryption: 'WPA' });

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

  const handleChange = (field: keyof typeof wifi) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setWifi(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <StyledInput placeholder="Network Name (SSID)" onChange={handleChange('ssid')} />
      </div>
      <StyledInput placeholder="Password" type="password" onChange={handleChange('password')} />
      <StyledSelect value={wifi.encryption} onChange={handleChange('encryption')}>
        <option value="WPA">WPA/WPA2</option>
        <option value="WEP">WEP</option>
        <option value="nopass">None</option>
      </StyledSelect>
    </div>
  );
};

export default WifiForm;