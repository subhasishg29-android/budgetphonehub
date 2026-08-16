const fs = require('fs');
const path = require('path');

function exportClicks() {
  const csvPath = path.join(process.cwd(), 'clicks.csv');
  if (!fs.existsSync(csvPath)) {
    console.log('⚠️  No clicks.csv file found in project root. Click log is currently empty.');
    return;
  }

  const exportDir = path.join(process.cwd(), 'exports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const destPath = path.join(exportDir, `clicks_backup_${timestamp}.csv`);

  fs.copyFileSync(csvPath, destPath);
  console.log(`✅ Clicks CSV exported successfully to: ${destPath}`);
}

exportClicks();
