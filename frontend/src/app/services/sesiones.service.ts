import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlumnoService } from './alumnos.service';

@Injectable({
  providedIn: 'root'
})

export class SesionService {
  private basePath=`${environment.base_url}/sesiones/`;
  private httpOptions: any;
  constructor(private http: HttpClient, private alumnoservice: AlumnoService) {}
  
  // Opciones Http
  private getHeader(){
    this.httpOptions = {
      headers: this.addToken()
    };
  }

  private getToken(){
    let token;
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return token;
  }

  private addToken(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': `${token}`,
    });
  }

  //LLAMADAS API
  getSesiones(){
    this.getHeader();
      return this.http.get(this.basePath, this.httpOptions);
  }

  getSesionesAlumno(id: number, dias: number){
    const token = this.getToken();
    const headers = new HttpHeaders().set('x-token', `${token}`);
    if(!dias){
      dias = 7;
    }
    return this.http.get<any[]>(this.basePath+'?ID_Alumno='+id+'&dias='+dias, {headers});
  }

  getSesionesCentro(id: number, dias: number){
    const token = this.getToken();
    const headers = new HttpHeaders().set('x-token', `${token}`);
    if(!dias){
      dias = 7;
    }
    return this.http.get<any[]>(this.basePath+'SesionesCentro?ID_Centro='+id+'&dias='+dias, {headers});
  }

  getSesionCount(id: any){
    this.getHeader();
    return this.http.get(this.basePath+ 'count?ID_Alumno='+id, this.httpOptions);
  }

  getSesionesAlumnoID(id: any){
    const token = this.getToken();
    const headers = new HttpHeaders().set('x-token', `${token}`);
    return this.http.get<any[]>(this.basePath+'?ID_Alumno='+id, {headers});
  }

  crearSesion() {
    this.getHeader();
    const alumnoId = localStorage.getItem('id'); // Asume que el ID del alumno ya está guardado en localStorage
    if (!alumnoId) {
      console.error('ID de alumno no encontrado en localStorage');
      return;
    }
    this.alumnoservice.getAlumnoID(localStorage.getItem('id')).subscribe((respuesta: any) => {
      let fechaInicio = new Date(); // Crea un objeto de fecha con la fecha y hora actual
      fechaInicio.setHours(fechaInicio.getHours() + 2); // Suma dos horas a la fecha actual

      let fechaInicioISO = fechaInicio.toISOString(); // Convierte la fecha modificada a formato ISO
      //console.log(fechaInicioISO);
      const inicioSesion = {
        ID_Alumno: alumnoId,
        FechaInicio: fechaInicioISO, // Guarda la fecha actual como el inicio de la sesión
        ValorAmbitoInicio: JSON.parse(respuesta.alumnos[0].Ambitos)
      };
  
      // Aquí asumimos que tienes un endpoint para crear la sesión, ajusta la URL según sea necesario
      this.http.post(this.basePath, inicioSesion, this.httpOptions).subscribe({
        next: (response: any) => {
          //console.log('Sesión creada con éxito:', response);
          localStorage.setItem('sesionId', response.ID_Sesion); // Asumiendo que el ID de la sesión viene en la respuesta
        },
        error: (error) => console.error('Error al iniciar sesión:', error)
      });
    })
  }

  finalizarSesion(gravedadesActualizadas: any) {
    //console.log("Entro en finalizarSesion");
    this.getHeader();
    const sesionId = localStorage.getItem('sesionId');
    if (!sesionId) {
      console.error('ID de sesión no encontrado en localStorage');
      return;
    }
  
    //console.log(new Date().toISOString());
    let fechaFin = new Date(); // Crea un objeto de fecha con la fecha y hora actual
    fechaFin.setHours(fechaFin.getHours() + 2); // Suma dos horas a la fecha actual

    let fechaFinISO = fechaFin.toISOString(); // Convierte la fecha modificada a formato ISO

    const finSesion = {
      FechaFin: fechaFinISO,
      ValorAmbitoFin: gravedadesActualizadas
    };
    this.http.put(this.basePath + sesionId, finSesion, this.httpOptions).subscribe({});
    localStorage.removeItem('sesionId');
  }
}