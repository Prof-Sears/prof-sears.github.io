/**
 * This function runs the instructions.
 */
const runInstructions = (instructions) => {

  let accumulator = 0;
  let opIndex = 0;
  let opCount = 0;
  let running = true;
  let retOb;
  let maxIndex = 0;

  scatter = [];

  while (running) {
    
    print(instructions[opIndex]);
    
    if (opIndex > maxIndex) maxIndex = opIndex;

    opCount++;

    scatter.push({
      x: opCount,
      y: opIndex
    });

    /* Successfully reached end of code. */
    if (opIndex >= instructions.length) {
      retOb = {
        status: true,
        accumulator: accumulator,
        maxIndex: maxIndex
      };
    }

    /* Hit an infinite loop. */
    else if (instructions[opIndex].visits > 0) {
      retOb = {
        status: false,
        accumulator: accumulator,
        maxIndex: maxIndex
      };
      running = false;
    }

    /* Handle a nop instruction */
    else if (instructions[opIndex].op === 'nop') {
      instructions[opIndex].visits++;
      opIndex++;
    }

    /* Handle a acc instruction */
    else if (instructions[opIndex].op === 'acc') {
      accumulator += instructions[opIndex].val;
      instructions[opIndex].visits++;
      opIndex++;
    }

    /* Handel a jmp instruction */
    else if (instructions[opIndex].op === 'jmp') {
      instructions[opIndex].visits++;
      opIndex += instructions[opIndex].val;
    }

    /* A default case */
    else {
      print(`unrecognized operation: ${instructions[opIndex].op}`);
      opIndex++;
    }
  }

  /* Reset Visits */
  for (let i = 0; i < instructions.length; i++) instructions[i].visits = 0;

  return retOb;
}