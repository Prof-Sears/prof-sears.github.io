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
const seatID = (spec) => parseInt(spec.replace(/F/g,'0').replace(/B/g,'1').replace(/L/g,'0').replace(/R/g,'1') ,2);

/**
 * This function solves the main problem.
 */
const findMissing = async () => {
  const tickets = await fetch('https://prof-sears.github.io/AdventoC/2020-12-05/input.txt');
  console.log(tickets);
}
