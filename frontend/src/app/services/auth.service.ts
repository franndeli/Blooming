import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { loginForm } from '../interfaces/login-form.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath='http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  httpOptions= {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  }

  // Manejador de errores API
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log("Ha ocurrido un error: ",error,error.message);
    } else {
      console.error(
        `Codigo Error: '${error.status}' `+
        `Body: '${error.error}'`);
    } 
    return throwError ('Ha sucedido un problema, reintentalo más tarde');
  }

  login(formData: loginForm){
    console.log(formData);
    return this.http.post(this.basePath+'login', formData).pipe(retry(2),catchError(this.handleError));
  }
}
