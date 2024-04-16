import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AlumnoService } from '../../../services/alumnos.service';
import { CentroService } from '../../../services/centros.service';
import { ClaseService } from '../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-alumnos',
  templateUrl: './editar-alumnos.component.html',
  styleUrl: './editar-alumnos.component.css'
})
export class EditarAlumnosComponent implements OnInit, OnChanges {

  alumnosData: any = [];
  centrosData: any;
  clasesData: any;
  centroID: any;

  constructor(private fb:FormBuilder, private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute, private centroService: CentroService, private claseService: ClaseService){
    this.centrosData = [];
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

    this.cargarCentros();
    this.cargarClases(this.alumnosData.ID_Centro);
  }

  ngOnChanges(event: any) {
    this.centroID = event.target.value;
    this.cargarClases(this.centroID);
  }

  cargarCentros(){
    this.centroService.getCentros().subscribe(res => {
      this.centrosData = res;
    })
  }

  cargarClases(centroID: any){
    this.claseService.getClasesCentro(centroID).subscribe(res => {
      this.clasesData = res;
    })
  }

  actualizarAlumno(){
    if(!this.form.valid){
      //console.log('Errores en el formulario');
    }else{
      this.alumnoService.putAlumno(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Alumno editado con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['admin/ver-alumnos']);
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
