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

  buttonMesh!: THREE.Mesh;
  buttonMaterial!: THREE.MeshBasicMaterial;
  buttonGeometry!: THREE.PlaneGeometry;

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
    this.cubeService.setButtonPressedCallback(this.handleButtonPress.bind(this));
  }

  ngAfterViewInit() {
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    /*this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);*/
    this.cubeService.initMouseEvents(this.rendererContainer.nativeElement);
  }

  ngOnDestroy() {
    /*this.renderer.domElement.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    this.renderer.domElement.remove();*/
    this.cubeService.removeMouseEvents(this.rendererContainer.nativeElement);
  }

  private handleButtonPress(): void {
    console.log("El botón ha sido presionado");
    // Aquí puedes añadir más lógica que quieres que se ejecute cuando el botón se presione
  }

  initializeScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xbfd1e5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.set(0, 0, 100);
    this.cubeService.setCamera(this.camera);
    this.cubeService.setScene(this.scene);

    // Agregar iluminación ambiental suave
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // luz ambiental suave
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // ajusta la intensidad según necesites
    directionalLight.position.set(0, 1, 1); // ajusta la posición según necesites
    this.scene.add(directionalLight);

    this.initButton();
  }

  //BOTÓN --------------------------------------------------------------------------------
  initButton() {
    // Crear la geometría y el material para el botón
    this.buttonGeometry = new THREE.BoxGeometry(10, 5, 2); // Profundidad agregada para el efecto 3D
    this.buttonMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    this.buttonMesh = new THREE.Mesh(this.buttonGeometry, this.buttonMaterial);
  
    // Crear el texto para el botón
    const loader = new FontLoader();
    loader.load('../../../../assets/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Pulsa', {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5
      });
      const textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  
      // Ajustar la posición del texto en el botón
      textGeometry.computeBoundingBox();
      if(textGeometry.boundingBox !== null){
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        textMesh.position.set(-textWidth / 2, -1, 1.1); // Ajustar la posición z para que el texto aparezca encima del botón
      }
  
      // Añadir el texto al botón
      this.buttonMesh.add(textMesh);
      this.cubeService.setButtonMesh(this.buttonMesh);
    });
  
    // Posición del botón fuera de la vista
    this.buttonMesh.position.set(-100, -100, -100);
    this.buttonMesh.name = 'button'; // Establecer un nombre para el botón para detectarlo fácilmente
  
    // Añadir el botón a la escena
    this.scene.add(this.buttonMesh);
  }
  

  updateButtonVisibility() {
    if (this.cubeService.getisSelected()) {
      // Configura la posición del botón en la escena para que sea visible
      this.buttonMesh.position.set(0, -60, 0); // Coloca el botón donde lo necesites en la escena
    } else {
      // Oculta el botón moviéndolo fuera de la cámara
      this.buttonMesh.position.set(-1000, -1000, -1000);
    }
  }
  //BOTÓN --------------------------------------------------------------------------------

  animate() {
    requestAnimationFrame(this.animate);
    this.updateButtonVisibility();
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
