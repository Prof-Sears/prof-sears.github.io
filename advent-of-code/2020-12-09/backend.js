let numbers = []; // The array of numbers for processing

const loadInput = async () => {
  const response = await fetch('https://prof-sears.github.io/AdventOC/2020-12-09/input.txt'); // Fetch the data stored on my GitHub repo
  const rawtext = await response.text();  // get the text from the fetch call.
  const digits = rawtext.split('\n');     // split the intput into lines.
  for(let i = 0; i < digits.length; i++) {
    let temp = parseInt(digits[i]);       // Parse the line into an integer
    if(!isNaN(temp)) numbers.push(temp);  // If the line is a number, add it to the list.
  }
  console.log(`Loaded ${numbers.length} numbers from input.`);
  document.getElementById('statusbox').value = "Loaded.";
};

loadInput();

/**
 * This function solves part 1.
 */
const solvePart1 = () => {
  console.log('Solving Part 1');
  let target = 0;
  let index = 25;  // This is the index at which we're currently searching.
  while (index < numbers.length) {
    let range = numbers.slice(index - 25, index); // Get the previous numbers in the list.
    let sumFound = false;                         // This records if we've found two number in the list to match the current number
    
    /* Search through the list */
    for (let i = 0; i < range.length - 1 && !sumFound; i++) {
      for (let j = i + 1; j < range.length && !sumFound; j++) {
        if (range[i] + range[j] === numbers[index]) {
          sumFound = true;
        }
      }
    }

    /* Process the results of the search. */
    if (sumFound) index++;
    else {
      document.getElementById('p1b1').value = index;
      document.getElementById('p1b2').value = numbers[index];
      target = numbers[index];
      index = numbers.length;
    }
  }
  console.log('Finished Part 1');
  return target;
};

/**
 * This function solves part 2.
 */
const solvePart2 = (target) => {
  console.log('Solving Part 2');
  let sIndex = 0;               // This is the starting index for the numbers.
  let range;                    // This is the list of terms whose sum we will check.

  /* Search through the list of numbers. */
  while (sIndex < numbers.length) {
    range = [numbers[sIndex]];  // Start at the first number in the list
    let eIndex = sIndex + 1;    // This sets the last number in the range of consideration
    let sum = numbers[sIndex];  // Start the sum at the first number of the range.
    while (sum < target) {      // If the sum is less than the target, keep searching.
      range.push(numbers[eIndex]);  // Add thew new term in the range of consideration.
      sum += numbers[eIndex];       // Add the value to the list.
      if (sum === target) {         // If the numbers sum to the target, we are done.
        /* process the results */
        let temp = [...range];   // Preserve the order of the range of values
        temp.sort();            // Sort the temporary copy.
        
        /* Report the results */
        document.getElementById('p2b1').value = temp[0];
        document.getElementById('p2b2').value = temp[temp.length - 1];
        document.getElementById('p2b3').value = temp[0] + temp[temp.length - 1];
        document.getElementById('p2b4').value = range;
        
        /* Set sIndex to end the loop. */
        sIndex = numbers.length;
      }
      eIndex++;
    }
    sIndex++;
  }
  
  console.log('Finished Part 2');
}

const run = () => {
  console.log('Starting searches.');
  let target = solvePart1();
  solvePart2(target);
};
