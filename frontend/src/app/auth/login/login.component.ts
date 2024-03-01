import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { loginForm } from '../../interfaces/login-form.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  sendForm: boolean=false;

  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.authService.validarToken()
      .subscribe(({ valido, rol }) => {
        const aux = true;
        if (valido) {
          switch (rol) {
            case 'Admin':
              this.router.navigate(['admin/dashboard']);
              break;
            case 'Centro':
              this.router.navigate(['centros/dashboard']);
              break;
            case 'Alumno':
              this.router.navigate(['alumnos/carga'], {state: {aux}});
              break;
            case 'Profesor':
              this.router.navigate(['profesores/dashboard']);
              break;
            default:
              localStorage.removeItem('token');
          }
        }
      });
  }

  public form = this.fb.group({
    Usuario: [this.getLocalStorageItem('usuario') || '', [Validators.required]],
    Contraseña: ['', [Validators.required]],
    Remember: [false || this.getLocalStorageItem('usuario')]
  });

  login(){
    this.sendForm=true;
    if(!this.form.valid){
    }else{
      const formData: loginForm = {
        ...this.form.value,
        Usuario: this.form.value.Usuario || '',
        Contraseña: this.form.value.Contraseña || '',
        Remember: !!this.form.value.Remember
      };
      this.authService.login(formData).subscribe(
        (response:any) => {
          const aux = false;
          if (this.form.get('Remember')?.value ?? ''){
            this.setLocalStorageItem('usuario', formData.Usuario);
          } else {
            this.removeLocalStorageItem('usuario');
          }
          this.setLocalStorageItem('id', response.id);
          if(response.rol == 'Admin'){
            this.router.navigate(['admin/dashboard']);
          }
          if(response.rol == 'Centro'){
            this.router.navigate(['centros/dashboard']);
          }
          if(response.rol == 'Alumno'){
            this.router.navigate(['alumnos/carga'], {state: {aux}});
          }
          if(response.rol == 'Profesor'){
            this.router.navigate(['profesores/dashboard']);
          }
        },
        (error) => {
          Swal.fire(error.error.message);
        }
      );
    }
  }

  validarLogin(campo: string){
    return this.form.get(campo)?.valid || !this.sendForm
  }
  
  private getLocalStorageItem(key: string): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

}
