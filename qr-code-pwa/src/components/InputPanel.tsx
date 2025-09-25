import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, Paper } from '@mui/material';
import VCardForm from './VCardForm';
import WifiForm from './WifiForm';

interface InputPanelProps {
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
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

const InputPanel: React.FC<InputPanelProps> = ({ onChange }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [textValue, setTextValue] = useState('https://github.com/Jules-AI');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    if (newValue === 0) {
      onChange(textValue);
    } else {
      onChange('');
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Paper variant="outlined" sx={{ width: '100%', bgcolor: 'background.default' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="content type tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="Text / URL" />
          <Tab label="Contact (vCard)" />
          <Tab label="Wi-Fi" />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <TextField
          label="Enter text or URL"
          variant="filled"
          fullWidth
          multiline
          rows={4}
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
    </Paper>
  );
};

export default InputPanel;