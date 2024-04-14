import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ClaseService } from '../../../services/clases.service';
import { CentroService } from '../../../services/centros.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-clases',
  templateUrl: './editar-clases.component.html',
  styleUrl: './editar-clases.component.css'
})
export class EditarClasesComponent implements OnInit {

  clasesData: any = [];
  centrosData: any;

  constructor(private fb:FormBuilder, private claseService: ClaseService, private router: Router, private activatedRoute: ActivatedRoute, private centroService: CentroService){
    this.centrosData = [];
  }

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

    this.cargarCentros();
  }

  cargarCentros(){
    this.centroService.getCentros().subscribe(res => {
      this.centrosData = res;
    })
  }

  actualizarClase(){
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.claseService.putClase(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Clase editada con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['admin/ver-clases']);
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
