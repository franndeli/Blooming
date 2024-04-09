import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { PreguntaService } from '../../../services/preguntas.service';
import { AlumnoService } from '../../../services/alumnos.service';
import { SesionService } from '../../../services/sesiones.service';
import { RespuestaService } from '../../../services/respuestas.service';

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { CubeService } from '../../../services/graphics/cube.service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type Resultados = { [ambito: string]: number };
@Component({
  selector: 'app-sistema-preguntas',
  templateUrl: './sistema-preguntas.component.html',
  styleUrls: ['./sistema-preguntas.component.css']
})

export class SistemaPreguntasComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  
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


  preguntas: any[] = [];
  opcion: any[] = [];
  ambitos: any = null;
  aparicionambitos: any = null;
  nsesiones: any = null;
  indiceActual: number = 0;
  preguntaActual: any = null;
  mostrarReiniciar: boolean = false;

  objectKeys = Object.keys;

  constructor(
    private preguntaService: PreguntaService, 
    private alumnoService: AlumnoService, 
    private sesionService: SesionService, 
    private respuestaService: RespuestaService,
    private cubeService: CubeService
  ) {}

  ngOnInit() {
    this.cargarPreguntas();
    this.initializeScene();
  }

  ngAfterViewInit() {
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    /*this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);*/
    this.cubeService.initMouseEvents(this.rendererContainer.nativeElement, this.cube);
  }

  ngOnDestroy() {
    /*this.renderer.domElement.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    this.renderer.domElement.remove();*/
    this.cubeService.removeMouseEvents(this.rendererContainer.nativeElement);
  }

  initializeScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xbfd1e5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.set(0, 0, 100);

    // Agregar iluminación ambiental suave
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // luz ambiental suave
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // ajusta la intensidad según necesites
    directionalLight.position.set(0, 1, 1); // ajusta la posición según necesites
    this.scene.add(directionalLight);

    /*const cubeSize = 30; // Aumentar el tamaño del cubo
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize); // Usar cubeSize para el cubo
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.z = -50; // Mover el cubo hacia atrás para que no sea obstruido por el texto
    this.scene.add(this.cube);*/
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  add3DText() {
    if (!this.preguntaActual) return;

    const loader = new FontLoader();
    loader.load('../../../../assets/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry(this.preguntaActual.TextoPreguntaElegido ? this.preguntaActual.TextoPreguntaElegido : this.preguntaActual.TextoPregunta, {
        font: font,
        size: 10,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false,
        /*bevelThickness: 3,
        bevelSize: 2,
        bevelOffset: 0,
        bevelSegments: 2*/
      });
  
      textGeometry.computeBoundingBox();
      const textWidth = textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x;
      const textHeight = textGeometry.boundingBox!.max.y - textGeometry.boundingBox!.min.y;

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      // Ajustes para centrar el texto en la pantalla
      textMesh.position.x = -0.5 * textWidth;
      textMesh.position.y = 2 * textHeight;
      textMesh.position.z = 0;

      this.scene.add(textMesh);
    });
  }

  /*configureCube() {
    const cubeSize = 30;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  
    // Obtener los materiales creados con las imágenes de las opciones
    const materials = this.createCubeMaterials();
    
    // Si creas un nuevo cubo cada vez, simplemente usa los materiales aquí
    if (this.cube) {
      // Si el cubo ya existe, actualiza sus materiales
      this.cube.material = materials;
    } else {
      // Si el cubo no existe, créalo y añádelo a la escena
      this.cube = new THREE.Mesh(geometry, materials);
      this.scene.add(this.cube);
    }
  }

  createCubeMaterials() {
    const textureLoader = new THREE.TextureLoader();
  
    // Primero, mezclar un arreglo de índices de caras para asegurar una asignación aleatoria
    let faceIndices = [0, 1, 2, 3, 4, 5];
    faceIndices = this.shuffleArray(faceIndices);
  
    // Luego, crear materiales para las imágenes disponibles
    let imageMaterials = this.preguntaActual.respuestas.opciones.map((option: any) => {
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
  }*/
  

  cargarAnimacion(preguntaActual: any){
    const cube = this.cubeService.configureCube(preguntaActual);
    if (!this.scene.getObjectById(cube.id)) {
      this.scene.add(cube);
    }
    this.animate = this.animate.bind(this);
    this.animate();
  }

  cargarPreguntas() {
    this.alumnoService.getAlumnoID(localStorage.getItem('id')).subscribe((ambitos: any) => {
      this.ambitos = JSON.parse(ambitos.alumnos[0].Ambitos);
      this.aparicionambitos = JSON.parse(ambitos.alumnos[0].AparicionAmbitos);
      this.sesionService.getSesionCount(localStorage.getItem('id')).subscribe((sesiones: any) => {
        this.nsesiones = sesiones.count;
        this.preguntaService.seleccionarPreguntas(this.ambitos, this.aparicionambitos, this.nsesiones).subscribe(preguntas => {
          this.preguntas = preguntas;
          console.log(preguntas);
          if (this.preguntas && this.preguntas.length > 0) {
            this.preguntaActual = this.preguntas[this.indiceActual];
            this.cargarAnimacion(this.preguntaActual);
            this.add3DText();
          }
          this.sesionService.crearSesion();
        });
      });
    });
  }

/*
  // Función para mezclar un array de manera aleatoria (algoritmo de Fisher-Yates)
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  onMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
      this.isDragging = true;
      this.previousMousePosition.x = event.clientX;
      this.previousMousePosition.y = event.clientY;
      this.inertia.x = 0;
      this.inertia.y = 0;
    }
  }

  
  onMouseMove(event: MouseEvent): void {
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

  onMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
      this.isDragging = false;
      // Iniciar la disminución de la velocidad de rotación (inercia)
      //this.applyInertia();
    }
  }

 /* applyInertia() {
    const friction = 0.95; // Valor más cercano a 1 para una desaceleración más suave
  
    const inertiaLoop = () => {
      if (!this.isDragging && (Math.abs(this.inertia.x) > 0.001 || Math.abs(this.inertia.y) > 0.001)) {
        this.cube.rotation.y += this.inertia.x;
        this.cube.rotation.x += this.inertia.y;
  
        // Aplicar fricción para disminuir la inercia gradualmente
        this.inertia.x *= friction;
        this.inertia.y *= friction;
  
        requestAnimationFrame(inertiaLoop);
      } else {
        // Resetear la inercia cuando el movimiento es insignificante para evitar efectos residuales
        this.inertia.x = 0;
        this.inertia.y = 0;
      }
    };
  
    inertiaLoop();
}*/
















  gravedadesPorAmbito: { [ambito: string]: number } = {};

  siguientePregunta(gravedad: number, id: any) {
    const respuesta = {
      ID_Pregunta: this.preguntaActual.ID_Pregunta,
      ID_Opcion: id,
      ID_Alumno: localStorage.getItem('id'),
      FechaRespuesta: new Date().toISOString(),
      ID_Sesion: localStorage.getItem('sesionId')
    }
    this.respuestaService.postRespuesta(respuesta).subscribe({
      next: (response) => {
        console.log('Respuesta creada con éxito:', response);
      },
      error: (error) => {
        console.error('Error al crear respuesta:', error);
      }
    });

    const ambitoActual = this.preguntaActual.NombreAmbito;

    if (!this.gravedadesPorAmbito[ambitoActual] && ambitoActual !== "Inicio") {
      this.gravedadesPorAmbito[ambitoActual] = 0;
    }

    if (ambitoActual !== "Inicio") {
      this.gravedadesPorAmbito[ambitoActual] += gravedad;
    }

    if (this.indiceActual < this.preguntas.length - 1) {
      this.indiceActual++;
      this.preguntaActual = this.preguntas[this.indiceActual];
    } else {
      this.mostrarReiniciar = true;
      this.preguntaActual = null;

      console.log('Gravedades por ámbito al final:', this.gravedadesPorAmbito);
    }
  }

  multiplicarYActualizarAmbitos() {
    return new Promise((resolve, reject) => {
      this.alumnoService.getAlumnoID(localStorage.getItem('id')).subscribe({
        next: (resultado: any) => {
          const ambitosDesdeDB: { [key: string]: number } = JSON.parse(resultado.alumnos[0].Ambitos);
          
          const gravedadesActualizadas: Resultados = {
            "Clase": 0,
            "Amigos": 0,
            "Familia": 0,
            "Emociones": 0,
            "Fuera de clase": 0
          };
      
          Object.entries(this.gravedadesPorAmbito).forEach(([ambito, valor]) => {
            if (ambito in gravedadesActualizadas) {
              const calculo = valor * 5 * 1.5 + (ambitosDesdeDB[ambito] ?? 0);
              gravedadesActualizadas[ambito] = calculo < 0 ? 0 : calculo > 100 ? 100 : calculo;
            }
          });
      
          Object.keys(gravedadesActualizadas).forEach(ambito => {
            if (!(ambito in this.gravedadesPorAmbito) && (ambito in ambitosDesdeDB)) {
              gravedadesActualizadas[ambito] = ambitosDesdeDB[ambito];
            }
          });
      
          // Actualiza los ámbitos en el backend
          this.actualizarAmbitosEnBackend(gravedadesActualizadas).then(() => {
            // Una vez que se actualizan los ámbitos, actualizar aparicionAmbitos
            this.actualizarAparicionAmbitos().then(() => {
              resolve(true);
            }).catch((error) => reject(error));
          }).catch((error) => reject(error));
        },
        error: (error) => reject(error)
      });
    });
  }

  actualizarAmbitosEnBackend(ambitosActualizados: any) {
    return new Promise((resolve, reject) => {
      const alumnoId = localStorage.getItem('id');
      const datosActualizados = {
        ID_Alumno: alumnoId,
        Ambitos: ambitosActualizados // Envía como objeto JavaScript directamente
      };
  
      this.alumnoService.putAlumno(datosActualizados).subscribe({
        next: (response) => {
          console.log('Ambitos actualizados con éxito:', response);
          resolve(response); // Resuelve la promesa cuando la actualización es exitosa
        },
        error: (error) => {
          console.error('Error al actualizar ámbitos:', error);
          reject(error); // Rechaza la promesa en caso de error
        }
      });
    });
  }
  
  
  actualizarAparicionAmbitos() {
    return new Promise((resolve, reject) => {
      this.alumnoService.getAlumnoID(localStorage.getItem('id')).subscribe((resultado: any) => {
        if (resultado.alumnos && resultado.alumnos.length > 0) {
          let aparicionAmbitos = JSON.parse(resultado.alumnos[0].AparicionAmbitos || '{}');
          const alumnoId = localStorage.getItem('id');
          const rawPreguntasPorSeleccionar = localStorage.getItem('preguntasPorSeleccionar');
  
          if (alumnoId && rawPreguntasPorSeleccionar) {
            const preguntasPorSeleccionar = JSON.parse(rawPreguntasPorSeleccionar);
            
            // Sumar los valores
            Object.keys(preguntasPorSeleccionar).forEach(key => {
              aparicionAmbitos[key] = (aparicionAmbitos[key] || 0) + preguntasPorSeleccionar[key];
            });
    
            // Ordenar y limitar los valores
            const datosOrdenadosYLimitados = {
              "Clase": aparicionAmbitos["Clase"] || 0,
              "Amigos": aparicionAmbitos["Amigos"] || 0,
              "Familia": aparicionAmbitos["Familia"] || 0,
              "Emociones": aparicionAmbitos["Emociones"] || 0,
              "Fuera de clase": aparicionAmbitos["Fuera de clase"] || 0
            };
    
            const datosActualizados = {
              ID_Alumno: alumnoId,
              AparicionAmbitos: datosOrdenadosYLimitados
            };
  
            this.alumnoService.putAlumno(datosActualizados).subscribe({
              next: (response) => {
                console.log('AparicionAmbitos actualizados con éxito:', response);
                resolve(response); // Resuelve la promesa cuando la actualización es exitosa
              },
              error: (error) => {
                console.error('Error al actualizar ámbitos:', error);
                reject(error); // Rechaza la promesa en caso de error
              }
            });
            localStorage.removeItem('preguntasPorSeleccionar');
          } else {
            reject('Error: ID del alumno o preguntasPorSeleccionar no están disponibles en localStorage.');
          }
        } else {
          reject('Error: No se encontraron datos del alumno.');
        }
      });
    });
  }
  
  esUltimaPregunta(): boolean {
    return this.mostrarReiniciar;
  }

  async reiniciar() {
    try {
      await this.multiplicarYActualizarAmbitos();
      await this.sesionService.finalizarSesion();
      // window.location.reload();
    } catch (error) {
      console.error('Error en el proceso de reinicio:', error);
    }
  }
}
