import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById("threeCanvas");
canvas.width = canvas.parentElement.clientWidth;
canvas.height = 500;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
    alpha: true
});

renderer.setSize(canvas.width, canvas.height);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 10);
pointLight.position.set(1, 2, 1);
scene.add(pointLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);

camera.position.set(5, 2, 0);

const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;
controls.target.set(0, 0.5, 0);

window.onresize = () => {
    canvas.width = canvas.parentElement.clientWidth;
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
};

renderer.setAnimationLoop(animate);

function animate() {
    renderer.render(scene, camera);
    controls.update();
}