import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlumnoService } from '../../../services/alumnos.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-alumnos',
  templateUrl: './editar-alumnos.component.html',
  styleUrl: './editar-alumnos.component.css'
})
export class EditarAlumnosComponent implements OnInit {

  alumnosData: any = [];

  constructor(private fb:FormBuilder, private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute){}

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
  }

  actualizarAlumno(){
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.alumnoService.putAlumno(this.form.value).subscribe(
        (response:any) => {
          this.router.navigate(['admin/ver-alumnos']);
        }
      );
    }
  }

}
