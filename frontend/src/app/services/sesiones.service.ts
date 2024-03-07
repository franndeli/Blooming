import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SesionService {
    private basePath=`${environment.base_url}/sesiones/`;
    private httpOptions: any;
  constructor(private http: HttpClient) { 
  }
  
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

    // getSesionesAlumno(id: any) {
    //   this.getHeader();
    //   return this.http.get<any[]>(this.basePath+'?ID_Alumno='+id, this.httpOptions);
    // }

    getSesionesAlumno(id: number){
      const token = this.getToken();
      const headers = new HttpHeaders().set('x-token', `${token}`);
      return this.http.get<any[]>(this.basePath+'?ID_Alumno='+id, {headers});
    }
}