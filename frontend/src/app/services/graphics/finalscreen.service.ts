import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { GlobalStateService } from './helpers/globalstate.service';

@Injectable({
  providedIn: 'root'
})
export class FinalScreenService {
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;

    textMesh!: THREE.Mesh;

    private clock = new THREE.Clock();
    private isAnimating: boolean = true;

    nextQuestionTextMesh!: THREE.Mesh;

    private countdownTextMesh!: THREE.Mesh;

    public isTimeToShow: boolean = true;
    public countdownTime: number = 3600;
  
    constructor(
        private globalStateService: GlobalStateService
    ) {}
  
    public initialize(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;
      this.showFinalMessage();
      this.animate();
    }
  
    public showFinalMessage(): void {
      const loader = new FontLoader();
      loader.load('../../../../assets/fonts/helvetiker_regular.typeface.json', (font) => { // Cambiado a una fuente redondeada
        const textGeometry = new TextGeometry('¡Muy bien, vuelve mañana a por más!', {
          font: font,
          size: 6,
          height: 1,
          depth: 1,
          curveSegments: 32,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.1,
          bevelSegments: 5
        }); 
  
        textGeometry.computeBoundingBox();
  
        this.createTextMesh(textGeometry);

        const nextQuestionGeometry = new TextGeometry('Próximo cuestionario en:', {
            font: font,
            size: 10, // Tamaño más pequeño para el segundo mensaje
            height: 1,
            depth: 0.2,
            curveSegments: 32,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.02,
            bevelSegments: 5
          });

        nextQuestionGeometry.computeBoundingBox();

        this.createTextMesh2(nextQuestionGeometry);
      });
    }

  createTextMesh(textGeometry: any) {
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    const textHeight = textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;

    // Obtener las dimensiones del canvas
    const canvasWidth = this.renderer.domElement.clientWidth;
    const canvasHeight = this.renderer.domElement.clientHeight;

    // Definir el área máxima que el texto debe ocupar como porcentaje del tamaño del canvas
    const maxWidth = canvasWidth * 0.14 ;
    const maxHeight = canvasHeight * 0.015 ;

    // Calcular la escala necesaria para ajustar el texto dentro del área definida
    const scaleX = maxWidth / textWidth;
    const scaleY = maxHeight / textHeight;
    const scale = Math.min(scaleX, scaleY);

    // Crear y añadir el objeto de texto a la escena
    const textMaterial = new THREE.MeshStandardMaterial({
        color: 0x156289 // Este color cambiará, así que es sólo inicial
    });

    if(this.textMesh === undefined){
        this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
        this.scene.add(this.textMesh);
    } else {
        // Si el textMesh ya existe, actualiza su geometría y material
        this.textMesh.geometry.dispose(); // Disponer la geometría anterior para evitar fugas de memoria
        this.textMesh.geometry = textGeometry;
        this.textMesh.material = textMaterial;
    }
  
    // Ajustar la escala del texto para que se ajuste correctamente
    this.textMesh.scale.set(scale, scale, 1);

    // Ajustar la posición del texto para centrarlo horizontalmente y fijar la altura vertical
    this.textMesh.position.x = -0.5 * textWidth * scale; // Centra el texto horizontalmente
    const fixedHeight = 30; // Altura fija para la posición 'y' del texto
    this.textMesh.position.y = fixedHeight; // Usar una altura fija en lugar de calcularla
    this.textMesh.position.z = 0;
  }

  createTextMesh2(nextQuestionGeometry: any) {
    const textWidth = nextQuestionGeometry.boundingBox.max.x - nextQuestionGeometry.boundingBox.min.x;
    const textHeight = nextQuestionGeometry.boundingBox.max.y - nextQuestionGeometry.boundingBox.min.y;

    // Obtener las dimensiones del canvas
    const canvasWidth = this.renderer.domElement.clientWidth;
    const canvasHeight = this.renderer.domElement.clientHeight;

    // Definir el área máxima que el texto debe ocupar como porcentaje del tamaño del canvas
    const maxWidth = canvasWidth * 0.07 ;
    const maxHeight = canvasHeight * 0.015 ;

    // Calcular la escala necesaria para ajustar el texto dentro del área definida
    const scaleX = maxWidth / textWidth;
    const scaleY = maxHeight / textHeight;
    const scale = Math.min(scaleX, scaleY);

    // Crear y añadir el objeto de texto a la escena
    const textMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000 // Este color cambiará, así que es sólo inicial
    });

    if(this.nextQuestionTextMesh === undefined){
        this.nextQuestionTextMesh = new THREE.Mesh(nextQuestionGeometry, textMaterial);
        this.scene.add(this.nextQuestionTextMesh);
    } else {
        // Si el nextQuestionTextMesh ya existe, actualiza su geometría y material
        this.nextQuestionTextMesh.geometry.dispose(); // Disponer la geometría anterior para evitar fugas de memoria
        this.nextQuestionTextMesh.geometry = nextQuestionGeometry;
        this.nextQuestionTextMesh.material = textMaterial;
    }
  
    // Ajustar la escala del texto para que se ajuste correctamente
    this.nextQuestionTextMesh.scale.set(scale, scale, 1);

    // Ajustar la posición del texto para centrarlo horizontalmente y fijar la altura vertical
    this.nextQuestionTextMesh.position.x = -0.5 * textWidth * scale; // Centra el texto horizontalmente
    const fixedHeight = 10; // Altura fija para la posición 'y' del texto
    this.nextQuestionTextMesh.position.y = fixedHeight; // Usar una altura fija en lugar de calcularla
    this.nextQuestionTextMesh.position.z = 0;
  }

  animateText(): void {
    if (!this.textMesh || !this.isAnimating) return;
  
    // Animación de colores
    const elapsedTime = this.clock.getElapsedTime();
    const colorHSL = new THREE.Color().setHSL(Math.sin(elapsedTime * 0.1), 1, 0.5);
    
    if (Array.isArray(this.textMesh.material)) {
      this.textMesh.material.forEach(material => {
        if ('color' in material) {
          (material as THREE.MeshBasicMaterial).color.set(colorHSL);
        }
      });
    } else if ('color' in this.textMesh.material) {
      (this.textMesh.material as THREE.MeshBasicMaterial).color.set(colorHSL);
    }
  
    requestAnimationFrame(this.animateText.bind(this));
  }

  public updateCountdown(): void {
    if (!this.globalStateService.isTimeToShow) {
        const time = this.globalStateService.calculateTimeUntilNextPeriod()
        const countdownString = `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
        this.updateCountdownMesh(countdownString);
    }
  }

  private updateCountdownMesh(countdownString: string): void {
    const loader = new FontLoader();
    loader.load('../../../../assets/fonts/helvetiker_regular.typeface.json', (font) => {
      const countdownGeometry = new TextGeometry(countdownString, {
        font: font,
        size: 5, // Ajusta el tamaño según sea necesario
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.02,
        bevelSegments: 3
      });
      countdownGeometry.computeBoundingBox();
      const textWidth = countdownGeometry.boundingBox!.max.x - countdownGeometry.boundingBox!.min.x;
      const textHeight = countdownGeometry.boundingBox!.max.y - countdownGeometry.boundingBox!.min.y;
  
      const canvasWidth = this.renderer.domElement.clientWidth;
      const canvasHeight = this.renderer.domElement.clientHeight;
  
      const maxWidth = canvasWidth * 0.05;
      const maxHeight = canvasHeight * 0.01;
  
      const scaleX = maxWidth / textWidth;
      const scaleY = maxHeight / textHeight;
      const scale = Math.min(scaleX, scaleY);
  
      const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Ajusta el color según sea necesario
  
      if (this.countdownTextMesh === undefined) {
        this.countdownTextMesh = new THREE.Mesh(countdownGeometry, textMaterial);
        this.scene.add(this.countdownTextMesh);
      } else {
        this.countdownTextMesh.geometry.dispose();
        this.countdownTextMesh.geometry = countdownGeometry;
        this.countdownTextMesh.material = textMaterial;
      }
  
      this.countdownTextMesh.scale.set(scale, scale, 1);
      this.countdownTextMesh.position.x = -0.5 * textWidth * scale; // Ajusta según sea necesario
      this.countdownTextMesh.position.y = -5; // Ajusta la posición vertical según sea necesario
      this.countdownTextMesh.position.z = 0;
    });
  }

  public animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.animateText();
    this.updateCountdown();
  }

  /*private centerCameraOnText(textMesh: THREE.Mesh): void {
    const distance = 50;
    const objectBoundingBox = new THREE.Box3().setFromObject(textMesh);
    const objectCenter = objectBoundingBox.getCenter(new THREE.Vector3());

    this.camera.position.set(objectCenter.x, objectCenter.y, distance);
    this.camera.lookAt(objectCenter);
  }*/
}
