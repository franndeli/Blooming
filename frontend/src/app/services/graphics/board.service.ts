import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private buttonPressedCallback: (() => void) | null = null;
  buttonMesh!: any;

  boardGroup: THREE.Group;
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  textureLoader = new THREE.TextureLoader();
  quadrantMeshes: THREE.Mesh[] = [];
  quadrantHasImage: Map<THREE.Mesh, boolean> = new Map();
  quadrantOptionMap: Map<THREE.Mesh, any> = new Map();

  selectedOption: any | null = null;

  boardSize = 130;
  numQuadrants = 8; // 8 cuadrantes
  quadrantSize = this.boardSize / Math.sqrt(this.numQuadrants); 

  //Movimiento
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  selectedObject?: THREE.Mesh;
  isDragging = false;
  movableCube?: THREE.Mesh;

  movableCubeWidth = 15;
  movableCubeHeight = 15;
  movableCubeDepth = 5;

  offset!: THREE.Vector3;

  constructor() {
    this.boardGroup = new THREE.Group();
    this.boardGroup.rotation.x = Math.PI / -4.2; // Rotar todo el grupo del tablero 45 grados en X
  }

  initMouseEvents(rendererElement: HTMLElement) {
    rendererElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  }

  removeMouseEvents(rendererElement: HTMLElement) {
    rendererElement.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
  }

  public setButtonPressedCallback(callback: () => void): void {
    this.buttonPressedCallback = callback;
  }

  private onButtonPressed(): void {
    if (this.buttonPressedCallback) {
      this.buttonPressedCallback();
    }
  }

  public setButtonMesh(mesh: THREE.Mesh): void {
    this.buttonMesh = mesh;
  }  

  public setCamera(camera: THREE.PerspectiveCamera): void {
    this.camera = camera;
  }

  public setScene(scene: THREE.Scene): void {
    this.scene = scene;
  }

  initBoard(preguntaActual: any) {
    const boardSize = 130; // Tamaño total del tablero
    const numQuadrants = 8; // 8 cuadrantes
    const quadrantSize = boardSize / Math.sqrt(numQuadrants); // Tamaño de cada cuadrante

    let quadrantCenters = this.calculateQuadrantCenters(quadrantSize);
    
    quadrantCenters.forEach((center) => {
      const geometry = new THREE.PlaneGeometry(quadrantSize, quadrantSize);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
      const quadrantMesh = new THREE.Mesh(geometry, material);
      
      quadrantMesh.position.set(center.x, center.y, 0);
      this.boardGroup.add(quadrantMesh);
      this.quadrantMeshes.push(quadrantMesh);
    });

    this.placeImagesOnBoard(preguntaActual);
    this.adjustBoardPosition();

    this.createMovableCube(quadrantSize);

    return this.boardGroup;
  }

  placeImagesOnBoard(preguntaActual: any) {
    const boardSize = 100; // El tamaño total del tablero, asumiendo que se mantiene igual que antes
    const numQuadrants = 8; // Número total de cuadrantes, igual que antes
    const quadrantSize = boardSize / Math.sqrt(numQuadrants); // Calcular el tamaño de cada cuadrante

    const images = preguntaActual.respuestas.opciones;

    // Barajar los cuadrantes para asignar las imágenes de manera aleatoria
    let shuffledQuadrants = this.shuffleArray([...this.quadrantMeshes]);
    this.quadrantMeshes.forEach(quadrant => this.quadrantOptionMap.set(quadrant, null)); // Inicializar todos los cuadrantes sin opción

    shuffledQuadrants.forEach((quadrant, index) => {
      if (index < images.length) {
        const texture = this.textureLoader.load(images[index].Imagen);
        const imgMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const imgGeometry = new THREE.PlaneGeometry(quadrantSize, quadrantSize);
        const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);

        imgMesh.position.copy(quadrant.position);
        imgMesh.position.z = 0.1; // Para asegurarnos de que la imagen quede por encima del cuadrante
        this.boardGroup.add(imgMesh);

        this.quadrantOptionMap.set(quadrant, preguntaActual.respuestas.opciones[index]);
      }
    });
  }

  calculateQuadrantCenters(quadrantSize: number) {
    const centers = [];
    const halfBoardSize = 100 / 2; // La mitad del tamaño del tablero
    
    for (let row = 0; row < 2; row++) { // Dos filas
      for (let col = 0; col < 4; col++) { // Cuatro columnas
        centers.push(new THREE.Vector3(
          col * quadrantSize - halfBoardSize + quadrantSize / 2, 
          row * quadrantSize - halfBoardSize + quadrantSize / 2, 
          0
        ));
      }
    }
    return centers;
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  adjustBoardPosition(): void {
    // Asegúrate de llamar a este método después de configurar la cámara y la escena
    const box = new THREE.Box3().setFromObject(this.boardGroup);
    const center = box.getCenter(new THREE.Vector3());
    this.boardGroup.position.x += (this.boardGroup.position.x - center.x);
    this.boardGroup.position.y += (this.boardGroup.position.y - center.y + 10);
  }

  //MOVIMIENTO ---------------------------------------------
  createMovableCube(quadrantSize: number) {
    // Crear un rectángulo con las dimensiones especificadas
    const geometry = new THREE.BoxGeometry(this.movableCubeWidth, this.movableCubeHeight, this.movableCubeDepth);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF5733 });
    this.movableCube = new THREE.Mesh(geometry, material);
  
    // Posicion inicial en el eje y para que esté en la parte superior del cuadrante
    this.movableCube.position.y = this.quadrantSize / 2 + this.movableCubeHeight / 2;
    this.scene.add(this.movableCube);
  }
  

  onMouseDown(event: MouseEvent) {
    // Calcula la posición del ratón en coordenadas normalizadas (-1 a +1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
    this.raycaster.setFromCamera(this.mouse, this.camera);
  
    if (this.movableCube) {
      const intersects = this.raycaster.intersectObject(this.movableCube);
      if (intersects.length > 0) {
        this.selectedObject = intersects[0].object as THREE.Mesh;
        this.isDragging = true;
        this.offset = intersects[0].point.sub(this.selectedObject.position);
      }
    }

    const intersects2 = this.raycaster.intersectObjects(this.scene.children);
    for (let i = 0; i < intersects2.length; i++) {
      if (intersects2[i].object === this.buttonMesh) {
        this.onButtonPressed();
        break;
      }
    }
  }
  
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.selectedObject) {
      // Actualiza la posición del ratón
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      // Actualiza el raycaster
      this.raycaster.setFromCamera(this.mouse, this.camera);
  
      // Crea un plano paralelo al tablero y calcula la intersección
      const planeNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(this.boardGroup.quaternion);
      const boardPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, this.boardGroup.position);
      const intersection = new THREE.Vector3();
      this.raycaster.ray.intersectPlane(boardPlane, intersection);
  
      // Mueve el objeto seleccionado a la intersección, ajustado por el offset inicial
      this.selectedObject.position.copy(intersection.sub(this.offset));
  
      // Restringe el movimiento del objeto a los límites del tablero
      this.selectedObject.position.clamp(
        new THREE.Vector3(-this.boardSize, this.selectedObject.position.y, -this.boardSize),
        new THREE.Vector3(this.boardSize, this.selectedObject.position.y, this.boardSize)
      );

      this.checkCubePosition(this.selectedObject.position);
    }
  }
  
  onMouseUp(event: MouseEvent) {
    // Deja de arrastrar el objeto
    if (this.isDragging) {
      this.isDragging = false;
      this.selectedObject = undefined;
    }
  }
  
  checkCubePosition(cubePos: THREE.Vector3) {
    this.selectedOption = null; // Reiniciar el índice de la opción seleccionada

    for (let i = 0; i < this.quadrantMeshes.length; i++) {
      const quadrant = this.quadrantMeshes[i];
      const bounds = new THREE.Box3().setFromObject(quadrant);

      if (bounds.containsPoint(cubePos)) {
          // Comprobar si este cuadrante tiene asociada una opción
          this.selectedOption = this.quadrantOptionMap.get(quadrant);
          if (this.selectedOption) {
              //console.log(option);
              break; // No necesitas seguir buscando una vez que encuentres la opción
          }
      }
    }
  }

  clearScene() {
    // Primero, vamos a eliminar todos los cuadrantes del tablero.
    this.quadrantMeshes.forEach((quadrantMesh) => {
      if (quadrantMesh) {
        this.scene.remove(quadrantMesh);
        quadrantMesh.geometry.dispose();
        if (Array.isArray(quadrantMesh.material)) {
          quadrantMesh.material.forEach((mat) => mat.dispose());
        } else {
          (quadrantMesh.material as THREE.Material).dispose();
        }
      }
    });
    this.quadrantMeshes = []; // Limpiar el arreglo de cuadrantes
  
    // A continuación, si hay un cubo móvil, lo eliminaremos de la misma manera.
    if (this.movableCube) {
      this.scene.remove(this.movableCube);
      this.movableCube.geometry.dispose();
      if (Array.isArray(this.movableCube.material)) {
        this.movableCube.material.forEach((mat) => mat.dispose());
      } else {
        (this.movableCube.material as THREE.Material).dispose();
      }
      this.movableCube = undefined; // Limpiar la referencia al cubo móvil
    }
  
    // También eliminamos cualquier imagen o material restante asociado a los cuadrantes.
    this.quadrantOptionMap.forEach((option, quadrant) => {
      // Asumiendo que cada 'option' podría tener una propiedad 'mesh' que es una imagen en el tablero.
      if (option && option.mesh) {
        this.scene.remove(option.mesh);
        option.mesh.geometry.dispose();
        (option.mesh.material as THREE.Material).dispose();
      }
    });
    this.quadrantOptionMap.clear(); // Limpiar el mapa de opciones
    this.selectedOption = undefined;
  }
}
