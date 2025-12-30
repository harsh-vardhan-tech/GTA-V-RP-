const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth/window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha:true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Fire-like particles
const particles = new THREE.BufferGeometry();
const count = 4000;
const pos = [];

for(let i=0;i<count;i++){
  pos.push(
    (Math.random()-0.5)*20,
    Math.random()*20,
    (Math.random()-0.5)*20
  );
}

particles.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(pos,3)
);

const material = new THREE.PointsMaterial({
  color:0xff0000,
  size:0.05
});

const fire = new THREE.Points(particles, material);
scene.add(fire);

function animate(){
  requestAnimationFrame(animate);
  fire.rotation.y += 0.001;
  fire.rotation.x += 0.0005;
  renderer.render(scene,camera);
}
animate();

window.addEventListener("resize",()=>{
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});
