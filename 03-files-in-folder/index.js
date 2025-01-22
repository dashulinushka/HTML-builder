const fs = require('fs').promises;
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

const displayFilesInfo = async () => {
  try {
    const files = await fs.readdir(secretFolderPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(secretFolderPath, file.name);
        const stats = await fs.stat(filePath);
        const fileSize = stats.size / 1024;
        const fileName = path.parse(file.name).name;
        const fileExtension = path.extname(file.name).slice(1);

        console.log(
          `${fileName} - ${fileExtension} - ${fileSize.toFixed(3)}kb`,
        );
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

displayFilesInfo();
