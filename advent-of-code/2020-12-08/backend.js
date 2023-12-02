let instructions = []; // The array of numbers for processing

const loadInput = async () => {
  const response = await fetch('https://prof-sears.github.io/AdventOC/2020-12-08/input.txt'); // Fetch the data stored on my GitHub repo
  const rawtext = await response.text();  // get the text from the fetch call.
  const lines = rawtext.split('\n');      // split the intput into lines.
  for(let i = 0; i < lines.length; i++) {
    if(lines[i] !== '') instructions.push(      // parse the line if it is not empty
      {
        op: lines[i].substring(0,3),            // this is the operation.
        val: parseInt(lines[i].substring(4)),   // this is the value.
        visits: 0                               // this is the number of times the operation has been visited when the instructions run.
      });
  }
  console.log(`Loaded ${instructions.length} instructions.`);
  document.getElementById('statusbox').value = "Loaded.";
};



/**
 * This function runs the instructions.
 */
const runInstructions = (ins) => {

  let accumulator = 0;
  let opIndex = 0;
  let opCount = 0;
  let running = true;
  let retOb;
  
  while (running) {
    
    /* Successfully reached end of code. */
    if (opIndex >= ins.length) {
      retOb = {
        status: true,
        accumulator: accumulator
      };
      running = false;
    }

    /* Hit an infinite loop. */
    else if (ins[opIndex].visits > 0) {
      retOb = {
        status: false,
        accumulator: accumulator
      };
      running = false;
    }

    /* Handle a nop instruction */
    else if (ins[opIndex].op === 'nop') {
      ins[opIndex].visits++;
      opIndex++;
    }

    /* Handle a acc instruction */
    else if (ins[opIndex].op === 'acc') {
      accumulator += ins[opIndex].val;
      ins[opIndex].visits++;
      opIndex++;
    }

    /* Handel a jmp instruction */
    else if (ins[opIndex].op === 'jmp') {
      ins[opIndex].visits++;
      opIndex += ins[opIndex].val;
    }

    /* A default case */
    else {
      print(`unrecognized operation: ${ins[opIndex].op}`);
      opIndex++;
    }
    
    opCount++;
  }

  return retOb;
}

loadInput();
//console.log(runInstructions(instructions).status);
