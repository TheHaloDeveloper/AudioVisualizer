const FLOOR_SIZE = 200;
const PARTS = 32;
const STARTCOLOR = 0x00ffff;
const ENDCOLOR = 0xaa00ff;

let scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 20, 70);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);

camera.position.set(0, -27, 17);
camera.up.set(0, 0, 1);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

let loader = new THREE.TextureLoader();
let floorTexture = loader.load("src/images/grid.png");
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(0.1 * FLOOR_SIZE, 0.1 * FLOOR_SIZE);

let ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

let floor = new THREE.Mesh(
    new THREE.BoxGeometry(FLOOR_SIZE, FLOOR_SIZE, 10),
    new THREE.MeshBasicMaterial({color: 0xffffff, map: floorTexture, fog: true})
);
floor.position.z = -4.5;
scene.add(floor);

let bars = [];
let start = 0.4 - (PARTS / 2) * 1.22;

for (let i = 1; i < PARTS + 1; i++) {
    let offset = Math.floor((i - 1) / 4);
    let box = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 1.15, 1.15),
        new THREE.MeshBasicMaterial({color: gradient(PARTS, i)})
    );

    box.position.set(start + (1.22 * (i - 1) + (0.1 * offset)), 0.65, 1.05);
    scene.add(box);
    bars.push(box);
}

let data, context, audio, source, analyzer;
document.addEventListener("click", function () {
    if (!data) {
        context = new (window.AudioContext || window.webkitAudioContext)();
        audio = new Audio("src/audio/apartments.mp3");
        source = context.createMediaElementSource(audio);
        analyzer = context.createAnalyser();
        source.connect(analyzer);
        analyzer.connect(context.destination);
        audio.play();
        data = new Uint8Array(analyzer.frequencyBinCount);
    }
});

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    if (data) {
        analyzer.getByteFrequencyData(data);
        const bands = partitions(data, PARTS);

        for (let i = 0; i < PARTS; i++) {
            const height = bands[i] / 255 * 20;
            bars[i].scale.z = bars[i].scale.z * 0.8 + height * 0.2;
            bars[i].position.z = 1.1 + (bars[i].scale.z - 1.15) / 2;
        }
    }
}
render();