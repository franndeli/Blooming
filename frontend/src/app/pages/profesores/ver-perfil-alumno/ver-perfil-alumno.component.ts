import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { ClaseService } from '../../../services/clases.service';
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
    console.log(this.alumnosData);

    this.getResultados();
  }

  getResultados(){
    this.resultadoService.getResultadoAlumno(this.alumnosData.ID_Alumno).subscribe( (res: any) => {
      this.resultadosData = res.respuestas;
    })
  }

  getGravedadClass(gravedad: string): string {
    switch (gravedad) {
      case 'Nula':
        return 'nula-gravedad';
      case 'Leve':
        return 'leve-gravedad';
      case 'Grave':
        return 'grave-gravedad';
      default:
        return '';
    }
  }

  getClaseEstado(): string {
    let clase = "";
    if(this.alumnosData.Estado === 'Bueno'){
      clase = 'badge bg-success rounded-3 fw-semibold';
    }
    if(this.alumnosData.Estado === 'Normal'){
      clase = 'badge bg-warning rounded-3 fw-semibold';
    }
    if(this.alumnosData.Estado === 'Malo'){
      clase = 'badge bg-danger rounded-3 fw-semibold';
    }

    return clase;
  }

  volver(){
    this.router.navigate(['profesores/ver-alumnos'], {state: {claseID: this.claseID}});
  }

}
