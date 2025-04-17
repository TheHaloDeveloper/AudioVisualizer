const FLOOR_SIZE = 200;

let scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 20, 60);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);

camera.position.set(0, -14, 10);
camera.up.set(0, 0, 1);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

let loader = new THREE.TextureLoader();
let floorTexture = loader.load("images/grid.png");
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(0.1 * FLOOR_SIZE, 0.1 * FLOOR_SIZE);

let ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

let box = new THREE.Mesh(
    new THREE.BoxGeometry(FLOOR_SIZE, FLOOR_SIZE, 1),
    new THREE.MeshBasicMaterial({color: 0xffffff, map: floorTexture, transparent: true, opacity: 0.5, fog: true})
);
scene.add(box);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();