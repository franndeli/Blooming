import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { ResultadoService } from '../../../services/resultados.service';

@Component({
  selector: 'app-ver-perfil-alumno',
  templateUrl: './ver-perfil-alumno.component.html',
  styleUrl: './ver-perfil-alumno.component.css'
})
export class VerPerfilAlumnoComponent implements OnInit {

  alumnosData: any;
  resultadosData: any;
  private claseID: any;

  constructor(private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute, private resultadoService: ResultadoService){
    this.alumnosData = [];
    this.resultadosData = [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.alumnosData = history.state.alumno;
      this.claseID = history.state.claseID;
    });

    this.getResultados();
  }

  getResultados(){
    this.resultadoService.getResultadoAlumno(this.alumnosData.ID_Alumno).subscribe( (res: any) => {
      this.resultadosData = res.respuestas;
      console.log(this.resultadosData);
    })
  }

  volver(){
    this.router.navigate(['profesores/ver-alumnos'], {state: {claseID: this.claseID}});
  }

}
