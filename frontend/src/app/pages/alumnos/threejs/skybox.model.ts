import {  
    Mesh,
    SphereGeometry,
    TextureLoader,
    BackSide,
    MeshPhongMaterial
} from "three"

export  class Skybox{
    constructor (scene: THREE.Scene){
        const Skygeometry = new SphereGeometry(360, 25, 25)
        const loader = new TextureLoader()
        const textura = loader.load("../assets/images/threejs/fondo.jpeg")
        const material2 = new MeshPhongMaterial({
            map: textura
        })
        const skybox = new Mesh(Skygeometry, material2)
        skybox.material.side = BackSide
        scene.add(skybox);
    }
}