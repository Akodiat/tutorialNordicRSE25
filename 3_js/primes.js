/**
 * Calculate the first n primes
 * from https://stackoverflow.com/a/35112760
 * @param {number} n Number of primes to return
 * @returns {number[]} List of first n primes
 */
function calcFirstNPrimes(n) {
    const primes = [2];
    for (let i=2; primes.length<n; i++){
        let prime = true;
        let iRoot = Math.sqrt(i) + 1;
        for (let j=2; j<iRoot; j++) {
            if (i % j === 0) {
                prime=false;
                break;
            }
        }
        if (prime) {
            primes.push(i);
        }
    }
    return primes;
}

export {calcFirstNPrimes};