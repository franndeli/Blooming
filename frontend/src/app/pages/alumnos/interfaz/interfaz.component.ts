import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as THREE from 'three';
import { ElementRef, OnInit, ViewChild , HostListener} from '@angular/core';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrl: './interfaz.component.css'
})
export class InterfazComponent {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  
  scene: any;
  camera: any;
  renderer: any;
  cube: any;
  mouse:any;
  lastMouse: any;
  draggableObjects: any; 
  controls: any;
  dcontrols: any;

  ngOnInit(): void {
    this.initScene();
    this.addResizeHandler();
    this.animate();

  }

  initScene(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 4.2;
    this.camera.position.set(0, 2, 4.2); // Cambia la posición de la cámara
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xbfd1e5, 1); // Establece el fondo a color azul claro
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Cargamos las texturas para cada cara del cubo
    const textureLoader = new THREE.TextureLoader();
    // textureLoader.load('ruta_de_la_imagen_para_la_cara_1')
    const textures = [
      textureLoader.load('assets/images/threejs/feliz.avif'),
      textureLoader.load('assets/images/threejs/jugando.avif'),
      textureLoader.load('assets/images/threejs/llorando.avif'),
      textureLoader.load('assets/images/threejs/pensativo.avif'),
      textureLoader.load('assets/images/threejs/riendo.avif'),
      textureLoader.load('assets/images/threejs/acosada.avif')

    ];
    const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    this.cube = new THREE.Mesh(geometry, materials);
    this.scene.add(this.cube);

  
    this.mouse = new THREE.Vector2();
    this.lastMouse = new THREE.Vector2();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.draggableObjects = [];

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

  animate(): void {
    requestAnimationFrame(() => this.animate());
    this.render();
  }
  
  render(): void {
    this.renderer.render(this.scene, this.camera);
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Normalizar las coordenadas del mouse
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycaster para detectar la intersección con el objeto (y su cara)
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = raycaster.intersectObject(this.cube);

    // Si hay intersecciones, mostrar la cara seleccionada en la consola
    if (intersects.length > 0) {
      console.log(`Seleccionada la cara ${intersects[0].faceIndex}`);
    }
  }
}
