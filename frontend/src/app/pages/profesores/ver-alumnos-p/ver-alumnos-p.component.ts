import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';

@Component({
  selector: 'app-ver-alumnos-p',
  templateUrl: './ver-alumnos-p.component.html',
  styleUrl: './ver-alumnos-p.component.css'
})
export class VerAlumnosPComponent implements OnInit{

  alumnosData: any;
  claseData: any;
  private claseID: any;

  constructor(private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute){
    this.alumnosData = [];
    this.claseData = [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.claseID = history.state.claseID;
      console.log( history.state);
    });

    this.getAlumnos();
  }

  getAlumnos(){
      this.alumnoService.getAlumnosClase(this.claseID).subscribe(res => {
        this.alumnosData = res;
      })
  }

  verPerfil(alumno: any){
    this.router.navigate(['profesores/ver-perfil-alumno'], {state: {alumno, claseID: this.claseID}});
  }

}
