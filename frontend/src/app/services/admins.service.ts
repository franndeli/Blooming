import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AdminService {

    private basePath=`${environment.base_url}/admins/`;
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
    getAdmin(id:any){
      this.getHeader();
      return this.http.get(this.basePath+'?ID_Admin='+id, this.httpOptions );
    }
  
  }