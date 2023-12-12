import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private basePath='http://localhost:3000/api/profesores/';
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

  deleteProfesor(id:number){
    this.getHeader();
    return this.http.delete(this.basePath+id, this.httpOptions);
  }

  postProfesor(formData: any){
    this.getHeader();
    return this.http.post(this.basePath, formData, this.httpOptions);
  }

}
