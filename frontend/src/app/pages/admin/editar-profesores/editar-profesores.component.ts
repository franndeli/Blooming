import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfesorService } from '../../../services/profesores.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-profesores',
  templateUrl: './editar-profesores.component.html',
  styleUrl: './editar-profesores.component.css'
})
export class EditarProfesoresComponent {

  profesoresData: any = [];

  constructor(private fb:FormBuilder, private profesorService: ProfesorService, private router: Router, private activatedRoute: ActivatedRoute){}

  public form = this.fb.group({
    ID_Profesor: [''],
    Nombre: [''],
    Apellidos: [''],
    Email: ['', [Validators.email]],
    ID_Centro: [''],
    ID_Clase: ['']
  });

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.profesoresData = history.state.profesor;
      this.form.patchValue({
        ID_Profesor: this.profesoresData.ID_Profesor,
        Nombre: this.profesoresData.Nombre,
        Apellidos: this.profesoresData.Apellidos,
        Email: this.profesoresData.Email,
        ID_Centro: this.profesoresData.ID_Centro,
        ID_Clase: this.profesoresData.ID_Clase
      });
    });
  }

  actualizarProfesor(){
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.profesorService.putProfesor(this.form.value).subscribe(
        (response:any) => {
          this.router.navigate(['admin/ver-profesores']);
        }
      );
    }
  }

}
