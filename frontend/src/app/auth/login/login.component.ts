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
              this.router.navigate(['alumnos/dashboard'], {state: {aux}});
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
    Usuario: [localStorage.getItem('usuario') || '', [Validators.required]],
    // Contraseña: ['', [Validators.required]],
    // Remember: [ false || localStorage.getItem('usuario') ]
    //Usuario: [(typeof localStorage !== 'undefined' ? localStorage.getItem('usuario') : '') || '', [Validators.required]],
    Contraseña: ['', [Validators.required]],
    Remember: [false || (typeof localStorage !== 'undefined' ? localStorage.getItem('usuario') : '')]
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
            localStorage.setItem('usuario', this.form.get('Usuario')?.value ?? '');
          } else {
            localStorage.removeItem('usuario');
          }
          localStorage.setItem('id', response.id);
          if(response.rol == 'Admin'){
            this.router.navigate(['admin/dashboard']);
          }
          if(response.rol == 'Centro'){
            this.router.navigate(['centros/dashboard']);
          }
          if(response.rol == 'Alumno'){
            this.router.navigate(['alumnos/dashboard'], {state: {aux}});
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
  
}