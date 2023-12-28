import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfesorService } from '../../../services/profesores.service';
import { AlumnoService } from '../../../services/alumnos.service';

@Component({
  selector: 'app-ver-alumnos-p',
  templateUrl: './ver-alumnos-p.component.html',
  styleUrl: './ver-alumnos-p.component.css'
})
export class VerAlumnosPComponent implements OnInit{

  alumnosData: any;
  claseData: any;
  private id: any;
  private claseID: any;

  constructor(private profesorService: ProfesorService, private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute){
    this.alumnosData = [];
    this.claseData = [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.claseData = history.state.clase;
      console.log(this.claseData);
    });

    this.getAlumnos();
  }

  getAlumnos(){
      this.claseID =this.claseData.ID_Clase;
      this.alumnoService.getAlumnosClase(this.claseID).subscribe(res => {
        this.alumnosData = res;
      })
  }
}
