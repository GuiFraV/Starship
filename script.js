import * as THREE from "three"
import GUI from 'lil-gui'

const gui = new GUI()
const cubeTweaks = gui.addFolder("Orientation Cube")

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color : "blue"})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

mesh.position.set(1, -0.1, 0)

cubeTweaks.add(mesh.position, "x", -3, 3, 0.01)
cubeTweaks.add(mesh.position, "y", -3, 3, 0.01)
cubeTweaks.add(mesh.position, "z", -3, 3, 0.01)
cubeTweaks
    .add(mesh.rotation, "z")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("Cube rotation Z")

cubeTweaks
    .add(mesh.rotation, "x")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("Cube rotation X")

cubeTweaks
    .add(mesh.rotation, "y")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("Cube rotation Y")

const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

const sizes = {
    height: window.innerHeight,
    width: window.innerWidth
}

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)

})

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

gui
    .add(camera.position, 'z')
    .min(-3)
    .max(3)
    .step(0.01)
    .name("Distance Camera")

gui
    .add(camera.rotation, 'x')
    .min(-3)
    .max(3)
    .step(0.01)
    .name("Angle Camera")


    const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock();

function animate(){

    const elapsedTime = clock.getElapsedTime()

    camera.position.y = elapsedTime
    camera.lookAt(mesh.position)


    window.requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()