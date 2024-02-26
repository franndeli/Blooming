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

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
    private basePath = `${environment.base_url}/preguntas/`;
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

    seleccionarPreguntas(): Observable<any> {
        // Generar puntuaciones aleatorias directamente dentro de este método
        const ambitos = ['Clase', 'Amigos', 'Emociones', 'Familia', 'Fuera de clase'];
        const puntuaciones: Puntuaciones = {};
        ambitos.forEach(ambito => {
            puntuaciones[ambito] = Math.floor(Math.random() * 11); // Genera un número aleatorio entre 0 y 10
        });

        console.log(puntuaciones);

        const ambitosPorDebajoDe5 = Object.keys(puntuaciones).filter(ambito => puntuaciones[ambito] <= 5);
        let preguntasPorSeleccionar: PreguntasPorSeleccionar = {};

        console.log(ambitosPorDebajoDe5);
        if (ambitosPorDebajoDe5.length === 0) {
            Object.keys(puntuaciones).forEach(ambito => preguntasPorSeleccionar[ambito] = 1);
        } else {
            ambitosPorDebajoDe5.forEach(ambito => preguntasPorSeleccionar[ambito] = 2);

            const ambitosRestantes = Object.keys(puntuaciones).filter(ambito => !ambitosPorDebajoDe5.includes(ambito));
            ambitosRestantes.forEach(ambito => preguntasPorSeleccionar[ambito] = ambitosPorDebajoDe5.length <= 2 ? 1 : 0);

            if (ambitosPorDebajoDe5.length > 3) {
                ambitosPorDebajoDe5.sort((a, b) => puntuaciones[a] - puntuaciones[b]).slice(0, 3).forEach(ambito => preguntasPorSeleccionar[ambito] = 2);
                Object.keys(preguntasPorSeleccionar).forEach(ambito => {
                    if (!ambitosPorDebajoDe5.slice(0, 3).includes(ambito)) {
                        preguntasPorSeleccionar[ambito] = 0;
                    }
                });
            }
        }

        console.log(preguntasPorSeleccionar);

        // Asumiendo que tienes un endpoint que acepta 'preguntasPorSeleccionar' para devolver las preguntas específicas
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
      
        // Usar forkJoin para ejecutar todas las solicitudes simultáneamente y combinar sus resultados
        return forkJoin(requests).pipe(
          map(responses => {
            // Aplanar y combinar todas las preguntas en un solo array
            const todasLasPreguntas = responses.map(resp => resp.preguntas).flat();
            console.log(todasLasPreguntas); // Mostrar en consola todas las preguntas obtenidas
            return todasLasPreguntas;
          })
        );
      }
      
}
