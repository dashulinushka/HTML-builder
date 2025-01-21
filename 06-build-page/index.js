const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const outputFile = path.join(__dirname, 'project-dist', 'style.css');
const newDir = path.join(__dirname, 'project-dist');
const baseDir = path.join(__dirname, 'assets');
const destDir = path.join(newDir, 'assets');

const merge = async () => {
  try {
    await fs.promises.mkdir(newDir, { recursive: true });

    if (fs.existsSync(outputFile)) {
      await fs.promises.unlink(outputFile);
    }

    const files = await fs.promises.readdir(stylesFolder);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    const styles = [];

    for (const file of cssFiles) {
      const filePath = path.join(stylesFolder, file);
      const data = await fs.promises.readFile(filePath, 'utf-8');
      styles.push(data);
    }

    await fs.promises.writeFile(outputFile, styles.join('\n'), 'utf-8');
    console.log('Merge successfully to style.css');
  } catch (error) {
    console.error('Error:', error);
  }
};

merge();

const copy = async (src, dest) => {
  await fs.promises.mkdir(dest, { recursive: true });

  const files = await fs.promises.readdir(src);

  for (const file of files) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    const stat = await fs.promises.stat(srcFile);

    if (stat.isDirectory()) {
      await copy(srcFile, destFile);
    } else {
      await fs.promises.copyFile(srcFile, destFile);
    }
  }
  console.log('Copy done');
};

const buildProject = async () => {
  try {
    await merge();
    await copy(baseDir, destDir);
  } catch (error) {
    console.error('Error:', error);
  }
};

buildProject();
