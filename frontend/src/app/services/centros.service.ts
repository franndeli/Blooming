import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Centro } from '../interfaces/centros.interface'

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  basePath='http://localhost:3000/api/centros/';
  httpOptions: any;
  constructor(private http: HttpClient) { 
  }
  
  // Opciones Http
  getHeader(){
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
  getCentros(){
    this.getHeader();
    return this.http.get<Centro>(this.basePath, this.httpOptions );
  }
}
