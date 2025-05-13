import {plotPrimes} from "./plot.js";

// Obtain references to UI elements
const calcButton = document.getElementById("calcButton");
const numberInput = document.getElementById("numberInput");

// When the button is clicked, get n from number input,
// run calculation, then write output to the output container.
calcButton.onclick = () => {
    const n = numberInput.valueAsNumber;
    plotPrimes(n, "#plotContainer");
}