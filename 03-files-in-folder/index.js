const fs = require('fs').promises;
const path = require('path');
const secretFolderPath = path.join(__dirname, 'secret-folder');

async function readFilesInFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(folderPath, file.name);

      if (file.isDirectory()) {
        await readFilesInFolder(fullPath);
      } else {
        const stats = await fs.stat(fullPath);
        const fileSize = stats.size / 1024;
        const fileName = path.parse(file.name).name;
        const fileExtension = path.extname(file.name).slice(1);
        const outputName = file.name.startsWith('.')
          ? `- ${file.name}`
          : `${fileName} - ${fileExtension}`;

        console.log(`${outputName} - ${fileSize.toFixed(3)}kb`);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}
readFilesInFolder(secretFolderPath);
