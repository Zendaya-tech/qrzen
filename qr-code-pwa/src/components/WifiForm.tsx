import React, { useState, useEffect } from 'react';

const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full px-4 py-3 text-sm rounded-xl glass-input transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500" />
);

const StyledSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className="w-full px-4 py-3 text-sm rounded-xl glass-input transition-all duration-200" />
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