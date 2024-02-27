import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map, forkJoin } from 'rxjs'; // Asegúrate de importar Observable y of
import { environment } from '../../environments/environment';

type Puntuaciones = {
    [ambito: string]: number;
};

type PreguntasPorSeleccionar = {
    [ambito: string]: number;
};

type Frecuencias = {
  [ambito: string]: number;
};

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
    private basePath = `${environment.base_url}/preguntas/`;
    constructor(private http: HttpClient) {}

    private conteoAmbitosTratados: { [ambito: string]: number } = {
      'Clase': 0,
      'Amigos': 0,
      'Emociones': 0,
      'Familia': 0,
      'Fuera de clase': 0
  };

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    // LLAMADAS API
    getPreguntas(): Observable<any> {
        return this.http.get(this.basePath, this.httpOptions);
    }

    getPreguntaID(id: any): Observable<any> {
        return this.http.get(`${this.basePath}?ID_Pregunta=${id}`, this.httpOptions);
    }

    seleccionarPreguntas(): Observable<any> {
      const ambitos = ['Clase', 'Amigos', 'Emociones', 'Familia', 'Fuera de clase'];
      const puntuaciones: Puntuaciones = {};
      const frecuencias: Frecuencias = {}; // Nueva estructura para almacenar la frecuencia de selección de cada ámbito
      
      // Generar puntuaciones aleatorias
      ambitos.forEach(ambito => {
          puntuaciones[ambito] = Math.floor(Math.random() * 101);
          frecuencias[ambito] = Math.random(); // Simula la frecuencia con un número aleatorio entre 0 y 1
      });
  
      console.log(puntuaciones);
      console.log(frecuencias);
  
      const totalPreguntas = 8; // Máximo de preguntas a seleccionar
      let preguntasPorSeleccionar: PreguntasPorSeleccionar = {};
  
      // Filtrar ámbitos con puntuaciones por debajo de 50
      const ambitosPorDebajoDe50 = Object.keys(puntuaciones).filter(ambito => puntuaciones[ambito] <= 50);
      if (ambitosPorDebajoDe50.length === 0) {
          // Si no hay ámbitos por debajo de 50, seleccionar 1 pregunta de cada ámbito
          Object.keys(puntuaciones).forEach(ambito => preguntasPorSeleccionar[ambito] = 1);
      } else {
          // Asignar preguntas basado en puntuaciones y ajustar según frecuencias de aparición
          let preguntasAsignadas = 0;
          ambitosPorDebajoDe50.forEach(ambito => {
              if (preguntasAsignadas < totalPreguntas) {
                  const asignacionBasadaEnFrecuencia = frecuencias[ambito] < 0.5 ? 2 : 1; // Menor frecuencia, mayor prioridad
                  preguntasPorSeleccionar[ambito] = Math.min(asignacionBasadaEnFrecuencia, totalPreguntas - preguntasAsignadas);
                  preguntasAsignadas += preguntasPorSeleccionar[ambito];
              }
          });
  
          // Ajustar asignaciones para ámbitos restantes si aún hay espacio
          const ambitosRestantes = Object.keys(puntuaciones).filter(ambito => !ambitosPorDebajoDe50.includes(ambito));
          ambitosRestantes.forEach(ambito => {
              if (preguntasAsignadas < totalPreguntas) {
                  preguntasPorSeleccionar[ambito] = 1;
                  preguntasAsignadas += 1;
              } else if (!preguntasPorSeleccionar.hasOwnProperty(ambito)) {
                  preguntasPorSeleccionar[ambito] = 0; // Asegura que todos los ámbitos estén representados
              }
          });
      }
  
      console.log(preguntasPorSeleccionar);
  
      // Asumiendo que existe una función obtenerPreguntasSeleccionadas que acepta este input
      return this.obtenerPreguntasSeleccionadas(preguntasPorSeleccionar);
  }
  

    // Método ajustado para realizar llamadas individuales por ámbito
    obtenerPreguntasSeleccionadas(preguntasPorSeleccionar: { [ambito: string]: number }): Observable<any> {
        const ambitoToID: { [ambito: string]: number } = {
          'Clase': 1,
          'Amigos': 2,
          'Emociones': 4,
          'Familia': 5,
          'Fuera de clase': 3
        };
      
        // Crear un array de observables para cada solicitud de preguntas por ámbito,
        // proporcionando explícitamente el tipo para el acumulador en reduce.
        const requests: Observable<any>[] = Object.entries(preguntasPorSeleccionar).reduce((acc: Observable<any>[], [ambito, cantidad]) => {
          const id = ambitoToID[ambito];
          console.log(cantidad);
          if (cantidad > 0) {
            acc.push(this.http.get<any[]>(`${this.basePath}/porAmbito?ID_Ambito=${id}&cantidad=${cantidad}`));
          }
          return acc;
        }, [] as Observable<any>[]); // Aquí proporcionamos una anotación de tipo explícita para el valor inicial
        
        function barajarArray(array: any[]): any[] {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
        
            // Intercambiar elementos array[i] y array[j]
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        //Ejecutar resultados simultánemente
        return forkJoin(requests).pipe(
          map(responses => {
            const todasLasPreguntas = responses.map(resp => resp.preguntas).flat();
        
            // Mezclar de forma aleatoria el array de preguntas usando Fisher-Yates
            barajarArray(todasLasPreguntas);
        
            console.log(todasLasPreguntas); // Mostrar en consola todas las preguntas mezcladas
            return todasLasPreguntas;
          })
        );
      }
      
}
