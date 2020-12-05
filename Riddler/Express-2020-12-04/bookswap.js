/**
 * This function shuffles an array.
 * @param myArray The array to shuffle.
 */
const shuffle = (myArray) => {
  for(i=myArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [myArray[i],myArray[j]] = [myArray[j],myArray[i]];
  }
};

/**
 * This function runs the simulation.
 */
const runSimulation = () => {
  console.log('Running Simulation');
  const itrs = 40000;      // This is the number of simulations to run for each value of N
  const maxN = 20;        // This is the largest value of N
  let counts = [];
  
  for(let N = 2; N <= maxN; N++) {              // loop through the number of players.
    let selfDrawsCounts = [];
    for(let i = 0; i <= N; i++) selfDrawsCounts.push(0);
    console.log(selfDrawsCounts.length);
    let players = [];                           // This array contains the player numbers.
    for(let i = 0; i < N; i++) players.push(i); // Add players to the array.
    let successes = 0;                          // Track the number of times no one draws themself.
    for(let i = 0; i < itrs; i++) {             // Loop through the iterations of the simulation.
      shuffle(players);                         // Shuffle the array of the players
      let selfDraws = 0;
      for(let j = 0; j < players.length; j++) { // Check if each player is out of place.
        if(j === players[j]) selfDraws++;        // If somebody drew themself, record it.
      }
      selfDrawsCounts[selfDraws]++;
      if(selfDraws === 0) successes++;                // If nobody drew themself, increment the success count
    }
    counts.push({players: N, expected: (1/N).toFixed(5), simulated: (successes/itrs).toFixed(5)}); // Add the results to the data.
  }
  
  /* Output the results */
  let output = '<table><tr><th>Players</th><th>Expected Probability</th><th>Simulated Probability</th></tr>';
  for(let datum of counts) output += `<tr><td>${datum.players}</td><td>${datum.expected}</td><td>${datum.simulated}</td></tr>`;
  output += '</table>';
  
  document.getElementById('out').innerHTML = output;
};