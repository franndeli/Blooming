import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
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
    Usuario: ['', [Validators.required]],
    Contraseña: ['', [Validators.required]]
  });

  login(){
    this.sendForm=true
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.authService.login(this.form.value).subscribe(
        (response:any) => {
          localStorage.setItem('token', response.token);
          if(response.rol == 'Admin'){
            this.router.navigate(['admin']);
          }
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
          Swal.fire(error.error.msg);
        }
      );
    }
  }

  validarLogin(campo: string){
    return this.form.get(campo)?.valid || !this.sendForm
  }
  
}
