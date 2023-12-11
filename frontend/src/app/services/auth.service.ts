import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { loginForm } from '../interfaces/login-form.interface'
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TokenResponse } from '../interfaces/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    return this.http.post(`${environment.base_url}/login`, formData).pipe(retry(2),catchError(this.handleError));
  }

  validarToken() {
    const token = localStorage.getItem('token') || '';
    if (token === ''){
      return of (false);
    }

    return this.http.get<TokenResponse>(`${environment.base_url}/login/token`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( res => {
        localStorage.setItem('token', res.token);
      }),
      map ( resp => {
        return true;
      }),
      catchError ( err => {
        console.warn(err);
        return of(false);
      })
    )

  }
}
