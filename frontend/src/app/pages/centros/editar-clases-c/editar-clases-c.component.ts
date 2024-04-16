import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ClaseService } from '../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-clases-c',
  templateUrl: './editar-clases-c.component.html',
  styleUrl: './editar-clases-c.component.css'
})
export class EditarClasesCComponent {

  clasesData: any = [];

  constructor(private fb:FormBuilder, private claseService: ClaseService, private router: Router, private activatedRoute: ActivatedRoute){}

  public form = this.fb.group({
    ID_Clase: [''],
    Nombre: [''],
    ID_Centro: [''],
    NumAlumnos: ['']
  });

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.clasesData = history.state.clase;
      this.form.patchValue({
        ID_Clase: this.clasesData.ID_Clase,
        Nombre: this.clasesData.Nombre,
        ID_Centro: this.clasesData.ID_Centro,
        NumAlumnos: this.clasesData.NumAlumnos
      });
    });
  }

  actualizarClase(){
    if(!this.form.valid){
      //console.log('Errores en el formulario');
    }else{
      this.claseService.putClase(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Clase editada con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['centros/ver-clases']);
          });
        },
        (error) => {
          console.error('Error de edición:', error);
          Swal.fire(error.error.message);
        }
      );
    }
  }

}
