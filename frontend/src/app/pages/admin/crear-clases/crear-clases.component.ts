import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ClaseService } from '../../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-clases',
  templateUrl: './crear-clases.component.html',
  styleUrl: './crear-clases.component.css'
})
export class CrearClasesComponent {
  sendForm: boolean=false;

  constructor(private fb:FormBuilder, private claseService: ClaseService, private router: Router){}

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    ID_Centro: ['', [Validators.required]],
    NumAlumnos: ['', [Validators.required]]
  });

  crearClase(){
    this.sendForm=true;
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.claseService.postClase(this.form.value).subscribe(
        (response:any) => {
          this.router.navigate(['clases']);
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
