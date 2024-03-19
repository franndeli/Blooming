import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, forkJoin, switchMap} from 'rxjs'; // Asegúrate de importar Observable y of
import { environment } from '../../environments/environment';

type PreguntasPorSeleccionar = {
    [ambito: string]: number;
};

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private basePath = `${environment.base_url}/preguntas`;
  private basePathOpcion = `${environment.base_url}/opciones`
  constructor(private http: HttpClient) {}

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

  calcularPeso (nota: number, frecuencia: number): number {
    let peso = 0;
  
    // Considerar la nota
    if (nota <= 50) {
      peso += 2; // Mayor urgencia para mejorar
    } else if (nota < 60) {
      peso += 1; // Alguna urgencia para mejorar
    }
  
    // Ajustar según la frecuencia de aparición
    if (frecuencia < 0.3) {
      peso += 2; // Muy pocas apariciones, necesita repaso
    } else if (frecuencia < 0.6) {
      peso += 1; // Algunas apariciones, podría necesitar repaso
    }
  
    // Asegurar que el peso no excede el máximo permitido
    return Math.min(peso, 2);
  };

  seleccionarPreguntas(ambitos: any, aparicionambitos: any, sesiones: any): Observable<any> {
    const totalPreguntas = 7;
    let preguntasPorSeleccionar: PreguntasPorSeleccionar = {};

    console.log(ambitos);
    
    // Calcular frecuencias
    let frecuencia: { [key: string]: number } = {};
    Object.keys(aparicionambitos).forEach(ambito => {
      frecuencia[ambito] = aparicionambitos[ambito] / (sesiones * 2);
    });

    console.log(frecuencia);
  
    // Array para almacenar ámbitos con su peso compuesto
    let ambitosConPeso: { ambito: string, peso: number, nota: number }[] = [];
  
    // Calcular el peso compuesto para cada ámbito
    Object.entries(ambitos as { [key: string]: number }).forEach(([ambito, nota]) => {
      const peso = this.calcularPeso(nota, frecuencia[ambito]);
      ambitosConPeso.push({ ambito, peso, nota });
    });
  
    // Ordenar los ámbitos por peso (priorizando los de mayor peso) y luego por nota si tienen el mismo peso
    ambitosConPeso.sort((a, b) => b.peso - a.peso || a.nota - b.nota);
  
    // Asignar preguntas basándose en el orden de prioridad
    let preguntasAsignadas = 0;
    for (const { ambito, peso } of ambitosConPeso) {
      if (preguntasAsignadas < totalPreguntas) {
        const preguntasAAgregar = Math.min(peso, totalPreguntas - preguntasAsignadas);
        preguntasPorSeleccionar[ambito] = preguntasAAgregar;
        preguntasAsignadas += preguntasAAgregar;
      }
      if (preguntasAsignadas >= totalPreguntas) break; // Detener si se alcanza el máximo de preguntas
    }

    console.log(preguntasPorSeleccionar);
  
    return this.obtenerPreguntasSeleccionadas(preguntasPorSeleccionar);
  }

  // Método ajustado para realizar llamadas individuales por ámbito
  obtenerPreguntasSeleccionadas(preguntasPorSeleccionar: { [ambito: string]: number }): Observable<any> {
    const ambitoToID: { [ambito: string]: number } = {
      'Clase': 1,
      'Amigos': 2,
      'Emociones': 4,
      'Familia': 5,
      'Fuera de clase': 3,
      'Inicio': 7
    };
  
    const requests: Observable<any>[] = [this.http.get<any[]>(`${this.basePath}/porAmbito?ID_Ambito=${ambitoToID['Inicio']}&cantidad=1`)];

    Object.entries(preguntasPorSeleccionar).forEach(([ambito, cantidad]) => {
        const id = ambitoToID[ambito];
        console.log(cantidad);
        if (cantidad > 0) {
            requests.push(this.http.get<any[]>(`${this.basePath}/porAmbito?ID_Ambito=${id}&cantidad=${cantidad}`));
        }
    });
    
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
          // Extraer la primera pregunta (ámbito "Inicio") y el resto de las preguntas
          const preguntaInicio = responses[0].preguntas[0];
          const restoPreguntas = responses.slice(1).map(resp => resp.preguntas).flat();

          // Mezclar de forma aleatoria el resto de preguntas
          barajarArray(restoPreguntas);

          // Coloca la pregunta de "Inicio" al principio y luego el resto
          return [preguntaInicio, ...restoPreguntas];
      }),
      switchMap(preguntas => {
        // Para cada pregunta, obtener sus respuestas
        const opcionesRequests = preguntas.map(pregunta =>
            this.http.get<any[]>(`${this.basePathOpcion}?ID_Pregunta=${pregunta.ID_Pregunta}`)
        );

        // Ejecutar solicitudes para obtener respuestas
        return forkJoin(opcionesRequests).pipe(
            map(opcionesArrays => {
                // Asociar cada conjunto de respuestas a su pregunta correspondiente
                preguntas.forEach((pregunta, index) => {
                    pregunta.respuestas = opcionesArrays[index];
                });

                return preguntas;
            })
        );
      })
    );
  }  
}
