//const fs = require('fs');
import fs from 'node:fs'

// Function to read the file, process it, and write the new file
function transformFile(inputFilePath: string, outputFilePath: string) {
  // Read the input file (assuming UTF-8 encoding)
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Split the content by tabs and join with newline characters
    let transformedDataArray: string[] = data.split(' \t');
    console.log('Transformed: ' + transformedDataArray.length + ' times.');
    let transformedData: string = transformedDataArray.join('\n');

    // Write the transformed data to a new file
    fs.writeFile(outputFilePath, transformedData, (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }
      console.log('File successfully transformed and saved!');
    });
  });
}

transformFile('./english-words.txt','./english-words-normal.txt');
transformFile('./hungarian-words.txt','./hungarian-words-normal.txt');
