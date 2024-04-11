import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private buttonPressedCallback: (() => void) | null = null;
  buttonMesh!: any;
  floatingHeight = -5;

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
    this.boardGroup.rotation.x = Math.PI / -5; // Rotar todo el grupo del tablero 45 grados en X
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

    this.createMovableCube();

    console.log("Donde aparece el cubo", this.movableCube?.position);
    
    return this.boardGroup;
  }

  placeImagesOnBoard(preguntaActual: any) {
    const boardSize = 100; // El tamaño total del tablero, asumiendo que se mantiene igual que antes
    const numQuadrants = 8; // Número total de cuadrantes, igual que antes
    const quadrantSize = boardSize / Math.sqrt(numQuadrants); // Calcular el tamaño de cada cuadrante

    const images = preguntaActual.respuestas.opciones;
    this.quadrantOptionMap = new Map();

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
    this.boardGroup.position.y = 0;
    this.boardGroup.position.x = 0;
    // Asegúrate de llamar a este método después de configurar la cámara y la escena
    const box = new THREE.Box3().setFromObject(this.boardGroup);
    const center = box.getCenter(new THREE.Vector3());
    this.boardGroup.position.y
    this.boardGroup.position.x += (this.boardGroup.position.x - center.x);
    this.boardGroup.position.y += (this.boardGroup.position.y - center.y + 10);
  }

  //MOVIMIENTO ---------------------------------------------
  createMovableCube() {
    // Asegúrate de que la escena está definida y de que hay cuadrantes sin imágenes
    if (!this.scene || this.quadrantMeshes.length === 0) return;
  
    // Identifica cuadrantes vacíos (sin opción asignada o con opción null)
    let emptyQuadrants = this.quadrantMeshes.filter(q => !this.quadrantOptionMap.get(q));
  
    if (emptyQuadrants.length === 0) {
        console.warn("No hay cuadrantes vacíos disponibles.");
        return; // Termina si no hay cuadrantes vacíos
    }
  
    // Selecciona un cuadrante vacío al azar
    let randomIndex = Math.floor(Math.random() * emptyQuadrants.length);
    let chosenQuadrant = emptyQuadrants[randomIndex];
    console.log("Donde debe aparecer el cubo", chosenQuadrant.position);
    console.log(emptyQuadrants)

    // Crea el cubo móvil
    const geometry = new THREE.BoxGeometry(this.movableCubeWidth, this.movableCubeHeight, this.movableCubeDepth);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF5733 });
    this.movableCube = new THREE.Mesh(geometry, material);
  
    // Ajusta la posición del cubo para centrarlo en el cuadrante elegido
    this.movableCube.position.set(
      chosenQuadrant.position.x,
      chosenQuadrant.position.y + 20,
      chosenQuadrant.position.z // Asegura que el cubo esté ligeramente por encima del tablero
    );

    // Añade el cubo a la escena
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
        // Aquí ajustamos el offset para que su componente y sea siempre el mismo, ignorando la posición de clic en y
        // Manteniendo la altura inicial del cubo constante respecto al "suelo" del tablero
        this.offset = new THREE.Vector3(0, this.floatingHeight, 0); // Asumiendo que `floatingHeight` es la distancia deseada desde el "suelo"
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
  
      // Actualiza el raycaster con la nueva posición del ratón
      this.raycaster.setFromCamera(this.mouse, this.camera);
  
      // Crea un plano que simula la superficie del tablero considerando su rotación
      const planeNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(this.boardGroup.quaternion);
      const boardPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, this.boardGroup.position);
      const intersection = new THREE.Vector3();
      this.raycaster.ray.intersectPlane(boardPlane, intersection);
  
      // Calcula la posición ajustada teniendo en cuenta el desplazamiento y la rotación del tablero
      const adjustedPosition = intersection.sub(this.offset);
      const boardRotationInverse = new THREE.Quaternion().copy(this.boardGroup.quaternion).invert();
      adjustedPosition.applyQuaternion(boardRotationInverse);
  
      // Asegura que el cubo se mantenga dentro de los límites del tablero
      const halfBoardSize = this.boardSize / 2;
      //adjustedPosition.x = Math.max(-halfBoardSize, Math.min(halfBoardSize, adjustedPosition.x));
      //adjustedPosition.y = Math.max(-halfBoardSize, Math.min(halfBoardSize, adjustedPosition.y));

      adjustedPosition.x = Math.max(-halfBoardSize - 19, Math.min(halfBoardSize + 19, adjustedPosition.x));
      adjustedPosition.y = Math.max(-halfBoardSize + 28, Math.min(halfBoardSize - 19, adjustedPosition.y));
  
      // Aplica la rotación del tablero para mantener la consistencia del movimiento con la inclinación
      adjustedPosition.applyQuaternion(this.boardGroup.quaternion);
  
      // Actualiza la posición del objeto seleccionado
      this.selectedObject.position.copy(adjustedPosition);
      if (this.selectedObject) {
        this.checkCubePosition(this.selectedObject.position);
      }
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
    console.log(this.movableCube?.position);
    // Reinicia la selección de opción y el color de todos los cuadrantes
    this.quadrantMeshes.forEach(quadrant => {
      const material = quadrant.material as THREE.MeshBasicMaterial;
      material.color.set(0xffffff); // Color original del cuadrante
    });
    
    this.selectedOption = null; // Reiniciar el índice de la opción seleccionada
  
    for (let i = 0; i < this.quadrantMeshes.length; i++) {
      const quadrant = this.quadrantMeshes[i];
      const bounds = new THREE.Box3().setFromObject(quadrant);
  
      if (bounds.containsPoint(cubePos)) {
        // Comprueba si este cuadrante tiene asociada una opción (imagen)
        if (this.quadrantOptionMap.get(quadrant)) {
          // Cambia el color del cuadrante porque tiene una imagen y el cubo está sobre él
          const material = quadrant.material as THREE.MeshBasicMaterial;
          material.color.set(0xff0000); // Ejemplo: Cambia el color a rojo
        }
        
        this.selectedOption = this.quadrantOptionMap.get(quadrant);
        break; // Asegura que el cubo solo interactúe con el primer cuadrante que encuentre
      }
    }
  }

  clearScene() {
    // Eliminar cuadrantes del tablero y limpiar sus recursos
    this.quadrantMeshes.forEach(quadrantMesh => {
      if (quadrantMesh) {
        quadrantMesh.geometry.dispose();
        if (Array.isArray(quadrantMesh.material)) {
          quadrantMesh.material.forEach(mat => mat.dispose());
        } else {
          (quadrantMesh.material as THREE.Material).dispose();
        }
        this.scene.remove(quadrantMesh); // Asegúrate de remover también el mesh de la escena
      }
    });
    this.quadrantMeshes = []; // Limpiar el arreglo de cuadrantes
  
    // Limpiar el cubo móvil, si existe
    if (this.movableCube) {
      this.scene.remove(this.movableCube); // Remover el cubo de la escena
      this.movableCube.geometry.dispose();
      (this.movableCube.material as THREE.Material).dispose();
      this.movableCube = undefined;
    }
  
    // Limpiar cualquier otra imagen o material asociado a los cuadrantes
    this.quadrantOptionMap.forEach((option, quadrant) => {
      if (option && option.mesh) {
        this.scene.remove(option.mesh); // Asegúrate de remover el mesh de la escena
        option.mesh.geometry.dispose();
        (option.mesh.material as THREE.Material).dispose();
      }
    });
    this.quadrantOptionMap.clear(); // Limpiar el mapa de opciones
  
    // Eliminar todos los objetos del grupo del tablero y limpiar el grupo en sí
    while (this.boardGroup.children.length > 0) {
      let child = this.boardGroup.children[0];
      if ((child as THREE.Mesh).geometry) {
        (child as THREE.Mesh).geometry.dispose();
      }
      if ((child as THREE.Mesh).material) {
        const material = (child as THREE.Mesh).material;
        if (Array.isArray(material)) {
          material.forEach(mat => mat.dispose());
        } else {
          (material as THREE.Material).dispose();
        }
      }
      this.boardGroup.remove(child);
    }

    this.scene.remove(this.boardGroup); // No olvides remover el grupo de la escena
  }
  
}
