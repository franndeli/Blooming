import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { loginForm } from '../interfaces/login-form.interface'
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TokenResponse } from '../interfaces/token-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) { }

  httpOptions= {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  }

  // Manejador de errores API
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
    } else {
    } 
    return throwError ('Ha sucedido un problema, reintentalo más tarde');
  }

  login(formData: loginForm){
    return this.http.post(`${environment.base_url}/login`, formData)
      .pipe(
        tap( (res:any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('rol', res.rol);
        })
      );
  }

  logout() {
    // Comprobar y eliminar 'id' si existe
    if (localStorage.getItem('id')) {
      localStorage.removeItem('id');
    }
  
    // Comprobar y eliminar 'rol' si existe
    if (localStorage.getItem('rol')) {
      localStorage.removeItem('rol');
    }
  
    // Comprobar y eliminar 'token' si existe
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  
    // Redirigir al usuario a la página de login
    this.router.navigateByUrl('/login');
  }
  

  registro(formData: any){
    return this.http.post(`${environment.base_url}/centros`, formData);
  }

  validarToken(): Observable<{ valido: boolean, rol?: string }> {
    // const token = localStorage.getItem('token') || '';
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') || '' : '';
  
    if (token === ''){
      return of({ valido: false });
    }
  
    return this.http.get<TokenResponse>(`${environment.base_url}/login/token`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token.token);
        localStorage.setItem('rol', res.rol);
      }),
      map(resp => ({
        valido: true,
        rol: resp.rol
      })),
      catchError(err => {
        return of({ valido: false });
      })
    );
  }

}
