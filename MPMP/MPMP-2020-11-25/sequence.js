var primes = [];

/**
 * This function implements the Sieve of Eratosthenes.
 */
function sieve() {
    const maxprime = parseInt(document.getElementById('maxprime').value);
    let sieve = [];
    for(let i = 0; i <= maxprime; i++) sieve.push(0);  // Load the sieve.

    let skip = 2;
    while(skip**2 < maxprime) {
        if(sieve[skip] == 0) for(let i = skip**2; i <= maxprime; i += skip) sieve[i]++;
        skip++;
    }
    
    for(let i = 2; i < sieve.length; i++) if(sieve[i] == 0) primes.push(i);

    document.getElementById('solvebutton').disabled = false;
    document.getElementById('primesbutton').disabled = true;
}

/**
 * This function starts to solve the puzzle.
 */
function solve() {
    console.log(primes);
    let sum = 0n;    // This tracks the sum of the squares of the primes
    let output = '<table><tr><th>n</th><th>Sum of Squares of n Primes</th><th>Sum modulo n</th></tr>'; // Prepare the output
    for(let i = 0; i < primes.length; i++) {
        sum += BigInt(primes[i])**2n;            // Update the sum of squares of the primes
        if(sum % BigInt(i+1) === 0n) {          // If the number n divides the sum of squares of primes
            output += `<tr style="background-color: rgba(0,255,0,0.4)"><td>${(i+1)}</td><td>${sum}</td><td>${sum % BigInt(i+1)}</td></tr>`;  // output the entry in green.
        }
    }
    output += '</table>';                                       // Finish the output

    document.getElementById('solutionout').innerHTML = output;  // output(?) the output
    document.getElementById('primesbutton').disabled = false;
    document.getElementById('solvebutton').disabled = true;
}