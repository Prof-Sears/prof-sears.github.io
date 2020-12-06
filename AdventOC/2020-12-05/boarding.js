/**
 * This function gets a ticket description and converts it to a seat id.
 */
const convert = () => {
  const ticket = document.getElementById('ticketbox').value;  // Retrieve the string on a ticket.
  /* convert the instructions to a binary number by replacing F and L with 0 and B and R with 1 */
  const binString = ticket.replace(/F/g,'0').replace(/B/g,'1').replace(/L/g,'0').replace(/R/g,'1');
  const seatID = parseInt(binString,2);
  document.getElementById('idbox').value = seatID;
};

/**
 * This function converts a given string into a seat ID.
 */
const seatID = (spec) => parseInt(spec.replace(/F/g,'0').replace(/B/g,'1').replace(/L/g,'0').replace(/R/g,'1'), 2);

/**
 * This function solves the main problem.
 */
const findMissing = async () => {
  const response = await fetch('https://prof-sears.github.io/AdventOC/2020-12-05/input.txt'); // Fetch the data stored on my GitHub repo
  const rawtext = await response.text();                                              // get the text from the fetch call.
  const tickets = rawtext.split('\n');                                                // split the lines of the text into an array of tickets.
  
  const seatIDs = [];                                                                 // an array to contain the seat IDs
  for(let ticket of tickets) if(!isNaN(seatID(ticket))) seatIDs.push(seatID(ticket)); // fill the array with the known seat IDs
  
  seatIDs.sort((a,b) => a-b);                                                         // sort the seat IDs
  
  document.getElementById('highestbox').value = seatIDs[seatIDs.length-1];            // Fill the highest seat ID into the document.
  
  let i = 1;
  while(seatIDs[i]-seatIDs[i-1] === 1) i++;
  console.log(`Skipped seats: ${seatIDs[i-1]} and ${seatIDs[i]}`);
  document.getElementById('missingbox').value = seatIDs[i] - 1;
}
