import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toSvg } from 'qrcode';
import { Paper, Box, Button, ButtonGroup } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import { QrOptions } from './QrGenerator';

interface QrDisplayProps {
  value: string;
  options: QrOptions;
}

const QrDisplay: React.FC<QrDisplayProps> = ({ value, options }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const getCanvas = (): HTMLCanvasElement | null => {
    if (qrRef.current) {
      return qrRef.current.querySelector('canvas');
    }
    return null;
  };

  const downloadPNG = () => {
    const canvas = getCanvas();
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
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
        color: {
            dark: options.fgColor,
            light: options.bgColor,
        },
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
              files: [
                new File([blob], 'qrcode.png', {
                  type: 'image/png',
                }),
              ],
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
    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
      <div ref={qrRef}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: options.bgColor, display: 'inline-block' }}>
            <QRCodeCanvas
              value={value}
              size={options.size}
              fgColor={options.fgColor}
              bgColor={options.bgColor}
              level={options.level}
            />
          </Paper>
      </div>

      <ButtonGroup variant="contained" sx={{ mt: 2 }}>
        <Button onClick={downloadPNG} startIcon={<DownloadIcon />}>
          PNG
        </Button>
        <Button onClick={downloadSVG} startIcon={<DownloadIcon />}>
          SVG
        </Button>
        {navigator.share && (
          <Button onClick={handleShare} startIcon={<ShareIcon />}>
            Share
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );
};

export default QrDisplay;