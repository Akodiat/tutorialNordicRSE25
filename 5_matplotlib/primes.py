import math
import matplotlib.pyplot as plt
import numpy as np

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

def plotPrimes(n):
    # Data for plotting
    x = np.arange(1, n+1, 1)
    s = calcFirstNPrimes(n)

    fig, ax = plt.subplots()
    bars = ax.bar(x, s)

    ax.set(xlabel='Prime index', ylabel='Prime value',
        title='A not very useful plot of the first {} primes'.format(n))
    ax.grid()
    plt.show()