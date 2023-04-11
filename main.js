import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { gsap } from "gsap"

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
)
camera.position.z = 18

// Create Shape
const geometry = new THREE.BoxGeometry(6, 6, 6)
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.2,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const geometry2 = new THREE.SphereGeometry(4, 74, 74)
const mesh2 = new THREE.Mesh(geometry2, material)
mesh2.position.x = 10
mesh2.position.y = 0
mesh2.position.z = 0
scene.add(mesh2)

// Light
// const light = new THREE.PointLight(0xffffff, 1, 100)
const light = new THREE.DirectionalLight(0xffffff, 0.75, 100)
light.position.set(-10, 50, 20)
scene.add(light)

const ambient = new THREE.AmbientLight(0xffffff, 0.25)
scene.add(ambient)

// const spot = new THREE.SpotLight(0xff0000, 1)
// spot.position.set(2, 2, 10)
// scene.add(spot)

// Render
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false
controls.enableZoom = false
// controls.autoRotate = true
// controls.autoRotateSpeed = 10

//controls.update() must be called after any manual changes to the camera's transform
controls.update()

function animate() {
  requestAnimationFrame(animate)

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update()

  renderer.render(scene, camera)
}
animate()

window.addEventListener("resize", () => {
  //Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  renderer.setSize(sizes.width, sizes.height)
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
})

const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//gsap animation
const timeLine = gsap.timeline({ defaults: { duration: 2 } })
timeLine.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
timeLine.fromTo(".title", { opacity: 0 }, { opacity: 1 })
