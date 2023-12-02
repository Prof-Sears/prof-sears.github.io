let lines;

/**
 * Load the data from my GitHub repo.
 */
const getInput = async () => {
  const response = await fetch('https://prof-sears.github.io/AdventOC/2020-12-01/input.txt');
  const rawText = await response.text();
  lines = rawText.split('\n');
  document.getElementById('statusbox').value = 'Loaded';
  console.log('Data loaded.');
};

getInput();

/**
 * This function searches through the numbers.
 */
const run = () => {
  const numbers = [];
  for(let line of lines) numbers.push(parseInt(line));

  for(let i = 0; i < numbers.length; i++) {
    for(let j = i+1; j < numbers.length; j++) {
      if(numbers[i] + numbers[j] === 2020) {
        console.log(`Found answer: ${numbers[i]} - ${numbers[j]} - ${numbers[i]*numbers[j]}`);
        document.getElementById('p1b1').value = numbers[i];
        document.getElementById('p1b2').value = numbers[j];
        document.getElementById('p1b3').value = numbers[i]*numbers[j];
      }
    }
  }

  for(let i = 0; i < numbers.length; i++) {
    for(let j = i+1; j < numbers.length; j++) {
      for(let k = j+1; k < numbers.length; k++) {
        if(numbers[i] + numbers[j] + numbers[k] === 2020) {
          console.log(`Found answer: ${numbers[i]} - ${numbers[j]} - ${numbers[k]} - ${numbers[i]*numbers[j]*numbers[k]}`);
          document.getElementById('p2b1').value = numbers[i];
          document.getElementById('p2b2').value = numbers[j];
          document.getElementById('p2b3').value = numbers[k];
          document.getElementById('p2b4').value = numbers[i]*numbers[j]*numbers[k];
        }
      }
    }
  }
};