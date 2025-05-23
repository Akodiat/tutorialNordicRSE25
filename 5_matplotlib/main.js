// Obtain references to UI elements
const calcButton = document.getElementById("calcButton");
const numberInput = document.getElementById("numberInput");
const inputContainer = document.getElementById("inputContainer");
const plotContainer = document.getElementById("plotContainer");
const loadingIndicator = document.getElementById("loadingIndicator");

// Make sure plots are appended to the correct container
document.pyodideMplTarget = plotContainer;

// Setup pyodide
let pyodide = await loadPyodide();

// Load numpy
await pyodide.loadPackage("micropip");

// Install matplotlib
const micropip = pyodide.pyimport("micropip");
await micropip.install("matplotlib");
await micropip.install("numpy");

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
// run calculation, then plot.
calcButton.onclick = () => {
    const n = numberInput.valueAsNumber;
    pyPrimes.plotPrimes(n);
}