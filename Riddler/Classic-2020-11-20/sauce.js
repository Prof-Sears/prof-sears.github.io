var playersPlot;    // This is the graph for the players. It is global to help with refeshing the graph.
var passesPlot;     // This is the graph for the frequency of passes. It is global to help with refreshing the graph.

/**
 * This function runs the simulation of the cranberry passing problem. It collects and outputs the data.
 */
function runSauce() {
    console.log("Running Sauce Passing Simulation.");
    var reps = parseInt(document.getElementById('repscount').value);
    var players = parseInt(document.getElementById('peoplecount').value);
    var endData = [];
    var timeData = [];

    for(let i = 0; i < players; i++) endData.push(0);

    console.log(`People: ${players} --- Repetitions: ${reps}`);
    for(let i = 0; i < reps; i++) {
        let results = runSimulation(players);
        endData[results[0]]++;
        logPasses(results[1], timeData);
    }

    // Output the freqency data
    var output = '<h3>Player Ending Frequency</h3><table><tr><th>Player</th><th>Ending Frequency</th><th>Relative Frequency</th></tr>';
    for(let i = 0; i < players; i++) {
        output += `<tr><td>${(i+1)}</td><td>${endData[i]}</td><td>${(endData[i]/reps)}</td></tr>`;
    }
    outputPlayers(endData, reps);
    outputPasses(timeData, reps);

    console.log("Simulation Finished.");
}

/**
 * This runs one iteration of the simulation.
 * @param players - The number of people in the simulation.
 * @return An array containing the last player to get the sauce and the number of passes in the round.
 */
function runSimulation(players) {
    var passes = 0;         // The total number of passes
    var cPlayer = 0;        // The person who currently has the dish, this is the starting player
    var numRec = 1;         // The number of people who have recived the dish, the starting player is the only person who had the dish
    var playerStatus = [1];  // Indicates which players have recieved the dish, 1 indicates the player had the dish
    for(let i = 1; i < players; i++) playerStatus.push(0);  // All players except the starting player have not yet had the dish

    while(numRec < players) {       // Half the time, pass to the player numbed above.
        if(Math.random() < 0.5) {
            cPlayer++;
            if(cPlayer >= players) cPlayer -= players;
        }      
        else {                      // Otherwise, pass to the player numbered below.
            cPlayer--;
            if(cPlayer < 0) cPlayer += players;
        }
        passes++;                           // Increment the number of passes
        if(playerStatus[cPlayer] == 0) {    // If this is the first time the current player has recieved the dish
            numRec++;                       // Increment the number of players who have recieved the dish
            playerStatus[cPlayer] = 1;      // Indicate the player has recieved the dish
        }
    }

    return [cPlayer, passes];   // Since we are out of the loop, the current player is the last player to recieve the sauce and the number of passes is complete
}

/**
 * This function logs the number of passes for one simulation.
 * @param passes The number of passes.
 * @param timeData The array storing the number of passes.
 */
function logPasses(passes, timeData) {
    for(let i = timeData.length; i < passes; i++) timeData.push(0); // If this is the longest sequence so far, increase the size of the array.
    timeData[passes-1]++;                                           // Increment the array entry for the corresponding number of passes.
}

/**
 * This function outputs the relative frequency of each player being the last to receive the sauce as a bar chart.
 * @param {*} endData 
 * @param {*} reps 
 */
function outputPlayers(endData, reps) {
    var graph = document.getElementById('playergraph'); // Grab the element to display the scatterplot
    graph.innerHTML = "";   // Clear out any remaining data
    var playerData = [];    // Stores relative frequency data                            
    var labels = [];        // Stores labels for each player
    var colors = [];        // Stores the color for each bar
    for(let i = 0; i < endData.length; i++) {
        playerData.push(endData[i]/reps);   // Convert the frequencies to relative frequencies.
        labels.push('' + i);                // Use player numbers for labels.
        colors.push(`rgba(${Math.floor(255*i/endData.length)},${Math.floor(255*(1 - i/endData.length))},200,0.8)`);
    }
    console.log(colors);
    // Graph the data.
    if(playersPlot instanceof Chart) playersPlot.destroy(); // This clears the graph from any old data.
    playersPlot = new Chart(graph,
        {   type: 'bar',
            data: {
                labels: labels,
                datasets: [{label: 'Frequency of Recieving Final Pass', 
                barPercentage: 1.0, 
                data: playerData, 
                backgroundColor: colors, 
                borderColor: 'rgba(0,0,0,1.0)'}]
            },
            options: {}
        });
}


/**
 * This function outputs the number of passes as an scatterplot.
 * @param timeData The array storing the number of passes.
 * @param reps The number of repetitons of the simulation.
 */
function outputPasses(timeData, reps) {
    var graph = document.getElementById('passgraph'); // Grab the element to display the scatterplot
    graph.innerHTML = "";                             // Clear out any remaining data
    var passesData = [];                              // The data should be stored in an array of objects 
    for(let i = 0; i<timeData.length; i++) {          // Loop through and output passes data, skip 0 entries
        if(timeData[i] > 0) passesData.push({x: (i+1), y: (timeData[i]/reps)});
    }
    
    // Graph the data.
    if(passesPlot instanceof Chart) passesPlot.destroy(); // This clears the graph from any old data.
    passesPlot = new Chart(graph, 
        { type: 'scatter', 
            data: {
                datasets: [{label: 'Final # of Passes', data: passesData, pointBackgroundColor: 'rgba(128, 128, 200, 0.8)', pointBorderColor: 'rgba(0,0,0,1.0)'}]
            }, 
            options: {} 
        });
}