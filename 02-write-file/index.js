const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', (err) => {
  if (err) {
    console.error('Error: file did not create:', err);
    process.exit(1);
  }

  stdout.write('Write smth (or exit):\n');
});

stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input.toLowerCase() === 'exit') {
    stdout.write('Bye!\n');
    process.exit();
  }

  fs.appendFile(filePath, input + '\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      stdout.write('one more time:\n');
    }
  });
});

process.on('SIGINT', () => {
  stdout.write('Bye!\n');
  process.exit();
});
