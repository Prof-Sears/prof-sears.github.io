/**
 * This program reads an input file, looks for two numbers that add to 2020, and reports the product.
 */
const fs = require('fs');

console.log('Running');

let rawData;

try {
  rawData = fs.readFileSync('input.txt','utf8');
} catch (err) {
  console.error(err);
}

const lines = rawData.split('\n');
const numbers = [];
for(let line of lines) numbers.push(parseInt(line));

for(let i = 0; i < numbers.length; i++) {
  for(let j = i+1; j < numbers.length; j++) {
    if(numbers[i] + numbers[j] === 2020) console.log(`Found answer: ${numbers[i]} - ${numbers[j]} - ${numbers[i]*numbers[j]}`);
  }
}

for(let i = 0; i < numbers.length; i++) {
  for(let j = i+1; j < numbers.length; j++) {
    for(let k = j+1; k < numbers.length; k++) {
      if(numbers[i] + numbers[j] + numbers[k] === 2020) {
        console.log(`Found answer: ${numbers[i]} - ${numbers[j]} - ${numbers[k]} - ${numbers[i]*numbers[j]*numbers[k]}`);
      }
    }
  }
}
