
function populateTable(data) {
    const tableBody = document.getElementById("tableBody");
    const template = document.getElementById("rowTemplate");

    // Clear table
    tableBody.innerHTML = "";

    // Fill table with data
    for (const d of data) {
        const row = template.content.cloneNode(true);
        let td = row.querySelectorAll("th, td");
        td[0].textContent = d.id;
        td[1].textContent = d.x;
        td[2].textContent = d.x;
        td[3].textContent = d.y;
        td[4].textContent = d.z;
        tableBody.appendChild(row);
    }
}

/**
 * Parse CSV with header, if you need to do anything fancier,
 * just use PapaParse instead (https://www.papaparse.com/)
 * @param {string} csvStr String representing the CSV content
 * @param {string} sep Separator (defaults to comma)
 * @returns
 */
function parseCSV(csvStr, sep=",") {
    // Split on newlines
    let lines = csvStr.split("\n");

    // Separate header from following lines
    const header = lines[0].split(sep);
    lines = lines.slice(1);

    return lines.map(line => {
        const values = line.split(sep);
        const e = {};
        header.forEach((key, i) =>
            e[key] = parseFloat(values[i])
        );
        return e;
    });
}

async function textFileFromPath(path) {
    const res = await fetch(path);
    const text = await res.text();
    return text;
}

// Load data1.csv from path
textFileFromPath("./data1.csv").then(
    text => populateTable(parseCSV(text))
);

// Load new data when a file is uploaded by the user
const fileInput = document.getElementById("fileInput");
fileInput.onchange = () => {
    fileInput.files[0].text().then(text =>
        populateTable(parseCSV(text))
    );
};
