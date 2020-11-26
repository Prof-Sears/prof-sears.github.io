console.log('Running Primes Calculator');

const fs = require('fs');

const primes = new Buffer.alloc(1000);
const maxprime = 200n;

sieve();

fs.writeFile('prime.txt', primes);

/**
 * This function implements the Sieve of Eratosthenes.
 */
function sieve() {
    let sieve = [];
    let primeNum = 0;
    for(let i = 0; i <= maxprime; i++) sieve.push(0n);  // Load the sieve.

    let skip = 2n;
    while(skip**2n < maxprime) {
        if(sieve[skip] == 0) for(let i = skip**2n; i <= maxprime; i += skip) sieve[i]++;
        skip++;
    }
    
    for(let i = 2; i < sieve.length; i++) if(sieve[i] == 0) {
        primeNum++;
        primes.write
    }

}