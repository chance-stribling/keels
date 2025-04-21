import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Needed to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === CONFIGURATION ===
const targetFiles = [
  '../tailwind.config.js',
  '../resources/js/Components/ApplicationLogo.jsx',
];

const mode = 'toggle';

const markerTag = '// TOGGLE_ME';
const rangeStart = '// START_TOGGLE';
const rangeEnd = '// END_TOGGLE';

targetFiles.forEach(filePath => {
  const fullPath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8').split('\n');
  let inRange = false;

  content = content.map(line => {
    // Keep the range markers untouched
    if (line.includes(rangeStart)) {
      inRange = true;
      return line;
    }

    if (line.includes(rangeEnd)) {
      inRange = false;
      return line;
    }

    // Marker toggle
    if (line.includes(markerTag)) {
      return toggleLine(line, mode);
    }

    // Only toggle lines inside range (but not the markers themselves)
    if (inRange) {
      return toggleLine(line, mode);
    }

    return line;
  });

  fs.writeFileSync(fullPath, content.join('\n'), 'utf-8');
  console.log(`✅ Processed ${filePath} in ${mode} mode`);
});

function toggleLine(line, mode) {
  const isCommented = line.trim().startsWith('//');
  switch (mode) {
    case 'toggle':
      return isCommented ? line.replace('//', '') : `//${line}`;
    case 'comment':
      return isCommented ? line : `//${line}`;
    case 'uncomment':
      return isCommented ? line.replace('//', '') : line;
    default:
      return line;
  }
}
