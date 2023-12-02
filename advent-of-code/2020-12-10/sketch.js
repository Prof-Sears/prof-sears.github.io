const fs = require('fs');

const rawtext = fs.readFileSync('input.txt', 'utf8');
const lines = rawtext.split('\n');

let jolts = [0];
let paths = [];
let solP1 = 0;
let solP2 = 0;

function processJolts() {
  for (let i = 0; i < lines.length; i++) {
    jolts.push(parseInt(lines[i]));
  }
  jolts.sort((a, b) => a - b);
  jolts.push(jolts[jolts.length - 1] + 3);
}

function solvePart1() {
  let differences = [0,0,0,0];
  for (let i = 1; i < jolts.length; i++) {
    differences[jolts[i] - jolts[i - 1]]++;
  }
  return (differences[1]) * (differences[3]);
}


function countPaths() {
  let pathCount = 0;
  let pathStack = [];
  for (let i = 0; i < jolts.length; i++) pathStack.push(0);
  let cIndex = 1;
  let step = 0;
  while (cIndex > 0) {
    
    while (pathStack[cIndex] < jolts.length) {
      pathStack.push(cIndex);
      step++;
      //print(`${step} - Pushed ${cIndex} - ${jolts[cIndex]}.`);
      cIndex++;
    }

    step++;
    pathCount++;
    //print(`${step} - Counting path.`);
    let cPath = [];
    for(let i = 0; i < pathStack.length; i++) cPath.push(jolts[pathStack[i]]);
    paths.push(cPath);

    step++;
    cIndex = pathStack.pop();
    //print(`${step} - Popped ${cIndex} - ${jolts[cIndex]}.`);

    while ((cIndex + 2 > jolts.length || jolts[cIndex + 1] - jolts[pathStack[pathStack.length - 1]] > 3) && pathStack.length) {
      //print(`${cIndex + 1} - ${pathStack[pathStack.length - 1]}`)
      step++;
      cIndex = pathStack.pop();
      //print(`${step} - Popped ${cIndex} - ${jolts[cIndex]}.`);
    }

    if (pathStack.length) cIndex++;
    
  }
  /* for(let i = 0; i < paths.length; i++) {
    print(paths[i]);
  } */
  return pathCount;
}

function solvePart2() {
  return countPaths();
}

processJolts();
console.log(`Part 1 Solution: ${solvePart1()}`);
console.log(`Part 2 Solution: ${solvePart2()}`);
