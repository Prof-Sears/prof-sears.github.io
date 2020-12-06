/**
 * This function gets the input from my GitHub rectory.
 */
const githubURL = 'https://prof-sears.github.io/AdventOC/2020-12-01/input.txt';

const input = [];

const getInput = async () => {
  const response = await fetch(githubURL);
  const rawtext = await response.text();
  input = rawtext.split('\n');
};

getInput();

const run = () => {
  const expenses = [];
  for(let inp of input) expenses.push(parseInt(inp));
}