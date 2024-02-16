import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from 'process';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private basePath=`${environment.base_url}/profesores/`;
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

  getProfesores(desde?: number, filas?: number, textoBusqueda?: string){
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
    return this.http.get(this.basePath+'?numFilas='+filas+'&desde='+desde+'&texto='+textoBusqueda, this.httpOptions );
  }

  getProfesoresCentro(id: any, desde: number, textoBusqueda?: string){
    this.getHeader();
    if(!desde){
      desde = 0;
    }
    if(!textoBusqueda){
      textoBusqueda = '';
    }
    return this.http.get(this.basePath+'?ID_Centro='+id+'?desde='+desde+'&texto='+textoBusqueda, this.httpOptions);
  }

  getProfesorID(id: any){
    this.getHeader();
    return this.http.get(this.basePath+'?ID_Profesor='+id, this.httpOptions );
  }

  deleteProfesor(id:number){
    this.getHeader();
    return this.http.delete(this.basePath+id, this.httpOptions);
  }

  postProfesor(formData: any){
    this.getHeader();
    return this.http.post(this.basePath, formData, this.httpOptions);
  }

  putProfesor(formData: any){
    this.getHeader();
    return this.http.put(this.basePath+formData.ID_Profesor, formData, this.httpOptions);
  }

  updateProfesorPwd(formData: any){
    this.getHeader();
    return this.http.put(this.basePath+'/newp/'+formData.ID_Profesor, formData, this.httpOptions);
  }

}
