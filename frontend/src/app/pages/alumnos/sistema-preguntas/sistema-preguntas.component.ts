import { Component, OnInit } from '@angular/core';
import { PreguntaService } from '../../../services/preguntas.service';
import { AlumnoService } from '../../../services/alumnos.service';
import { SesionService } from '../../../services/sesiones.service';
import { RespuestaService } from '../../../services/respuestas.service';

type Resultados = { [ambito: string]: number };
@Component({
  selector: 'app-sistema-preguntas',
  templateUrl: './sistema-preguntas.component.html',
  styleUrls: ['./sistema-preguntas.component.css']
})

export class SistemaPreguntasComponent implements OnInit {
  preguntas: any[] = [];
  opcion: any[] = [];
  ambitos: any = null;
  aparicionambitos: any = null;
  nsesiones: any = null;
  indiceActual: number = 0;
  preguntaActual: any = null;
  mostrarReiniciar: boolean = false;

  objectKeys = Object.keys;

  constructor(private preguntaService: PreguntaService, private alumnoService: AlumnoService, private sesionService: SesionService, private respuestaService: RespuestaService) {}

  ngOnInit() {
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
