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
  getProfesores(){
    this.getHeader();
    return this.http.get(this.basePath, this.httpOptions );
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

  getProfesoresCentro(id: any){
    this.getHeader();
    return this.http.get(this.basePath+'?ID_Centro='+id, this.httpOptions);
  }

}
