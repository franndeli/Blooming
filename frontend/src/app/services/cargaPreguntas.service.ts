import { PreguntaService } from './preguntas.service';
import { AlumnoService } from './alumnos.service';
import { SesionService } from './sesiones.service';
import { RespuestaService } from './respuestas.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

type Resultados = { [ambito: string]: number };

@Injectable({
    providedIn: 'root'
})

export class CargarPreguntasService {

  preguntas: any[] = [];
  opcion: any[] = [];
  ambitos: any = null;
  aparicionambitos: any = null;
  nsesiones: any = null;
  indiceActual: number = 0;
  preguntaActual: any = null;
  mostrarReiniciar: boolean = false;

  textMesh!: THREE.Mesh | undefined

  objectKeys = Object.keys;

  private gravedadesActualizadas: any;

  constructor(
    private preguntaService: PreguntaService, 
    private alumnoService: AlumnoService, 
    private sesionService: SesionService, 
    private respuestaService: RespuestaService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    try{
      const estadoPreguntas = localStorage.getItem('preguntas');
      const estadoIndiceActual = localStorage.getItem('indiceActual');

      
    
      if (estadoPreguntas && estadoIndiceActual) {
        this.preguntas = JSON.parse(estadoPreguntas);
        this.indiceActual = JSON.parse(estadoIndiceActual);
        this.preguntaActual = this.preguntas[this.indiceActual];
      } else {
      }
    } catch(error){
      console.error("Error al inicializar el estado:", error);
    }

  }

  async cargarPreguntas() {
    return new Promise((resolve, reject) => {
        this.alumnoService.getAlumnoID(localStorage.getItem('id')).subscribe( (ambitos: any) => { 
            this.ambitos = JSON.parse(ambitos.alumnos[0].Ambitos);
            this.aparicionambitos = JSON.parse(ambitos.alumnos[0].AparicionAmbitos);
            this.sesionService.getSesionCount(localStorage.getItem('id')).subscribe(async (sesiones: any) => {
                this.nsesiones = sesiones.count;
                //console.log(this.nsesiones);
                this.preguntaService.seleccionarPreguntas(this.ambitos, this.aparicionambitos, this.nsesiones).subscribe(async preguntas => {
                    this.preguntas = preguntas;
                    //console.log(preguntas);
                    if (this.preguntas && this.preguntas.length > 0) {
                        this.preguntaActual = this.preguntas[this.indiceActual];
                    }
                    //   this.sesionService.crearSesion();
                    this.guardarPreguntas();
                    await this.guardarIndiceActual();
                    resolve(this.preguntas);
                    return this.preguntas;
                });
            });
        });
    });
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
        //console.log('Respuesta creada con éxito:', response);
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

    //console.log(this.gravedadesPorAmbito);
    this.loadNewQuestion();
  }

  private loadNewQuestion() {
    // Incrementa el índice actual para pasar a la siguiente pregunta
    if (this.indiceActual < this.preguntas.length - 1) {
      this.indiceActual++;
      this.preguntaActual = this.preguntas[this.indiceActual];
  
      this.guardarIndiceActual();
    } else {
      // Manejar el final del cuestionario
      this.preguntaActual = null;
    }
  }

  multiplicarYActualizarAmbitos() {
    //console.log("Entro en multiplicarYActualizarAmbitos");
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
          //console.log(gravedadesActualizadas);
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
    //console.log("Entro en actualizarAmbitosEnBackend");
    return new Promise((resolve, reject) => {
      const alumnoId = localStorage.getItem('id');
      //console.log(ambitosActualizados);

      const estado = this.obtenerEstado(ambitosActualizados);

      const datosActualizados = {
        ID_Alumno: alumnoId,
        Ambitos: ambitosActualizados, // Envía como objeto JavaScript directamente
        Estado: estado
      };
      
      this.alumnoService.putAlumno(datosActualizados).subscribe({
        next: (response) => {
          //console.log('Ambitos actualizados con éxito:', response);
          resolve(response); // Resuelve la promesa cuando la actualización es exitosa
        },
        error: (error) => {
          console.error('Error al actualizar ámbitos:', error);
          reject(error); // Rechaza la promesa en caso de error
        }
      });
    });
  }

  obtenerEstado(ambitos: { [key: string]: number }){
    let estado = "";
    const valores = Object.values(ambitos);
    const suma = valores.reduce((a: number, b: number) => a + b, 0);
    //console.log(suma)
    const media = suma / valores.length;
    //console.log(media)

    if (media >= 0 && media <= 20) {
      estado = "Muy Malo";
    } else if (media >= 21 && media <= 40) {
      estado = "Malo";
    } else if (media > 40 && media <= 60) {
      estado = "Normal";
    } else if (media > 60 && media <= 80) {
      estado = "Bueno";
    } else if (media > 80 && media <= 100) {
      estado = "Muy Bueno";
    }
    //console.log(estado)

    return estado;
  }
  
  actualizarAparicionAmbitos() {
    //console.log("Entro en actualizarAparicionAmbitos");
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
                //console.log('AparicionAmbitos actualizados con éxito:', response);
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
}
