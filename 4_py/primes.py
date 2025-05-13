import math

def calcFirstNPrimes(n):
    primes = [2]
    i = 2
    while len(primes) < n:
        prime = True
        iRoot = math.sqrt(i) + 1
        for j in range(2, math.ceil(iRoot)):
            if (i % j == 0):
                prime = False
                break;
        if prime:
            primes.append(i)
        i += 1
    return primes