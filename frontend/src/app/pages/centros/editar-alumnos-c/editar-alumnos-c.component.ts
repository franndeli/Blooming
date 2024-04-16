import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { ClaseService } from '../../../services/clases.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-alumnos-c',
  templateUrl: './editar-alumnos-c.component.html',
  styleUrl: './editar-alumnos-c.component.css'
})
export class EditarAlumnosCComponent implements OnInit {

  alumnosData: any = [];
  clasesData: any;
  private id: any;

  constructor(private fb:FormBuilder, private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute, private claseService: ClaseService){
    this.clasesData = [];
  }

  public form = this.fb.group({
    ID_Alumno: [''],
    Nombre: [''],
    Apellidos: [''],
    Usuario: [''],
    FechaNacimiento: [''],
    ID_Centro: [''],
    ID_Clase: ['']
  });

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.alumnosData = history.state.alumno;
      this.form.patchValue({
        ID_Alumno: this.alumnosData.ID_Alumno,
        Nombre: this.alumnosData.Nombre,
        Apellidos: this.alumnosData.Apellidos,
        Usuario: this.alumnosData.Usuario,
        FechaNacimiento: this.alumnosData.FechaNacimiento,
        ID_Centro: this.alumnosData.ID_Centro,
        ID_Clase: this.alumnosData.ID_Clase
      });
    });
    
    this.cargarClases();
  }

  actualizarAlumno(){
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.alumnoService.putAlumno(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Alumno editado con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['centros/ver-alumnos']);
          });
        },
        (error) => {
          console.error('Error de edición:', error);
          Swal.fire(error.error.message);
        }
      );
    }
  }

  cargarClases(){
    this.id = localStorage.getItem('id');
    this.claseService.getClasesCentro(this.id).subscribe(res => {
      this.clasesData = res;
    })
  }

}
