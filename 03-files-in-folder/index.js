const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(secretFolderPath, file.name);
      const fileSize = fs.statSync(filePath).size / 1024;
      const fileName = path.parse(file.name).name;
      const fileExtension = path.extname(file.name).slice(1);

      console.log(`${fileName} - ${fileExtension} - ${fileSize.toFixed(3)}kb`);
    }
  });
});
