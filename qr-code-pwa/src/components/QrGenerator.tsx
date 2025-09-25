import React, { useState } from 'react';
import InputPanel from './InputPanel';
import QrDisplay from './QrDisplay';
import OptionsPanel from './OptionsPanel';
import { Box, Grid, Paper, Fade } from '@mui/material';

export type QrOptions = {
  level: 'L' | 'M' | 'Q' | 'H';
  size: number;
  fgColor: string;
  bgColor: string;
};

const QrGenerator: React.FC = () => {
  const [value, setValue] = useState('https://www.google.com');
  const [options, setOptions] = useState<QrOptions>({
    level: 'M',
    size: 256,
    fgColor: '#000000',
    bgColor: '#ffffff',
  });

  // Adjust size for responsive display
  const displaySize = Math.min(options.size, 400);

  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={4} direction={{ xs: 'column', md: 'row' }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <InputPanel onChange={setValue} />
          </Paper>
          <Box mt={2}>
            <OptionsPanel options={options} setOptions={setOptions} />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Fade in={!!value} timeout={500}>
            <div>
              {value && <QrDisplay value={value} options={{...options, size: displaySize}} />}
            </div>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QrGenerator;