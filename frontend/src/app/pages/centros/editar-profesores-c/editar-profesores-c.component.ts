import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfesorService } from '../../../services/profesores.service';
import { ClaseService } from '../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-profesores-c',
  templateUrl: './editar-profesores-c.component.html',
  styleUrl: './editar-profesores-c.component.css'
})
export class EditarProfesoresCComponent{

  profesoresData: any = [];
  clasesData: any;
  private id: any;

  constructor(private fb:FormBuilder, private profesorService: ProfesorService, private router: Router, private claseService: ClaseService, private activatedRoute: ActivatedRoute){
    this.clasesData = [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.profesoresData = history.state.profesor;
      this.form.patchValue({
        ID_Profesor: this.profesoresData.ID_Profesor,
        Nombre: this.profesoresData.Nombre,
        Apellidos: this.profesoresData.Apellidos,
        Email: this.profesoresData.Email,
        ID_Centro: this.clasesData.ID_Centro,
        ID_Clase: this.profesoresData.ID_Clase
      });
    });

    this.cargarClases();
  }

  public form = this.fb.group({
    ID_Profesor: [''],
    Nombre: [''],
    Apellidos: [''],
    Email: ['', [Validators.email]],
    ID_Centro: [''],
    ID_Clase: ['']
  });

  cargarClases(){
    this.id = localStorage.getItem('id');
    this.claseService.getClasesCentro(this.id).subscribe(res => {
      this.clasesData = res;
    })
  }

  actualizarProfesor(){
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.profesorService.putProfesor(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Profesor editado con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['centros/ver-profesores']);
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
