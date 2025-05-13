import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

/**
 * Parse CSV with header, if you need to do anything fancier,
 * just use PapaParse instead (https://www.papaparse.com/)
 * @param {string} csvStr String representing the CSV content
 * @param {string} sep Separator (defaults to comma)
 * @returns
 */
function parseCSV(csvStr, sep=",") {
    let lines = csvStr.split("\n");
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

// Setup canvas and renderer
const canvas = document.getElementById("threeCanvas");
canvas.width = canvas.parentElement.clientWidth;
canvas.height = 500;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
    alpha: true
});
renderer.setSize(canvas.width, canvas.height);

// Setup scene, camera, camera controls, and lights
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
camera.position.set(5, 2, 0);

const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;
controls.target.set(0, 0.5, 0);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 100);
pointLight.position.set(2, 5, 1);
scene.add(pointLight);

// Setup common geometry and material for objects to be added
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const material = new THREE.MeshStandardMaterial({color: 0x2C9CDD});

// Add objects according to data file
textFileFromPath("./data.csv").then(text => {
    for (const v of parseCSV(text)) {
        const e = new THREE.Mesh(geometry, material);
        e.position.set(v.x, v.y, v.z);
        e.scale.multiplyScalar(v.size);
        e.lookAt(new THREE.Vector3().randomDirection());
        scene.add(e);
    }
});

// Update canvas and renderer when window is resized
window.onresize = () => {
    canvas.width = canvas.parentElement.clientWidth;
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
};

// Define animation loop
function animate() {
    renderer.render(scene, camera);
    controls.update();
}

// Start animation loop
renderer.setAnimationLoop(animate);