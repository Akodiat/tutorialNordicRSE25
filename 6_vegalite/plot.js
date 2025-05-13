
import {calcFirstNPrimes} from "./primes.js";

function plotPrimes(n, targetContainer) {
    // Calculate the primes
    const primes = calcFirstNPrimes(n);
    const values = primes.map((v, i)=>({
        value: v, index: i+1
    }));

    // Create plot specification
    const vlSpec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
        data: {values: values},
        title: `A not very useful plot of the first ${n} primes`,
        mark: 'bar',
        encoding: {
            x: {
                field: 'index',
                type: 'ordinal',
                axis: {title: 'Prime index'},
            },
            y: {
                field: 'value',
                type: 'quantitative',
                axis: {title: 'Prime value'},
            },
        },
    };

    // Embed plot in container
    vegaEmbed(targetContainer, vlSpec, {renderer: "svg"});
}

export {plotPrimes};