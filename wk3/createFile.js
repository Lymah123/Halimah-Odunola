const fs = require('fs').promises; // Import the fs module to use promises

async function createEmptyFile(filename) {
  try {
    await fs.writeFile(filename, '', 'utf8'); // Create an empty file
    console.log(`${filename} has been created.`);
  } catch (error) {
    console.error('Error creating file:', error);
  }
}

// Specify the path for the new file
const filePath = 'C:\\Users\\user\\web3 program\\wk3\\camera_logs.txt';
createEmptyFile(filePath);
