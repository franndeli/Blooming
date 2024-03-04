import { Component, ElementRef, OnInit, HostListener, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { AnimationMixer, AnimationAction, Group } from 'three';
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
  private quadrant: number; // Variable para almacenar el cuadrante actual
  private avatar: any;
  constructor() { 
    this.quadrant = 0; 
  }

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
     // Cargar el video y crear la textura
    const video = document.createElement('video');
    video.src = '../assets/images/threejs/gradiente.mp4';
    video.loop = true;
    video.muted = true;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    
    // Crear un plano que cubra toda la escena
    const planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    const planeMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.z = -100; // Coloca el plano detrás de los otros objetos
    this.scene.add(planeMesh);

   // this.scene.background = new THREE.Color(0xbfd1e5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();

    this.createFloor();
 //   this.createCylinder();
    this.addLights();
    this.loadAvatar();
  }

  private addResizeHandler() {
    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);
  }
/*
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
*/
  private loadAvatar() {
    const loader = new FBXLoader();

    // ruta archivos
    loader.setPath('../assets/images/threejs/');

    loader.load('bolita_avatar.fbx', (fbx: Group) => {

      if (fbx instanceof Group) {
        fbx.scale.setScalar(0.04);
        fbx.position.set(-1, -3.3, 0);
        fbx.rotation.set(0, -Math.PI/2, 0);
        //fbx.rotation.set(-Math.PI / 6, 0, 0); // Rotación en el eje X
        this.draggable= fbx;
        this.draggable.userData.draggable = true;
        this.scene.add(this.draggable);

      } else {
        console.error('El modelo cargado no es una instancia de THREE.Group.');
      }
    });
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
    const hemiLight = new THREE.AmbientLight(0xffffff, 0.80);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
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
  
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const mousePosition = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const intersection = this.intersect(mousePosition)[0];
    if (intersection) {
     // this.draggable = this.createCylinder();
     console.log("objeto movido a un cuadrante");
      const target = intersection.point;
      this.draggable.position.set(target.x, this.draggable.position.y, target.z);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.draggable) {
      const mousePosition = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      const intersection = this.intersect(mousePosition)[0];
      if (intersection) {
        const target = intersection.point;
        this.draggable.position.set(target.x, this.draggable.position.y, target.z);
      }
    }
  }

@HostListener('mouseup')
onMouseUp() {
  // Determina el cuadrante cuando se suelta el objeto
  if (this.draggable) {
    const x = this.draggable.position.x;
    const z = this.draggable.position.z;
    this.draggable = null;
    // Determina el cuadrante basado en las coordenadas
    if (x < 0 && z < 0) {
      this.quadrant = 3;
    } else if (x >= 0 && z < 0) {
      this.quadrant = 4;
    } else if (x < 0 && z >= 0) {
      this.quadrant = 2;
    } else {
      this.quadrant = 1;
    }

    console.log('Cuadrante:', this.quadrant);
  }
 
}

}
