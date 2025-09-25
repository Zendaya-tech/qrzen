import React, { useState, useEffect } from 'react';
import InputPanel from './InputPanel';
import QrDisplay from './QrDisplay';
import OptionsPanel from './OptionsPanel';
import { Box, Grid, Paper, Fade, useTheme, useMediaQuery } from '@mui/material';

export type QrOptions = {
  level: 'L' | 'M' | 'Q' | 'H';
  size: number;
  fgColor: string;
  bgColor: string;
};

const QrGenerator: React.FC = () => {
  const [value, setValue] = useState('https://github.com/Jules-AI');
  const [options, setOptions] = useState<QrOptions>({
    level: 'M',
    size: 256,
    fgColor: '#000000',
    bgColor: '#ffffff',
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [displaySize, setDisplaySize] = useState(256);

  // Effect to handle responsive QR code size
  useEffect(() => {
    const updateSize = () => {
      // Base size on a fraction of the window width or a max value
      const newSize = isMobile ? Math.min(window.innerWidth * 0.75, 400) : options.size;
      setDisplaySize(newSize);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [isMobile, options.size]);


  return (
    <Box sx={{ my: { xs: 2, sm: 4 } }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* Input and Options Panel */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <InputPanel onChange={setValue} />
          </Paper>
          <Box mt={2}>
            <OptionsPanel options={options} setOptions={setOptions} />
          </Box>
        </Grid>

        {/* QR Code Display */}
        <Grid item xs={12} md={6} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: { md: 'sticky' },
          top: { md: '20px' },
          alignSelf: 'flex-start'
        }}>
          <Fade in={!!value} timeout={500}>
            <Box>
              {value && <QrDisplay value={value} options={{...options, size: displaySize}} />}
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QrGenerator;