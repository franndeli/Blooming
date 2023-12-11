import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  sendForm: boolean=false;

  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router){}

  ngOnInit() {}

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    Contraseña: ['', [Validators.required]],
    Calle: ['', [Validators.required]],
    CP: ['', [Validators.required]],
    Localidad: ['', [Validators.required]],
    Provincia: ['', [Validators.required]]
  });

  registro(){
    this.sendForm=true;
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      console.log('registro');
      this.authService.registro(this.form.value).subscribe(
        (response:any) => {
          console.log('registro!', response);
          this.router.navigate(['centros']);
        },
        (error) => {
          console.error('Error de registro:', error);
          Swal.fire(error.error.message);
        }
      );
    }
  }

  validarRegistro(campo: string){
    return this.form.get(campo)?.valid || !this.sendForm
  }
}
