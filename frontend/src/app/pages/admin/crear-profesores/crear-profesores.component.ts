import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfesorService } from '../../../services/profesores.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-profesores',
  templateUrl: './crear-profesores.component.html',
  styleUrl: './crear-profesores.component.css'
})
export class CrearProfesoresComponent {

  sendForm: boolean=false;

  constructor(private fb:FormBuilder, private profesorService: ProfesorService, private router: Router){}

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    Apellidos: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    Contraseña: ['', [Validators.required]],
    ID_Centro: ['', [Validators.required]],
    ID_Clase: ['', [Validators.required]]
  });

  crearProfesor(){
    this.sendForm=true;
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.profesorService.postProfesor(this.form.value).subscribe(
        (response:any) => {
          this.router.navigate(['profesores']);
        },
        (error) => {
          console.error('Error de creación:', error);
          Swal.fire(error.error.message);
        }
      );
    }
  }

  validarForm(campo: string){
    return this.form.get(campo)?.valid || !this.sendForm
  }

}
