import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private basePath=`${environment.base_url}/alumnos/`;
  private httpOptions: any;
  constructor(private http: HttpClient) { 
  }
  
  // Opciones Http
  private getHeader(){
    this.httpOptions = {
      headers: this.addToken(),
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

  getAlumnos(desde?: number, filas?: number, textoBusqueda?: string){
    this.getHeader();
    if(!desde){
      desde = 0;
    }
    if(!filas){
      filas = 0;
    }
    if(!textoBusqueda){
      textoBusqueda = '';
    }
    return this.http.get(this.basePath+'?numFilas='+filas+'&desde='+desde, this.httpOptions );
  }

  getAlumnosCentro(id: any, desde?: number, filas?: number, textoBusqueda?: string){
    this.getHeader();
    if(!desde){
      desde = 0;
    }
    if(!filas){
      filas = 0;
    }
    if(!textoBusqueda){
      textoBusqueda = '';
    }
    return this.http.get(this.basePath+'?ID_Centro='+id+'&numFilas='+filas+'&desde='+desde, this.httpOptions);
  }

  getAlumnosClase(id: any, desde?: number, filas?: number, textoBusqueda?: string){
    this.getHeader();
    if(!desde){
      desde = 0;
    }
    if(!filas){
      filas = 0;
    }
    if(!textoBusqueda){
      textoBusqueda = '';
    }
    return this.http.get(this.basePath+'?ID_Clase='+id+'&numFilas='+filas+'&desde='+desde, this.httpOptions);
  }

  getAlumnoID(id: any){
    this.getHeader();
    return this.http.get(this.basePath+'id/?ID_Alumno='+id, this.httpOptions);
  }

  actualizaAmbitos(id: any){
    this.getHeader();
  }

  deleteAlumno(id:number){
    this.getHeader();
    return this.http.delete(this.basePath+id, this.httpOptions);
  }

  postAlumno(formData: any){
    this.getHeader();
    return this.http.post(this.basePath, formData, this.httpOptions);
  }

  putAlumno(formData: any){
    this.getHeader();
    return this.http.put(this.basePath+formData.ID_Alumno, formData, this.httpOptions);
  }

  putEstadoAlumno(estadoData: any){
    this.getHeader();
    return this.http.put(this.basePath+'estado/'+estadoData.ID_Alumno, estadoData, this.httpOptions);
  }

}
