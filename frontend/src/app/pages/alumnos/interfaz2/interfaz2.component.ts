import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
@Component({
  selector: 'app-interfaz2',
  templateUrl: './interfaz2.component.html',
  styleUrls: ['./interfaz2.component.css']
})
export class Interfaz2Component implements OnInit {
  private camera: any
  private renderer: any
  private scene: any
  private controls: any;
  private dcontrols: any;
  private raycaster:any;
  private clickMouse: any;
  private moveMouse: THREE.Vector2 = new THREE.Vector2(); 
  private draggable:any;
  private cylinder : any;
  private box : any;
  private sphere : any;
  private draggableObjects: any; 
  
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.initScene();
    this.addResizeHandler();
    this.animate();
  }

  private initScene() {
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
    this.camera.position.set(-35, 70, 100);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    this.elementRef.nativeElement.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbfd1e5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.draggableObjects = [];

    this.raycaster = new THREE.Raycaster();

    this.createFloor();
    this.createBox();
    this.createSphere();
    this.createCylinder();

    this.addLights();

    this.dcontrols = new DragControls(this.draggableObjects, this.camera, this.renderer.domElement);
    this.dcontrols.addEventListener('dragstart', () => {
      this.controls.enabled = false;
    });
    this.dcontrols.addEventListener('dragend', () => {
      this.controls.enabled = true;
    });
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

  private createCylinder() {
    let radius = 4;
    let height = 6
    let pos = { x: -15, y: height / 2, z: 15 };

    let cylinder = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 32),
      new THREE.MeshPhongMaterial({ color: 0x90ee90 }))
    cylinder.position.set(pos.x, pos.y, pos.z)
    cylinder.castShadow = true
    cylinder.receiveShadow = true
    this.cylinder = cylinder;
    this.scene.add(cylinder)
    this.draggableObjects.push(cylinder); // Agrega el cilindro a la lista de objetos arrastrables
  }

  private createSphere() {
    let radius = 4;
    let pos = { x: 15, y: radius, z: -15 };

    let sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x43a1f4 }))
    sphere.position.set(pos.x, pos.y, pos.z)
    sphere.castShadow = true
    sphere.receiveShadow = true
    this.sphere = sphere;
    this.scene.add(sphere)
    this.draggableObjects.push(sphere);
  
  }

  private createBox() {
    let scale = { x: 6, y: 6, z: 6 }
    let pos = { x: 15, y: scale.y / 2, z: 15 }

    let box = new THREE.Mesh(new THREE.BoxGeometry(),
      new THREE.MeshPhongMaterial({ color: 0xDC143C }));
    box.position.set(pos.x, pos.y, pos.z);
    box.scale.set(scale.x, scale.y, scale.z);
    box.castShadow = true;
    box.receiveShadow = true;
    this.box = box;
    this.scene.add(box)
    this.draggableObjects.push(box); 
  }
  private createFloor() {
    let pos = { x: 0, y: -1, z: 3 };
    let scale = { x: 100, y: 2, z: 100 };

    let blockPlane = new THREE.Mesh(new THREE.BoxGeometry(),
      new THREE.MeshPhongMaterial({ color: 0xf9c834 }));
    blockPlane.position.set(pos.x, pos.y, pos.z);
    blockPlane.scale.set(scale.x, scale.y, scale.z);
    blockPlane.castShadow = true;
    blockPlane.receiveShadow = true;
    this.scene.add(blockPlane);

  }
  private addLights() {
    // Luz ambiental
    const hemiLight = new THREE.AmbientLight(0xffffff, 0.20); // Color, Intensidad
    this.scene.add(hemiLight);

    // Luz direccional
    const dirLight = new THREE.DirectionalLight(0xffffff, 1); // Color, Intensidad
    dirLight.position.set(-30, 50, -30); // Posición
    this.scene.add(dirLight);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.left = -70;
    dirLight.shadow.camera.right = 70;
    dirLight.shadow.camera.top = 70;
    dirLight.shadow.camera.bottom = -70;
  }

  private animate() {
    const animate = () => {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(animate);
    };

    animate();
  }
  
}
