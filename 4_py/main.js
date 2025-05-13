// Obtain references to UI elements
const calcButton = document.getElementById("calcButton");
const numberInput = document.getElementById("numberInput");
const inputContainer = document.getElementById("inputContainer");
const outputContainer = document.getElementById("outputContainer");
const loadingIndicator = document.getElementById("loadingIndicator");

// Setup pyodide
let pyodide = await loadPyodide();

// Load numpy
await pyodide.loadPackage("micropip");

// Uncomment these if you want numbpy, matplotlib, etc
//const micropip = pyodide.pyimport("micropip");
//await micropip.install("numpy");
//await micropip.install("matplotlib");

// Load the python code from file
await pyodide.runPythonAsync(`
    from pyodide.http import pyfetch
    response = await pyfetch("./primes.py")
    with open("primes.py", "wb") as f:
        f.write(await response.bytes())
`);
const pyPrimes = pyodide.pyimport("primes");

// Hide loading indicator and show inputs
loadingIndicator.hidden = true;
inputContainer.hidden = false;

// When the button is clicked, get n from number input,
// run calculation, then write output to the output container.
calcButton.onclick = () => {
    const n = numberInput.valueAsNumber;
    const primes = pyPrimes.calcFirstNPrimes(n);
    outputContainer.innerHTML = primes.join(", ");
}