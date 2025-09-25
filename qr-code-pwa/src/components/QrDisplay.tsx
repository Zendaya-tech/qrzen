import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toSvg } from 'qrcode';
import { Paper, Box, Button, ButtonGroup, Stack, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import { QrOptions } from './QrGenerator';

interface QrDisplayProps {
  value: string;
  options: QrOptions;
}

const QrDisplay: React.FC<QrDisplayProps> = ({ value, options }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const getCanvas = (): HTMLCanvasElement | null => {
    if (qrRef.current) {
      return qrRef.current.querySelector('canvas');
    }
    return null;
  };

  const downloadPNG = () => {
    const canvas = getCanvas();
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const downloadSVG = () => {
    toSvg(value, {
      width: options.size,
      color: { dark: options.fgColor, light: options.bgColor },
      errorCorrectionLevel: options.level,
    }, (err, svgString) => {
      if (err) throw err;
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      let downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'qrcode.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    });
  };

  const handleShare = async () => {
    const canvas = getCanvas();
    if (canvas && navigator.share) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.share({
              files: [new File([blob], 'qrcode.png', { type: 'image/png' })],
              title: 'QR Code',
              text: `QR Code for: ${value}`,
            });
          } catch (error) {
            console.error('Error sharing:', error);
          }
        }
      }, 'image/png');
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <Stack spacing={3} alignItems="center">
      <Paper
        elevation={4}
        sx={{
          p: 2,
          bgcolor: options.bgColor,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          display: 'inline-block',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }}
        ref={qrRef}
      >
        <QRCodeCanvas
          value={value}
          size={options.size}
          fgColor={options.fgColor}
          bgColor={options.bgColor}
          level={options.level}
        />
      </Paper>

      <Stack spacing={1.5} direction={{ xs: 'column', sm: 'row' }} width="100%" justifyContent="center">
        <Button onClick={downloadPNG} variant="contained" startIcon={<DownloadIcon />}>
          Download PNG
        </Button>
        <Button onClick={downloadSVG} variant="outlined" startIcon={<DownloadIcon />}>
          Download SVG
        </Button>
        {navigator.share && (
          <Button onClick={handleShare} variant="outlined" startIcon={<ShareIcon />}>
            Share
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default QrDisplay;