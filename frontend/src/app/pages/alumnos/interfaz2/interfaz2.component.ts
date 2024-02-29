import { Component, ElementRef, OnInit, HostListener, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-interfaz2',
  templateUrl: './interfaz2.component.html',
  styleUrls: ['./interfaz2.component.css']
})
export class Interfaz2Component implements OnInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private camera: any;
  private renderer: any;
  private scene: any;
  private controls: any;
  private raycaster: any;
  private clickMouse: any;
  private moveMouse: THREE.Vector2 = new THREE.Vector2();
  private draggable: any;

  constructor() { }

  ngOnInit() {
    this.initScene();
    this.addResizeHandler();
    this.animate();
  }

  private initScene() {
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
    this.camera.position.set(0, 70, 100);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbfd1e5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();

    this.createFloor();
    this.createCylinder();
    this.addLights();
  }

  private addResizeHandler() {
    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);
  }

  private createCylinder() {
    let radius = 4;
    let height = 6;
    let pos = { x: -15, y: height / 2, z: 15 };

    let cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    let cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x90ee90 });
    this.draggable = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    this.draggable.position.set(pos.x, pos.y, pos.z);
    this.draggable.castShadow = true;
    this.draggable.receiveShadow = true;
    this.draggable.userData.draggable = true;
    this.scene.add(this.draggable);
  }

  private createFloor() {
    let pos = { x: 0, y: 0, z: 0 };
    let scale = { x: 80, y: 2, z: 80 };

    let blockPlane = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshPhongMaterial({ color: 0xf9c834 }));
    blockPlane.position.set(pos.x, pos.y, pos.z);
    blockPlane.scale.set(scale.x, scale.y, scale.z);
    blockPlane.castShadow = true;
    blockPlane.receiveShadow = true;

    this.scene.add(blockPlane);
  }

  private addLights() {
    const hemiLight = new THREE.AmbientLight(0xffffff, 0.20);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-30, 50, -30);
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

  private intersect(mousePosition: THREE.Vector2) {
    this.raycaster.setFromCamera(mousePosition, this.camera);
    return this.raycaster.intersectObjects(this.scene.children, true);
  }

  private dragObject() {
    if (this.draggable) {
      const intersection = this.intersect(this.moveMouse)[0];
      if (intersection) {
        const target = intersection.point;
        const currentPosition = this.draggable.position.clone();
        const movementVector = target.clone().sub(currentPosition);
        // Normaliza el vector de movimiento para garantizar una distancia constante
        movementVector.normalize();
        // Define la distancia máxima que el cilindro puede moverse en una sola iteración
        const maxDistance = 1; // Puedes ajustar este valor según sea necesario
        // Multiplica el vector normalizado por la distancia máxima
        movementVector.multiplyScalar(maxDistance);
        // Establece la nueva posición del cilindro sumando el vector de movimiento a la posición actual
        this.draggable.position.add(movementVector);
      }
    }
  }
  
  

  @HostListener('click', ['$event'])
  onMouseClick(event: MouseEvent) {
    const mousePosition = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const intersection = this.intersect(mousePosition)[0];
    if (intersection && intersection.object.userData.draggable) {
      this.draggable = intersection.object;
    } else {
      this.draggable = null;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.dragObject();
  }
}
