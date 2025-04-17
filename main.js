let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);
camera.position.z = 5;

let loader = new THREE.TextureLoader();
let floorTexture = loader.load("images/grid.png");
floorTexture.repeat.set(0.1, 0.2);

let ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

let box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0xffffff, map: floorTexture})
)
scene.add(box);

function render() {
    requestAnimationFrame(render)
    renderer.render(scene, camera);
}
render();