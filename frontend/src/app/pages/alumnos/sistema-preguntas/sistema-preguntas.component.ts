import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { PreguntaService } from '../../../services/preguntas.service';
import { AlumnoService } from '../../../services/alumnos.service';
import { SesionService } from '../../../services/sesiones.service';
import { RespuestaService } from '../../../services/respuestas.service';
import { AuthService } from '../../../services/auth.service';

//ThreeJS
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { CubeService } from '../../../services/graphics/cube.service';
import { BoardService } from '../../../services/graphics/board.service';
import { FinalScreenService } from '../../../services/graphics/finalscreen.service';

//Alert
import Swal from 'sweetalert2';

type Resultados = { [ambito: string]: number };
@Component({
  selector: 'app-sistema-preguntas',
  templateUrl: './sistema-preguntas.component.html',
  styleUrls: ['./sistema-preguntas.component.css']
})

export class SistemaPreguntasComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  //Escena
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;

  //Botón de pulsar
  buttonMesh!: THREE.Mesh;
  buttonMaterial!: THREE.Material;
  buttonGeometry!: THREE.PlaneGeometry;
  lastButtonClickTime: number = 0;

  textMesh!: THREE.Mesh | undefined;
  textMesh2!: THREE.Mesh | undefined;

  preguntas: any[] = [];
  opcion: any[] = [];
  ambitos: any = null;
  aparicionambitos: any = null;
  nsesiones: any = null;
  indiceActual: number = 0;
  preguntaActual: any = null;
  mostrarReiniciar: boolean = false;

  objectKeys = Object.keys;

  EL_NUMERO: number = 0;

  hasShownCubeMessage: boolean = false;
  hasShownBoardMessage: boolean = false;

  animationId: number | null = null;

  shouldShowButton: boolean = false;

  private gravedadesActualizadas: any;

  constructor(
    private preguntaService: PreguntaService, 
    private alumnoService: AlumnoService, 
    private sesionService: SesionService, 
    private respuestaService: RespuestaService,
    private cubeService: CubeService,
    private boardService: BoardService,
    private finalScreenService: FinalScreenService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    try{
      this.obtenerNumeroAleatorio();
      this.initializeScene();
      await this.iniciarGlobalState();
      if(localStorage.getItem('mostrarContador') === 'true'){
        this.shouldShowButton = true;
      }

      const estadoPreguntas = localStorage.getItem('preguntas');
      const estadoIndiceActual = localStorage.getItem('indiceActual');

      //console.log(estadoPreguntas)
      //console.log(estadoIndiceActual)
    
      if (estadoPreguntas && estadoIndiceActual) {
        this.preguntas = JSON.parse(estadoPreguntas);
        this.indiceActual = JSON.parse(estadoIndiceActual);
        this.preguntaActual = this.preguntas[this.indiceActual];
        this.cargarAnimacion(this.preguntaActual, 0);
        this.add3DText();
      } else {
        //console.log(localStorage.getItem('mostrarContador'));
        console.log(localStorage.getItem('mostrarContador'));
        if (localStorage.getItem('mostrarContador') === 'false') {
          console.log('hola');
          // Procede con el flujo normal
          if(this.finalScreenService.scene){
            this.finalScreenService.clearScene();
          }
          this.cargarPreguntas();
          if(this.EL_NUMERO === 1) {
            this.cubeService.setButtonPressedCallback(this.handleButtonPress.bind(this));
          }
          if(this.EL_NUMERO === 2) {
            this.boardService.setButtonPressedCallback(this.handleButtonPress.bind(this));
          }
        } else{
          console.log("Inicializando finalScreenService");
          this.cargarAnimacion(this.preguntaActual!, 1);
        }
      }
      
      window.addEventListener('resize', this.onWindowResize.bind(this), false);
    } catch(error){
      console.error("Error al inicializar el estado:", error);
    }

  }

  async iniciarGlobalState(){
    try {
      await this.finalScreenService.initializeState();
      console.log("Estado inicializado correctamente.");
      // Continuar con más lógica después de la inicialización
    } catch (error) {
      console.error("Error al inicializar el estado:", error);
    }
  }

  ngAfterViewInit() {
    console.log(this.EL_NUMERO);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId); // Asegúrate de cancelar el ciclo de animación cuando el componente se destruya
    }
    window.removeEventListener('resize', this.onWindowResize.bind(this), false);
  }

  onWindowResize() {
    // Actualiza el tamaño del renderer y la cámara
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  
    // Si ya has añadido texto a la escena, actualiza su escala y posición aquí
    if (this.textMesh) {
      this.createTextMesh(this.textMesh.geometry);
    }
    if (this.finalScreenService.textMesh && this.finalScreenService.nextQuestionTextMesh){
      //this.finalScreenService.stopAnimation();
      this.finalScreenService.createTextMesh(this.finalScreenService.textMesh.geometry);
      this.finalScreenService.createTextMesh2(this.finalScreenService.nextQuestionTextMesh.geometry);
      //this.finalScreenService.startAnimation();
    }
  }

  handleButtonClick() {
    console.log('Botón presionado');
    Swal.fire({
      title: "¿Estás seguro que quieres salir?",
      //text: "Vas a salir de la aplicación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
        this.finalScreenService.setMostrarContador(false);

        this.authService.logout();
        
        localStorage.removeItem('mostrarContador');
      }
    });
  }

  private handleButtonPress(): void {
    const currentTime = new Date().getTime(); // Obtener el tiempo actual

    if (currentTime - this.lastButtonClickTime < 1000) {
      // Si ha pasado menos de un segundo desde el último clic, ignorar este clic
      console.log("Espera un segundo antes de volver a pulsar el botón.");
      return;
    }

    this.lastButtonClickTime = currentTime;

    console.log("El botón ha sido presionado");

    let selectedOption = undefined;

    if(this.EL_NUMERO === 1) {
      console.log("Opción pulsada:", this.cubeService.selectedOption);
      selectedOption = this.cubeService.selectedOption;
    }
    
    if(this.EL_NUMERO === 2) {
      if (this.boardService.selectedOption !== null) {
        console.log("Opción pulsada:", this.boardService.selectedOption);
        selectedOption = this.boardService.selectedOption
      }
    }
    
    if(selectedOption){
      this.siguientePregunta(selectedOption.Gravedad, selectedOption.ID_Opcion);
    }
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

    this.initButton();
  }

  //BOTÓN --------------------------------------------------------------------------------
  initButton() {
    // Crear la geometría y el material para el botón
    this.buttonGeometry = new THREE.BoxGeometry(20, 7); // Profundidad agregada para el efecto 3D
    this.buttonMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x68A63C, 
      //emissive: 0x072534, 
      //side: THREE.DoubleSide, 
      //flatShading: true 
    });
    this.buttonMesh = new THREE.Mesh(this.buttonGeometry, this.buttonMaterial);
  
    // Crear el texto para el botón
    const loader = new FontLoader();
    loader.load('../../../../assets/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Pulsa', {
        font: font,
        size: 3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  
      // Ajustar la posición del texto en el botón
      textGeometry.computeBoundingBox();
      if(textGeometry.boundingBox !== null){
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        textMesh.position.set(-textWidth / 2, -1, 1.1); // Ajustar la posición z para que el texto aparezca encima del botón
      }
  
      // Añadir el texto al botón
      this.buttonMesh.add(textMesh);
    });
    
    this.buttonMesh.name = 'button'; // Establecer un nombre para el botón para detectarlo fácilmente
  
    // Añadir el botón a la escena
    this.scene.add(this.buttonMesh);
  }
  

  updateButtonVisibility() {
    if(this.EL_NUMERO === 1) {
      if (this.cubeService.getisSelected()) {
      // Posición del botón en la escena para que sea visible
      this.buttonMesh.position.set(0, -60, 0);
      } else {
        // Oculta el botón moviéndolo fuera de la cámara
        this.buttonMesh.position.set(-1000, -1000, -1000);
      }
    }
    
    if(this.EL_NUMERO === 2) {
      const isSelected = this.boardService.selectedOption !== null;
      if (isSelected) {
        // Posición del botón en la escena para que sea visible
        this.buttonMesh.position.set(0, -60, 0);
      } else {
        // Oculta el botón moviéndolo fuera de la cámara
        this.buttonMesh.position.set(-1000, -1000, -1000);
      }
    }
  }
  //BOTÓN --------------------------------------------------------------------------------

  animate() {
    if (!this.animationId) { // Solo inicia la animación si no está ya en ejecución
      const animateLoop = () => {
        this.updateButtonVisibility();
        if(this.EL_NUMERO === 1){
          this.cubeService.updateCubeRotation();
        }
        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(animateLoop);
      };
      animateLoop();
    }
  }

  add3DText() {
    if (!this.preguntaActual) return;
  
    const loader = new FontLoader();
    loader.load('../../../../assets/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry(this.preguntaActual.TextoPreguntaElegido ? this.preguntaActual.TextoPreguntaElegido : this.preguntaActual.TextoPregunta, {
        font: font,
        size: 10, // Este es el tamaño inicial del texto. Puede necesitar ajustarse basado en el cálculo de escala
        height: 0.3,
        curveSegments: 12,
        bevelEnabled: false,
      });
  
      textGeometry.computeBoundingBox();
  
      // Calcula el tamaño del texto y ajusta su escala para que se ajuste dentro del área deseada
      this.createTextMesh(textGeometry);
    });
  }
  
  createTextMesh(textGeometry: any) {
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    const textHeight = textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;

    // Obtener las dimensiones del canvas
    const canvasWidth = this.renderer.domElement.clientWidth;
    const canvasHeight = this.renderer.domElement.clientHeight;

    // Definir el área máxima que el texto debe ocupar como porcentaje del tamaño del canvas
    const maxWidth = canvasWidth * 0.15 ;
    const maxHeight = canvasHeight * 0.01 ;

    // Calcular la escala necesaria para ajustar el texto dentro del área definida
    const scaleX = maxWidth / textWidth;
    const scaleY = maxHeight / textHeight;
    const scale = Math.min(scaleX, scaleY);

    // Crear y añadir el objeto de texto a la escena
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

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
    const fixedHeight = 50; // Altura fija para la posición 'y' del texto
    this.textMesh.position.y = fixedHeight; // Usar una altura fija en lugar de calcularla
    this.textMesh.position.z = 0;
  }

  // Agrega este método a tu clase de componente
  addInstructionText(message: string) {
    const loader = new FontLoader();
    loader.load('../../../../assets/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry(message, {
        font: font,
        size: 3, // Ajusta según sea necesario
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: false,
      });

      textGeometry.computeBoundingBox();
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      this.textMesh2 = new THREE.Mesh(textGeometry, textMaterial);

      if (textGeometry.boundingBox) {
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        this.textMesh2.position.x = -0.5 * textWidth;
        this.textMesh2.position.y = 40; // Ajusta según la posición de tu textMesh principal
        this.textMesh2.position.z = 0;
      }

      this.scene.add(this.textMesh2);
    });
  }


  cargarAnimacion(preguntaActual: any, ole: number){

    if(localStorage.getItem('hasShownCubeMessage') === 'true'){
      this.hasShownCubeMessage = true;
    }

    if(localStorage.getItem('hasShownBoardMessage') === 'true'){
      this.hasShownBoardMessage = true;
    }
    
    if(this.EL_NUMERO === 1 && !this.hasShownCubeMessage && ole === 0) {
      // Muestra el mensaje para el cubeService si aún no se ha mostrado
      this.addInstructionText("¡Mueve el botón verde con el ratón y selecciona tu respuesta en el cubo!");
      this.hasShownCubeMessage = true;
      localStorage.setItem('hasShownCubeMessage', 'true');
    }

    if(this.EL_NUMERO === 2 && !this.hasShownBoardMessage && ole === 0) {
      // Muestra el mensaje para el boardService si aún no se ha mostrado
      this.addInstructionText("¡Pon el cubo verde sobre la respuesta que quieras!");
      this.hasShownBoardMessage = true;
      localStorage.setItem('hasShownBoardMessage', 'true');
    }

    if(this.EL_NUMERO === 1 && ole === 0) {
      this.cubeService.setButtonPressedCallback(this.handleButtonPress.bind(this));
      this.cubeService.setCamera(this.camera);
      this.cubeService.setScene(this.scene);
      this.cubeService.setButtonMesh(this.buttonMesh);
      this.cubeService.initMouseEvents(this.rendererContainer.nativeElement);
      const cube = this.cubeService.configureCube(preguntaActual);
      if (!this.scene.getObjectById(cube.id)) {
        this.scene.add(cube);
      }
    }

    if(this.EL_NUMERO === 2 && ole === 0) {
      this.boardService.setButtonPressedCallback(this.handleButtonPress.bind(this));
      this.boardService.setCamera(this.camera);
      this.boardService.setScene(this.scene);
      this.boardService.setButtonMesh(this.buttonMesh);
      this.boardService.initMouseEvents(this.rendererContainer.nativeElement);
      const board = this.boardService.initBoard(preguntaActual);
      if(!this.scene.getObjectById(board.id)){
        this.scene.add(board);
      }
    }

    if(ole === 1){
      this.finalScreenService.initialize(this.scene, this.camera, this.renderer);
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
        console.log(this.nsesiones);
        this.preguntaService.seleccionarPreguntas(this.ambitos, this.aparicionambitos, this.nsesiones).subscribe(preguntas => {
          this.preguntas = preguntas;
          console.log(preguntas);
          if (this.preguntas && this.preguntas.length > 0) {
            this.preguntaActual = this.preguntas[this.indiceActual];
            this.cargarAnimacion(this.preguntaActual, 0);
            this.add3DText();
          }
          this.sesionService.crearSesion();
          this.guardarPreguntas();
          this.guardarIndiceActual();
        });
      });
    });
  }

  clearScene() {

    if (this.EL_NUMERO === 1) {
        this.cubeService.removeMouseEvents(this.rendererContainer.nativeElement);
        this.cubeService.clearScene();
    } else if (this.EL_NUMERO === 2) {
        this.boardService.removeMouseEvents(this.rendererContainer.nativeElement);
        this.boardService.clearScene();
    }

    if (this.textMesh) {
        this.scene.remove(this.textMesh);
        this.textMesh = undefined;
    }
    if (this.textMesh2) {
        this.scene.remove(this.textMesh2);
        this.textMesh2 = undefined;
    }
  }




















  gravedadesPorAmbito: { [ambito: string]: number } = {};

  siguientePregunta(gravedad: number, id: any) {
    let fechaRespuesta = new Date(); // Crea un objeto de fecha con la fecha y hora actual
    fechaRespuesta.setHours(fechaRespuesta.getHours() + 2); // Suma dos horas a la fecha actual

    let fechaInicioISO = fechaRespuesta.toISOString();
    const respuesta = {
      ID_Pregunta: this.preguntaActual.ID_Pregunta,
      ID_Opcion: id,
      ID_Alumno: localStorage.getItem('id'),
      FechaRespuesta: fechaInicioISO,
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

    console.log(this.gravedadesPorAmbito);

    this.clearScene()
    this.loadNewQuestion();
  }

  private loadNewQuestion() {
    // Incrementa el índice actual para pasar a la siguiente pregunta
    if (this.indiceActual < this.preguntas.length - 1) {
      this.indiceActual++;
      this.preguntaActual = this.preguntas[this.indiceActual];
  
      this.obtenerNumeroAleatorio();
      console.log(this.EL_NUMERO);
      this.cargarAnimacion(this.preguntaActual, 0);
      this.add3DText();
      this.guardarIndiceActual();
    } else {
      // Manejar el final del cuestionario
      this.preguntaActual = null;
      this.scene.remove(this.buttonMesh);
      this.reiniciar();
    }
  }

  multiplicarYActualizarAmbitos() {
    console.log("Entro en multiplicarYActualizarAmbitos");
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
          console.log(gravedadesActualizadas);
          this.gravedadesActualizadas = gravedadesActualizadas;
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
    console.log("Entro en actualizarAmbitosEnBackend");
    return new Promise((resolve, reject) => {
      const alumnoId = localStorage.getItem('id');
      console.log(ambitosActualizados);
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
    console.log("Entro en actualizarAparicionAmbitos");
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

  async reiniciar() {
    try {
      await this.multiplicarYActualizarAmbitos();
      console.log("Salgo de await this.multiplicarYActualizarAmbitos()");
      await this.sesionService.finalizarSesion(this.gravedadesActualizadas);
      localStorage.setItem('mostrarContador', 'true');
      this.finalScreenService.setMostrarContador(true);
      if(localStorage.getItem('mostrarContador') === 'true'){
        this.shouldShowButton = true;
      }
      this.finalScreenService.initialize(this.scene, this.camera, this.renderer);
      this.finalizarSesion();
    } catch (error) {
      console.error('Error en el proceso de reinicio:', error);
    }
  }

  guardarPreguntas() {
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  }

  guardarIndiceActual(){
    localStorage.setItem('indiceActual', JSON.stringify(this.indiceActual));
  }

  finalizarSesion() {
    localStorage.removeItem('preguntas');
    localStorage.removeItem('indiceActual');
    localStorage.removeItem('hasShownCubeMessage');
    localStorage.removeItem('hasShownBoardMessage');
  }
  

  obtenerNumeroAleatorio() {
    this.EL_NUMERO = Math.floor(Math.random() * 2) + 1;
    //this.EL_NUMERO = 2;
    //this.EL_NUMERO = 1;
  }
}
