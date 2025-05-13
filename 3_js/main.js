import {calcFirstNPrimes} from "./primes.js";

// Obtain references to UI elements
const calcButton = document.getElementById("calcButton");
const numberInput = document.getElementById("numberInput");
const outputContainer = document.getElementById("outputContainer");

// When the button is clicked, get n from number input,
// run calculation, then write output to the output container.
calcButton.onclick = () => {
    const n = numberInput.valueAsNumber;
    const primes = calcFirstNPrimes(n);
    outputContainer.innerHTML = primes.join(", ");
}