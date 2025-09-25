import React, { useState, useEffect } from 'react';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface WifiFormProps {
  onChange: (data: string) => void;
}

const WifiForm: React.FC<WifiFormProps> = ({ onChange }) => {
  const [wifi, setWifi] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  });

  useEffect(() => {
    const { ssid, password, encryption, hidden } = wifi;
    if (!ssid) {
      onChange('');
      return;
    }
    // Format: WIFI:T:<encryption>;S:<ssid>;P:<password>;H:<hidden>;;
    let wifiString = `WIFI:T:${encryption};S:${ssid};`;
    if (password) {
      wifiString += `P:${password};`;
    }
    if (hidden) {
      wifiString += `H:true;`;
    }
    wifiString += ';';
    onChange(wifiString);
  }, [wifi, onChange]);

  const handleChange = (field: keyof typeof wifi) => (event: React.ChangeEvent<any>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setWifi({ ...wifi, [field]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField label="Network Name (SSID)" fullWidth onChange={handleChange('ssid')} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Password" type="password" fullWidth onChange={handleChange('password')} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Encryption</InputLabel>
          <Select
            value={wifi.encryption}
            label="Encryption"
            onChange={handleChange('encryption')}
          >
            <MenuItem value="WPA">WPA/WPA2</MenuItem>
            <MenuItem value="WEP">WEP</MenuItem>
            <MenuItem value="nopass">None</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default WifiForm;