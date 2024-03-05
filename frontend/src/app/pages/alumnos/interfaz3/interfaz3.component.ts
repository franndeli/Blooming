import { Component,  ElementRef, OnInit, ViewChild  } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-interfaz3',
  templateUrl: './interfaz3.component.html',
  styleUrl: './interfaz3.component.css'
})
export class Interfaz3Component {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  scene: THREE.Scene = new THREE.Scene;
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer = new THREE.WebGL1Renderer;
  square: THREE.Mesh = new THREE.Mesh;
  
  spinning: any;

  constructor() {
    this.spinning = false;
   }

  ngOnInit(): void {
    this.initThree();
    this.createSquare();
    this.addResizeHandler();
    this.animate();
  }

  initThree(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbfd1e5);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  
  private addResizeHandler() {
    // Función para manejar el redimensionamiento de la ventana
    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Agregamos el oyente de eventos de redimensionamiento de ventana
    window.addEventListener('resize', onWindowResize);
  }

  createSquare(): void {
    const geometry = new THREE.PlaneGeometry(4, 4); // Crear geometría de un cuadrado de lado 6
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Material amarillo
    this.square = new THREE.Mesh(geometry, material); // Crear el mesh con la geometría y el material
    this.scene.add(this.square); // Añadir el cuadrado a la escena
  }

  spinSquare(): void {
    if (!this.spinning) {
      this.spinning = true;
    }
  }

  stopSquare(): void {
    this.spinning = false;
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());

    if (this.spinning) {
      this.square.rotation.z += 0.01; // Girar en dirección positiva en el eje X
    }

    this.renderer.render(this.scene, this.camera);
  }

  

}
