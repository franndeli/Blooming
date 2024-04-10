import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardGroup: THREE.Group;
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  textureLoader = new THREE.TextureLoader();
  quadrantMeshes: THREE.Mesh[] = [];

  constructor() {
    this.boardGroup = new THREE.Group();
    this.boardGroup.rotation.x = Math.PI / -4.2; // Rotar todo el grupo del tablero 45 grados en X
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
    return this.boardGroup;
  }

  placeImagesOnBoard(preguntaActual: any) {
    const boardSize = 100; // El tamaño total del tablero, asumiendo que se mantiene igual que antes
    const numQuadrants = 8; // Número total de cuadrantes, igual que antes
    const quadrantSize = boardSize / Math.sqrt(numQuadrants); // Calcular el tamaño de cada cuadrante

    const images = preguntaActual.respuestas.opciones;

    // Barajar los cuadrantes para asignar las imágenes de manera aleatoria
    let shuffledQuadrants = this.shuffleArray([...this.quadrantMeshes]);

    shuffledQuadrants.forEach((quadrant, index) => {
      if (index < images.length) {
        const texture = this.textureLoader.load(images[index].Imagen);
        const imgMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const imgGeometry = new THREE.PlaneGeometry(quadrantSize, quadrantSize);
        const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);

        imgMesh.position.copy(quadrant.position);
        imgMesh.position.z = 0.1; // Para asegurarnos de que la imagen quede por encima del cuadrante
        this.boardGroup.add(imgMesh);
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
  
}
