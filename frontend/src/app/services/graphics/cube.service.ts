import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CubeService {
  cube!: THREE.Mesh;
  selectedFaceIndex: number | null = null;
  isDragging: boolean = false;
  previousMousePosition = {
    x: 0,
    y: 0
  };
  inertia = {
    x: 0,
    y: 0
  };

  constructor() {
  }

  initMouseEvents(rendererElement: HTMLElement, cube: THREE.Mesh) {
    rendererElement.addEventListener('mousedown', (event) => this.onMouseDown(event, cube), false);
    window.addEventListener('mousemove', (event) => this.onMouseMove(event, cube), false);
    window.addEventListener('mouseup', (event) => this.onMouseUp(event, cube), false);
  }

  removeMouseEvents(rendererElement: HTMLElement) {
    rendererElement.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
  }

  // Función para mezclar un array de manera aleatoria (algoritmo de Fisher-Yates)
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createCubeMaterials(preguntaActual: any) {
    const textureLoader = new THREE.TextureLoader();
  
    // Primero, mezclar un arreglo de índices de caras para asegurar una asignación aleatoria
    let faceIndices = [0, 1, 2, 3, 4, 5];
    faceIndices = this.shuffleArray(faceIndices);
  
    // Luego, crear materiales para las imágenes disponibles
    let imageMaterials = preguntaActual.respuestas.opciones.map((option: any) => {
      try {
        const texture = textureLoader.load(option.Imagen);
        return new THREE.MeshBasicMaterial({ map: texture });
      } catch (error) {
        console.error("Error loading texture:", error);
        return null;
      }
    }).filter((material: any) => material !== null);
  
    // Mezclar los materiales de las imágenes de manera aleatoria
    imageMaterials = this.shuffleArray(imageMaterials);
  
    // Inicializar un arreglo de 6 materiales con blanco como predeterminado
    let materials = new Array(6).fill(null).map(() => new THREE.MeshPhongMaterial({ color: 0xf0ffff }));
  
    // Asignar los materiales de imagen a caras aleatorias basadas en los índices mezclados
    imageMaterials.forEach((material: any, index: any) => {
      if (index < faceIndices.length) {
        materials[faceIndices[index]] = material;
      }
    });
  
    console.log(materials);
    return materials;
  }

  configureCube(preguntaActual: any): THREE.Mesh {
    const cubeSize = 30;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  
    // Obtener los materiales creados con las imágenes de las opciones
    const materials = this.createCubeMaterials(preguntaActual);
    
    // Si creas un nuevo cubo cada vez, simplemente usa los materiales aquí
    if (this.cube) {
      // Si el cubo ya existe, actualiza sus materiales
      this.cube.material = materials;
    } else {
      // Si el cubo no existe, créalo y añádelo a la escena
      this.cube = new THREE.Mesh(geometry, materials);
    }

    return this.cube;
  }

  onMouseDown(event: MouseEvent, cube: THREE.Mesh): void {
    if (event.button === 0) {
      this.isDragging = true;
      this.previousMousePosition.x = event.clientX;
      this.previousMousePosition.y = event.clientY;
      this.inertia.x = 0;
      this.inertia.y = 0;
    }
  }

  
  onMouseMove(event: MouseEvent, cube: THREE.Mesh): void {
    if (this.isDragging) {
      const deltaX = event.clientX - this.previousMousePosition.x;
      const deltaY = event.clientY - this.previousMousePosition.y;
  
      // Ajusta la velocidad de rotación aquí si es necesario
      const rotationSpeed = 0.005;
  
      this.cube.rotation.y += deltaX * rotationSpeed;
      this.cube.rotation.x += deltaY * rotationSpeed;
  
      // Actualizar la inercia basada en el movimiento del ratón
      this.inertia.x = deltaX * rotationSpeed;
      this.inertia.y = deltaY * rotationSpeed;
  
      this.previousMousePosition.x = event.clientX;
      this.previousMousePosition.y = event.clientY;
    }
  }

  onMouseUp(event: MouseEvent, cube: THREE.Mesh): void {
    if (event.button === 0) {
      this.isDragging = false;
      // Iniciar la disminución de la velocidad de rotación (inercia)
      //this.applyInertia();
    }
  }
}
