// Simple script to generate placeholder PWA icons
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a minimal valid PNG (1x1 transparent pixel)
const createMinimalPNG = () => {
  // This is a base64 encoded 1x1 transparent PNG
  const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  return Buffer.from(base64PNG, 'base64');
};

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate icons
const pngData = createMinimalPNG();
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), pngData);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), pngData);

console.log('✓ Generated placeholder PWA icons');
