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

  ngOnInit() {}

  public form = this.fb.group({
    Usuario: [localStorage.getItem('usuario') || '', [Validators.required]],
    Contraseña: ['', [Validators.required]],
    Remember: [ false || localStorage.getItem('usuario') ]
  });

  login(){
    this.sendForm=true
    console.log(this.sendForm);
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      const formData: loginForm = {
        ...this.form.value,
        Usuario: this.form.value.Usuario || '',
        Contraseña: this.form.value.Contraseña || '',
        Remember: !!this.form.value.Remember
      };
      console.log('login');
      this.authService.login(formData).subscribe(
        (response:any) => {
          localStorage.setItem('token', response.token);
          if (this.form.get('Remember')?.value ?? ''){
            localStorage.setItem('usuario', this.form.get('Usuario')?.value ?? '');
          } else {
            localStorage.removeItem('usuario');
          }
          console.log('Respuesta del servidor:', response);
          if(response.rol == 'Admin'){
            this.router.navigate(['admin/dashboard']);
          }
          
          if(response.rol == 'Centro'){
            this.router.navigate(['centros/dashboard']);
          }
          if(response.rol == 'Alumno'){
            this.router.navigate(['alumnos/dashboard']);
          }
          if(response.rol == 'Profesor'){
            this.router.navigate(['profesores/dashboard']);
          }
        },
        (error) => {
          console.error('Error de autenticación:', error);
          Swal.fire(error.error.msg);
        }
      );
    }
  }

  validarLogin(campo: string){
    return this.form.get(campo)?.valid || !this.sendForm
  }
  
}
