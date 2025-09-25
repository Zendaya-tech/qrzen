import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QrOptions } from './QrGenerator';

interface OptionsPanelProps {
  options: QrOptions;
  setOptions: (options: QrOptions) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, setOptions }) => {
  const handleOptionChange = (key: keyof QrOptions, value: any) => {
    setOptions({ ...options, [key]: value });
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Advanced Options</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Error Correction</InputLabel>
              <Select
                value={options.level}
                label="Error Correction"
                onChange={(e) => handleOptionChange('level', e.target.value)}
              >
                <MenuItem value="L">Low (L)</MenuItem>
                <MenuItem value="M">Medium (M)</MenuItem>
                <MenuItem value="Q">Quartile (Q)</MenuItem>
                <MenuItem value="H">High (H)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography gutterBottom>Size</Typography>
              <Slider
                value={options.size}
                onChange={(_, newValue) => handleOptionChange('size', newValue)}
                aria-labelledby="size-slider"
                valueLabelDisplay="auto"
                step={32}
                marks
                min={128}
                max={512}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Foreground Color"
              type="color"
              value={options.fgColor}
              onChange={(e) => handleOptionChange('fgColor', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Background Color"
              type="color"
              value={options.bgColor}
              onChange={(e) => handleOptionChange('bgColor', e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default OptionsPanel;