import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ClaseService } from '../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-clases-c',
  templateUrl: './crear-clases-c.component.html',
  styleUrl: './crear-clases-c.component.css'
})
export class CrearClasesCComponent {
  sendForm: boolean=false;

  constructor(private fb:FormBuilder, private claseService: ClaseService, private router: Router){}

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    ID_Centro: [localStorage.getItem('id'), [Validators.required]],
    NumAlumnos: ['', [Validators.required]]
  });

  crearClase(){
    this.sendForm=true;
    if(!this.form.valid){
      //console.log('Errores en el formulario');
    }else{
      this.claseService.postClase(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Clase creada con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['centros/ver-clases']);
          });
        },
        (error) => {
          console.error('Error de creación:', error.error.error);
          Swal.fire(error.error.error);
        }
      );
    }
  }

  validarForm(campo: string){
    return this.form.get(campo)?.valid || !this.sendForm
  }

}
