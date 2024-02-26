import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PreguntaService {
    private basePath=`${environment.base_url}/preguntas/`;
    constructor(private http: HttpClient) {}

    private httpOptions = {
        headers: new HttpHeaders ({
          'Content-Type': 'application/json'
        })
    }

    //LLAMADAS API
    getPreguntas(){
        return this.http.get(this.basePath);
    }

    getPreguntaID(id: any){
        return this.http.get(this.basePath+'?ID_Pregunta='+id);
    }

    /*
    getPuntuacionesAlumno(idAlumno: string): Observable<any> {
      // Endpoint
      return this.http.get(`${environment.base_url}/puntuaciones/${idAlumno}`, this.httpOptions);
     }

    actualizarPuntuacionesAlumno(idAlumno: string, nuevasPuntuaciones: any): Observable<any> {
      // Endpoint para actualizar las puntuaciones del alumno
      return this.http.put(`${environment.base_url}/actualizarPuntuaciones/${idAlumno}`, nuevasPuntuaciones, this.httpOptions);
    }

    seleccionarPreguntas(puntuaciones: any): Observable<any> {
        // Suponemos que puntuaciones es un objeto donde las claves son los ambitos y los valores las puntuaciones
        // Ejemplo: { 'Clase': 6, 'Amigos': 4, 'Emociones': 3, 'Familia': 7, 'Fuera de clase': 5 }
        
        const ambitosPorDebajoDe5 = Object.keys(puntuaciones).filter(ambito => puntuaciones[ambito] <= 5);
        let preguntasPorSeleccionar = {};

        if (ambitosPorDebajoDe5.length === 0) {
            // Todos los ambitos están en buena situación, seleccionar una pregunta aleatoria de cada ambito
            Object.keys(puntuaciones).forEach(ambito => preguntasPorSeleccionar[ambito] = 1);
        } else {
            // Ajustar el número de preguntas según los ambitos que necesitan atención
            ambitosPorDebajoDe5.forEach(ambito => preguntasPorSeleccionar[ambito] = 2);

            const ambitosRestantes = Object.keys(puntuaciones).filter(ambito => !ambitosPorDebajoDe5.includes(ambito));
            ambitosRestantes.forEach(ambito => {
                // Si hay 1 o 2 ambitos por debajo de 5, se selecciona 1 pregunta aleatoria de los ambitos restantes
                preguntasPorSeleccionar[ambito] = ambitosPorDebajoDe5.length <= 2 ? 1 : 0;
            });

            // Ajustar si hay más de 3 ambitos por debajo de 5
            if (ambitosPorDebajoDe5.length > 3) {
                // Limitar a los 3 ambitos con las puntuaciones más bajas
                ambitosPorDebajoDe5.sort((a, b) => puntuaciones[a] - puntuaciones[b]).slice(0, 3).forEach(ambito => preguntasPorSeleccionar[ambito] = 2);
                Object.keys(preguntasPorSeleccionar).forEach(ambito => {
                    if (!ambitosPorDebajoDe5.slice(0, 3).includes(ambito)) {
                        preguntasPorSeleccionar[ambito] = 0; // No seleccionar preguntas de ambitos con puntuaciones más altas
                    }
                });
            }
        }

        // Ahora, se debería tener un objeto `preguntasPorSeleccionar` que indica cuántas preguntas seleccionar por ambito
        return this.obtenerPreguntasSeleccionadas(preguntasPorSeleccionar);
    */
}