import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfesorService } from '../../../services/profesores.service';
import { CentroService } from '../../../services/centros.service';
import { ClaseService } from '../../../services/clases.service';

@Component({
  selector: 'app-editar-profesores',
  templateUrl: './editar-profesores.component.html',
  styleUrl: './editar-profesores.component.css'
})
export class EditarProfesoresComponent implements OnInit, OnChanges {

  profesoresData: any = [];
  centrosData: any;
  clasesData: any;
  centroID: any;

  constructor(private fb:FormBuilder, private profesorService: ProfesorService, private router: Router, private activatedRoute: ActivatedRoute, private centroService: CentroService, private claseService: ClaseService){
    this.centrosData = [];
    this.clasesData = [];
  }

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

    this.cargarCentros();
    this.cargarClases(this.profesoresData.ID_Centro);
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
