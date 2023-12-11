import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { loginForm } from '../../interfaces/login-form.interface';

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
          //Aquí habría que comprobar el rol que es para que te lleve a x pagina
          //Está puesto que te lleve a router porque la de inicio no se cual es e index no me deja :)
          if(response.rol == 'Admin'){
            this.router.navigate(['admin']);
          }
          //Ya lo he puesto jjjj esos los he comentado porque faltan esas páginas, so no hay donde redirigir
          //Estoy motivadisimo no tengo sueño francis¡! un besazo¡
          /*
          if(response.rol == 'Centro'){
            this.router.navigate(['']);
          }
          if(response.rol == 'Alumno'){
            this.router.navigate(['']);
          }
          if(response.rol == 'Profesor'){
            this.router.navigate(['']);
          }
          */
        },
        (error) => {
          console.error('Error de autenticación:', error);
        }
      );
    }  
  }

  validarLogin(campo: string){
    return this.form.get(campo)?.valid || !this.sendForm
  }
  
}
