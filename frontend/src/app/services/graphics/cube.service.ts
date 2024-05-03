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
  buttonMesh2! : any;

  private buttonPressedCallback: (() => void) | null = null;

  private originalColors: Map<number, THREE.Color | undefined> = new Map();

  private optionsMap: Map<number, any> = new Map();
  selectedOption: any = null;

  isSelected: boolean = false;
  selectedFaceIndex: number | null = null;
  isDragging: boolean = false;
  isDraggingButton: boolean = false;
  previousMousePosition = {
    x: 0,
    y: 0
  };
  inertia = {
    x: 0,
    y: 0
  };

  initialRotationDone: boolean = false;

  handleMouseDown: any;
  handleMouseMove: any;
  handleMouseUp: any;

  constructor() {
    this.handleMouseDown = this.onMouseDown.bind(this);
    this.handleMouseMove = this.onMouseMove.bind(this);
    this.handleMouseUp = this.onMouseUp.bind(this);
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

  initMouseEvents(rendererElement: HTMLElement) {
    rendererElement.addEventListener('mousedown', this.handleMouseDown, false);
    window.addEventListener('mousemove', this.handleMouseMove, false);
    window.addEventListener('mouseup', this.handleMouseUp, false);
  }

  removeMouseEvents(rendererElement: HTMLElement) {
    rendererElement.removeEventListener('mousedown', this.handleMouseDown, false);
    window.removeEventListener('mousemove', this.handleMouseMove, false);
    window.removeEventListener('mouseup', this.handleMouseUp, false);
  }

  public createRotationButton(): void {
    const buttonGeometry = new THREE.CircleGeometry(4, 32); // Radio de 5 y 32 segmentos
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0x4D8B21 }); // Color verde
    this.buttonMesh2 = new THREE.Mesh(buttonGeometry, buttonMaterial);
    this.buttonMesh2.position.set(30, 0, 30); // Posicionado delante del cubo
    this.scene.add(this.buttonMesh2);
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
  
    // Mezclar un arreglo de índices de caras para asegurar una asignación aleatoria
    let faceIndices = [0, 1, 2, 3, 4, 5];
    faceIndices = this.shuffleArray(faceIndices);
  
    // Crear materiales para las imágenes disponibles
    let imageMaterials = preguntaActual.respuestas.opciones.map((option: any) => {
      try {
        const texture = textureLoader.load(option.Imagen);
        return new THREE.MeshBasicMaterial({ map: texture });
      } catch (error) {
        console.error("Error loading texture:", error);
        return null;
      }
    }).filter((material: any) => material !== null);
    
    // Inicializar un arreglo de 6 materiales con blanco como predeterminado
    let materials = new Array(6).fill(null).map(() => new THREE.MeshPhongMaterial({ color: 0xf0ffff }));
  
    // Asignar los materiales de imagen y las respuestas a caras basadas en los índices mezclados
    faceIndices.forEach((faceIndex, index) => {
      if (index < imageMaterials.length) {
        materials[faceIndex] = imageMaterials[index];
        this.optionsMap.set(faceIndex, preguntaActual.respuestas.opciones[index]);
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

    this.createRotationButton()

    //this.resetCubeRotation();
    this.initialCubeAnimation();

    this.cube!.rotation.y = 0;
    this.cube!.rotation.x = 0;

    return this.cube;
  }

  resetCubeRotation(): void {
    //this.cube!.rotation.set(0, 0, 0);
  }

  initialCubeAnimation() {
    this.initialRotationDone = false;
    
    // Objetivos de rotación aleatorios
    const targetRotationY = 0.001 * (Math.random() - 0.5); // Aleatorio entre -π y π
    const targetRotationX = 0.001 * (Math.random() - 0.5); // Aleatorio entre -π y π
    
    // Velocidad de rotación constante (ajuste según necesidad)
    const rotationSpeed = 0.01; // Velocidad constante
    
    // Calcular la cantidad de frames necesarios para alcanzar el objetivo a esta velocidad
    const framesToReachTargetY = Math.abs(targetRotationY / rotationSpeed);
    const framesToReachTargetX = Math.abs(targetRotationX / rotationSpeed);
    
    // Calcula el máximo de frames necesarios para ambas direcciones
    const maxFrames = Math.max(framesToReachTargetY, framesToReachTargetX);
    
    // Calcula los pasos de rotación para igualar la duración en ambas direcciones
    const rotationStepY = targetRotationY / maxFrames;
    const rotationStepX = targetRotationX / maxFrames;
    
    let frames = 0;
    
    const animateInitialRotation = () => {
      if (!this.cube || this.initialRotationDone || frames >= maxFrames) {
        if (!this.initialRotationDone) {
          // Establece inercia basada en la última velocidad de rotación aplicada
          this.inertia.x = rotationStepY;
          this.inertia.y = rotationStepX;
        }
        this.initialRotationDone = true;
        return;
      }
      
      // Aplicar la rotación incrementalmente
      this.cube.rotation.y += rotationStepY;
      this.cube.rotation.x += rotationStepX;
      
      frames++;
      requestAnimationFrame(animateInitialRotation);
    };
    
    animateInitialRotation();
  }


  private onMouseDown(event: MouseEvent): void {
    if (this.isDragging || !this.cube || !this.camera) return;

    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects2 = raycaster.intersectObjects(this.scene.children);
    for (let i = 0; i < intersects2.length; i++) {
      if (intersects2[i].object === this.buttonMesh) {
        this.onButtonPressed();
        break;
      }
    }

    if (intersects2.length > 0 && intersects2[0].object === this.buttonMesh2) {
      this.isDraggingButton = true; // Asume que existe una nueva propiedad isDraggingButton
      this.isDragging = true;
      this.previousMousePosition.x = event.clientX;
      this.previousMousePosition.y = event.clientY;
      return;
      //event.preventDefault(); // Prevenir comportamientos predeterminados del navegador
    }

    if(this.cube !== undefined){
      const intersects = raycaster.intersectObject(this.cube!, true);
    if (intersects.length > 0) {
      this.selectFace(intersects[0]);
      this.isDragging = false;
    } /*else {
      this.isDragging = true;
      this.previousMousePosition.x = event.clientX;
      this.previousMousePosition.y = event.clientY;
      // No resetees la inercia aquí, permitiendo que la inercia se acumule de movimientos previos
    }*/
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
        selectedMaterial.opacity = 0.8;
        selectedMaterial.transparent = true;
  
        // Necesitamos actualizar la propiedad 'needsUpdate' para que los cambios tengan efecto
        selectedMaterial.needsUpdate = true;

        this.isSelected = true;
        this.selectedOption = this.optionsMap.get(this.selectedFaceIndex);
        //console.log('Opción seleccionada:', this.selectedOption);
      }
    }
  }

  private onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.isDraggingButton) {
      const deltaX = event.clientX - this.previousMousePosition.x;
      const deltaY = event.clientY - this.previousMousePosition.y;

      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
  
      // Ahora necesitamos convertir estas coordenadas normalizadas del espacio de clip
      // a coordenadas del mundo. Para hacerlo, usamos un truco con el raycaster.
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);
  
      // Asumimos que el botón se mueve en un plano paralelo a la cámara,
      // por lo que tomamos un punto en este plano (z fijo) para calcular su posición en el mundo.
      // El valor de 'z' debería ser el mismo que el inicial de buttonMesh2 para mantenerlo en el mismo plano.
      const zPos = this.buttonMesh2.position.z;
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), -zPos);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, intersectPoint);
  
      // Actualizar la posición de buttonMesh2 con la posición calculada
      this.buttonMesh2.position.x = intersectPoint.x;
      this.buttonMesh2.position.y = intersectPoint.y;

      if (deltaX !== 0 || deltaY !== 0) {
        // Solo actualiza la inercia si hubo un movimiento significativo
        const rotationSpeed = 0.005;
        this.inertia.x = deltaX * rotationSpeed;
        this.inertia.y = deltaY * rotationSpeed;
      }
  
      this.cube!.rotation.y += this.inertia.x;
      this.cube!.rotation.x += this.inertia.y;
  
      this.previousMousePosition.x = event.clientX;
      this.previousMousePosition.y = event.clientY;
    }
  }
  
  

  private onMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
      this.isDragging = false;
    }
    if (this.isDraggingButton) {
      this.isDraggingButton = false;
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
      this.buttonMesh2.geometry.dispose();
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
      this.scene.remove(this.buttonMesh2);
  
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

  public updateCubeRotation() {
    if (!this.cube) return;
  
    ////console.log(this.cube.rotation);
    // Aplicar inercia a la rotación del cubo
    this.cube.rotation.y += this.inertia.x;
    this.cube.rotation.x += this.inertia.y;
    
    ////console.log(this.inertia);
    // Reducir la inercia gradualmente
    this.inertia.x *= 0.99; // Ajusta este valor según necesites
    this.inertia.y *= 0.99;
  }
}

