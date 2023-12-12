import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AlumnoService } from '../../../../services/alumnos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-alumnos',
  templateUrl: './crear-alumnos.component.html',
  styleUrl: './crear-alumnos.component.css'
})
export class CrearAlumnosComponent {

  sendForm: boolean=false;

  constructor(private fb:FormBuilder, private alumnoService: AlumnoService, private router: Router){}

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    Apellidos: ['', [Validators.required]],
    Contraseña: ['', [Validators.required]],
    FechaNacimiento: ['', [Validators.required]],
    ID_Clase: ['', [Validators.required]]
    
  });

  crearAlumno(){
    this.sendForm=true;
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.alumnoService.postAlumno(this.form.value).subscribe(
        (response:any) => {
          this.router.navigate(['alumnos']);
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
