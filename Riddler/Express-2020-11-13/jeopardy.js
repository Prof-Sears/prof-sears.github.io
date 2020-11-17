/**
 * This function answers the first part of the Riddler Express.
 * The board is loaded from lowest to highest scores.
 * The Daily Doubles run from the first choice to the last.
 * The winnings are averaged.
 */
function firstsim() {
  console.log("First Sim Running.");
  var board = initalizeBoard("first");
  var scores = [];
  for(var DD=0; DD<30; DD++) {
    scores.push(scoreboard(board,DD));
  }
  
  var outstring = "</table><h2>Average = $" + average(scores).toFixed(2) + "</h2>";
  
  document.getElementById("firstoutput").innerHTML = outstring;
}

/**
 * This function answers a personal question.
 * The board is loaded from highest to lowest scores.
 * The Daily Doubles run from the first choice to the last.
 * The winnings are averaged.
 */
function secondsim() {
  console.log("Second Sim Running.");
  var board = initalizeBoard("second");
  var scores = [];
  for(var DD=0; DD<30; DD++) {
    scores.push(scoreboard(board,DD));
  }
  
  var outstring = "</table><h2>Average = $" + average(scores).toFixed(2) + "</h2>";
  
  document.getElementById("secondoutput").innerHTML = outstring;
}

/**
 * This function answers the extra credit question.
 * The board scores are shuffled.
 * The Daily Double is chosen randomly.
 * The scores are collected after 1000000 simulations.
 * The average of the scores is outputted.
 */
function thirdsim() {
  console.log("Third Sim Running.");
  var scores = [];
  for(let i = 0; i < 1000000; i++) {
    let board = initalizeBoard("third");
    let DD = Math.floor(Math.random() * 30);
    scores.push(scoreboard(board,DD));
  }
  var average = scores.reduce((a,b) => a+b) / scores.length;

  var outstring = "<h2>Average Winnings = $" + average.toFixed(2) + "</h2>";
  outstring += "<p>Number of Simulations: " + scores.length + "</p>";
  document.getElementById("thirdoutput").innerHTML = outstring;

}

/**
 * This function initializes the board.
 */
function initalizeBoard(sim) {
  var board = [];
  var i;
  switch(sim) {
    /* Initalize the board from lowest to highest scores. */
    case "first":
      for(i=0; i < 6; i++) board.push(200);
      for(i=0; i < 6; i++) board.push(400);
      for(i=0; i < 6; i++) board.push(600);
      for(i=0; i < 6; i++) board.push(800);
      for(i=0; i < 6; i++) board.push(1000);
      break;
    /* Initalize the board from highest to lowest scores. */
    case "second":
      for(i=0; i < 6; i++) board.push(1000);
      for(i=0; i < 6; i++) board.push(800);
      for(i=0; i < 6; i++) board.push(600);
      for(i=0; i < 6; i++) board.push(400);
      for(i=0; i < 6; i++) board.push(200);
      break;
    /* Initalize the board from highest to lowest, then shuffle the results. */
    case "third":
      for(i=0; i < 6; i++) board.push(200);
      for(i=0; i < 6; i++) board.push(400);
      for(i=0; i < 6; i++) board.push(600);
      for(i=0; i < 6; i++) board.push(800);
      for(i=0; i < 6; i++) board.push(1000);
      for(i=board.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [board[i],board[j]] = [board[j],board[i]];
      }
    
  }
  return board;
}

/**
 * This function scores a board.
 */
function scoreboard(board,DD) {
  var sum=0;
    
  for(var i = 0; i < DD; i++) {
    sum += board[i];
    //console.log(board[i],sum);
  }
    
  //console.log("Daily Double!");
  if(sum < 1000) sum += 1000;
  else sum = 2*sum;
  //console.log(sum);
    
  for(i = DD+1; i < 30; i++) {
    sum += board[i];
    //console.log(board[i],sum);
  }
  
  return sum;
}

/**
 * This function averages the results of the array.
 * I borrowed this code from Stackexchange.
 */
function average(array) {
  return array.reduce((a,b) => a+b) / array.length;
}