import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField } from '@mui/material';
import VCardForm from './VCardForm';
import WifiForm from './WifiForm';

interface InputPanelProps {
  value: string; // This will now hold the raw data for the QR code
  onChange: (value: string) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const InputPanel: React.FC<InputPanelProps> = ({ onChange }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [textValue, setTextValue] = useState('https://www.google.com');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    // Reset value when changing tabs
    switch (newValue) {
      case 0:
        onChange(textValue);
        break;
      default:
        onChange('');
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextValue(event.target.value);
      onChange(event.target.value);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="content type tabs" centered>
          <Tab label="Text / URL" />
          <Tab label="vCard" />
          <Tab label="Wi-Fi" />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <TextField
          label="Enter text or URL"
          variant="outlined"
          fullWidth
          value={textValue}
          onChange={handleTextChange}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <VCardForm onChange={onChange} />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <WifiForm onChange={onChange} />
      </TabPanel>
    </Box>
  );
};

export default InputPanel;