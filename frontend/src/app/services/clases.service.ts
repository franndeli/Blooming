
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ClaseService {

    private basePath='http://localhost:3000/api/clases/';
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
    getClases(){
      this.getHeader();
      return this.http.get(this.basePath, this.httpOptions );
    }
  
    deleteClase(id:number){
      this.getHeader();
      return this.http.delete(this.basePath+id, this.httpOptions);
    }
  
    postClase(formData: any){
      this.getHeader();
      return this.http.post(this.basePath, formData, this.httpOptions);
    }

}