import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CubeService {
  cube!: THREE.Mesh | undefined;
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  buttonMesh!: any;

  private buttonPressedCallback: (() => void) | null = null;

  private optionsMap: Map<number, any> = new Map();
  selectedOption: any = null;

  isSelected: boolean = false;
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

  constructor() {}

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

  public setCamera(camera: THREE.PerspectiveCamera): void {
    this.camera = camera;
  }

  public getCamera(){
    return this.camera;
  }

  public setScene (scene: THREE.Scene): void {
    this.scene = scene;
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
    this.optionsMap = new Map();
  
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
        this.optionsMap.set(faceIndices[index], preguntaActual.respuestas.opciones[index]);
      }
    });
  
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

    // Establece la rotación inicial del cubo para que una cara esté orientada hacia la cámara
    this.resetCubeRotation();

    return this.cube;
  }

  resetCubeRotation(): void {
    this.cube!.rotation.set(0, 0, 0);
  }


  private onMouseDown(event: MouseEvent): void {
    if (this.isDragging || !this.cube || !this.camera) return;

    // Convertir la posición del mouse a coordenadas normalizadas (-1 a 1)
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    // Usar Raycaster para encontrar intersecciones
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObject(this.cube!, true);
    if (intersects.length > 0) {
      this.selectFace(intersects[0]);
      this.isDragging = false;
    } else {
      this.isDragging = true;
      this.previousMousePosition.x = event.clientX;
      this.previousMousePosition.y = event.clientY;
      this.inertia.x = 0;
      this.inertia.y = 0;
    }

    const intersects2 = raycaster.intersectObjects(this.scene.children);
    for (let i = 0; i < intersects2.length; i++) {
      if (intersects2[i].object === this.buttonMesh) {
        this.onButtonPressed();
        break;
      }
    }
  }

  private selectFace(intersect: THREE.Intersection): void {
    if (intersect.faceIndex !== undefined) {
      const faceMaterialIndex = Math.floor(intersect.faceIndex / 2); // Cada cara tiene 2 triángulos
      const selectedMaterial = (this.cube!.material as THREE.MeshBasicMaterial[])[faceMaterialIndex];
      
      if (this.selectedFaceIndex !== null && selectedMaterial.map) {
        const prevMaterial = (this.cube!.material as THREE.MeshBasicMaterial[])[this.selectedFaceIndex];
        if (prevMaterial.map) { // Solo restablecer si había una imagen
          prevMaterial.opacity = 1;
          prevMaterial.transparent = false;
          prevMaterial.needsUpdate = true;
        }
      }

      // Verificar si la cara seleccionada tiene una imagen antes de resaltar
      if (selectedMaterial.map) {
        this.selectedFaceIndex = faceMaterialIndex;
  
        // Cambiar la opacidad del material de la cara seleccionada para dar un efecto de resaltado
        selectedMaterial.opacity = 0.5;
        selectedMaterial.transparent = true;
  
        // Necesitamos actualizar la propiedad 'needsUpdate' para que los cambios tengan efecto
        selectedMaterial.needsUpdate = true;

        this.isSelected = true;
        this.selectedOption = this.optionsMap.get(this.selectedFaceIndex);
        console.log('Opción seleccionada:', this.selectedOption);
      }
    }
  }

  private onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.previousMousePosition.x;
      const deltaY = event.clientY - this.previousMousePosition.y;

      const rotationSpeed = 0.007;

      this.cube!.rotation.y += deltaX * rotationSpeed;
      this.cube!.rotation.x += deltaY * rotationSpeed;

      this.previousMousePosition.x = event.clientX;
      this.previousMousePosition.y = event.clientY;
    }
  }

  private onMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
      this.isDragging = false;
    }
  }

  public getisSelected(){
    return this.isSelected
  }

  public setisSelected(yeah: boolean) {
    this.isSelected = yeah;
  }

  public getSelectedOption() {
    return this.selectedOption;
  }

  public setnullSelectedOption() {
    this.selectedOption = null;
  }

  clearScene(){
    if (this.cube) {
      // Limpiar geometría
      this.cube.geometry.dispose();
  
      // Limpiar materiales y texturas
      if (Array.isArray(this.cube.material)) {
        (this.cube.material as THREE.Material[]).forEach(material => {
          material.dispose(); // Limpiar material
        });
      } else {
        this.cube.material.dispose(); // Limpiar material si no es un array
      }
  
      // Remover el cubo de la escena
      this.scene.remove(this.cube);
  
      // Eliminar la referencia al cubo
      this.cube = undefined;
    }
  
    // Limpiar el mapa de opciones
    this.optionsMap.clear();
  
    // Restablecer otras propiedades relevantes
    this.selectedOption = null;
    this.isSelected = false;
    this.selectedFaceIndex = null;
    this.isDragging = false;
  }
}

