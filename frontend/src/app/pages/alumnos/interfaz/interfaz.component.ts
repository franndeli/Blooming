import { Component } from '@angular/core';
import * as THREE from 'three';
import { ElementRef, OnInit, ViewChild , HostListener} from '@angular/core';



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
  selectedFaceIndex: number | null;
 

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.cube = null;
    this.mouse= THREE.Vector2
    this.lastMouse= THREE.Vector2;
    this.selectedFaceIndex = null;
  }

  ngOnInit(): void {
    this.initScene();
    this.animate();
    this.addListeners();
  }

  initScene(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xadd8e6, 1); // Establece el fondo a color azul claro
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }), // Derecha - Rojo
      new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.8 }), // Izquierda - Verde
      new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.8 }), // Arriba - Azul
      new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.8 }), // Abajo - Amarillo
      new THREE.MeshBasicMaterial({ color: 0xffa500, transparent: true, opacity: 0.8 }), // Frente - Naranja
      new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.8 })  // Atrás - Magenta
    ];

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    this.cube = new THREE.Mesh(geometry, materials);
    this.scene.add(this.cube);

  
    this.mouse = new THREE.Vector2();
    this.lastMouse = new THREE.Vector2();
  }

  addListeners(): void {
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  onMouseMove(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (this.lastMouse.x && this.lastMouse.y) {
      const dx = this.mouse.x - this.lastMouse.x;
      const dy = this.mouse.y - this.lastMouse.y;

      this.cube.rotation.y -= dx *5;
      this.cube.rotation.x -= dy *5;
    }

    this.lastMouse.x = this.mouse.x;
    this.lastMouse.y = this.mouse.y;

    this.render();
  }

  onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}
