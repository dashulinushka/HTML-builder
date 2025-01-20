const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

const merge = async () => {
  try {
    await fs.promises.unlink(outputFile).catch(() => {});

    const files = await fs.promises.readdir(stylesFolder);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    const styles = [];

    for (const file of cssFiles) {
      const filePath = path.join(stylesFolder, file);
      const data = await fs.promises.readFile(filePath, 'utf-8');
      styles.push(data);
    }

    await fs.promises.writeFile(outputFile, styles.join('\n'), 'utf-8');
    console.log('Merge successfully to bundle.css');
  } catch (error) {
    console.error('Error:', error);
  }
};

merge();
