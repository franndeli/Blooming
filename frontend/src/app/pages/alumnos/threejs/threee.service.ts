// three.service.ts
import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Mesh, SphereGeometry, TextureLoader, BackSide, MeshPhongMaterial } from 'three';
import { Scene } from './scene.model';
import { Camara } from './camara.model';
import { Luces } from './luces.model';
import { Skybox } from './skybox.model';
import { Modelo } from './modelo.model';

@Injectable({
  providedIn: 'root',
})

export class ThreeService {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  avatar: Modelo;
  //cuestionario: Cuestionario;
  constructor() {
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new Scene(this.renderer);
    this.camera = new Camara();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.avatar = new Modelo();
    document.body.appendChild(this.renderer.domElement);

    //this.cuestionario = new Cuestionario('¿Como estás?', ['Bien', 'Mal', 'Regular', 'No te sabría decir']);

    this.camera.position.z = 5;

    new Luces().addToScene(this.scene);
    this.addSkybox();
    this.scene.add(this.avatar.avatar); // Añadir avatar.avatar en lugar de avatar
  }

  // Método para agregar el skybox
  addSkybox(): void {
    const Skygeometry = new THREE.SphereGeometry(360, 25, 25);
    const loader = new TextureLoader();

    loader.load('../assets/images/threejs/fondo.jpeg', (textura) => {
      const material2 = new MeshPhongMaterial({
        map: textura
      });

      const skybox = new Mesh(Skygeometry, material2);
      skybox.material.side = BackSide;
      this.scene.add(skybox);
    });
  }

  // Método para actualizar Three.js en cada fotograma
  actualizar(delta: number) {
    this.avatar.update(delta);
    this.renderer.render(this.scene, this.camera);
    // ... más lógica de actualización de Three.js

  }
}
