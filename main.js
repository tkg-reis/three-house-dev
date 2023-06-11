import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

console.log(THREE);

const gui = new dat.GUI(); 

const canvas = document.querySelector("#webgl");

let scene, camera, renderer;

scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000
);
// 可変部分
camera.position.z = 9;
scene.add(camera);

renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

const loader = new THREE.TextureLoader();
const floorTexture = loader.load("/public/floor.jpg");

const floorGeometry = new THREE.PlaneGeometry(10,10);

const floorMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture,
  roughness: 0.4,
  flatShading: true,
  side: THREE.DoubleSide,
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// floor.position.set(0,-1,-6);
floor.position.y = -1.1;
floor.rotation.set(5,0,-15);
scene.add(floor);

gui.addColor(floorMaterial,"color");
// gui.add(floorMaterial, "rotation").min(0).max(1).step(.001);
// gui.add(floorMaterial, "metalness").min(0).max(1).step(0.001);
// gui.add(floorMaterial, "roughness").min(0).max(1).step(0.001);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
scene.add(orbitControls);

window.addEventListener("resize",() => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const animation = () => {
  orbitControls.update();
  renderer.render(scene , camera);
  // animation関数を1/60秒ごとに呼び出す
  // ここはPCスペックに依存する
  window.requestAnimationFrame(animation);
};

animation();