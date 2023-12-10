import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath='http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  //LLAMADAS API  
  login(formData: any){
  return this.http.post(this.basePath+'login', formData);
  }

  registro(formData: any){
    return this.http.post(this.basePath+'centros', formData);
  }
}
