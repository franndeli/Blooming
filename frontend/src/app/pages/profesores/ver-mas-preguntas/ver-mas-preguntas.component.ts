import { Component } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { PreguntaService } from '../../../services/preguntas.service';
import { RespuestaService } from '../../../services/respuestas.service';

@Component({
  selector: 'app-ver-mas-preguntas',
  templateUrl: './ver-mas-preguntas.component.html',
  styleUrl: './ver-mas-preguntas.component.css'
})
export class VerMasPreguntasComponent {
  private alumnoID: any;
  private claseID: any;
  private contar = 0;
  filtroNombre: any;
  public preguntasData: any;
  public filPag = 5;
  public posActual = 0;
  private busqueda = '';
  public totalPreguntas = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alumnoService: AlumnoService, private respuestaService: RespuestaService){
    this.preguntasData = [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.alumnoID = history.state.alumnoID;
      this.claseID = history.state.claseID;
      this.getPreguntasAlumno(this.busqueda);
    });
  }
  filtrarAlumnos() {
    this.getPreguntasAlumno(this.filtroNombre);
  }
  getPreguntasAlumno(buscar: string){
    this.busqueda = buscar;
    this.respuestaService.getRespuestasAlumno(this.alumnoID, -1, this.posActual, this.filPag, this.contar, this.busqueda).subscribe((data: any) => {
      //console.log(data);
      if(data["respuestas"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.filPag;
          if(this.posActual < 0){
            this.posActual = 0
          }
          this.getPreguntasAlumno(this.busqueda);
        }else {
          this.preguntasData = [];
          this.totalPreguntas = 0;
        }
      }else{
        this.preguntasData = data.respuestas;
        this.totalPreguntas = data.page.total; 
      }
    });
  }

  getAmbito(ambito: any): string {
    let color = "";
    
    if(ambito === 'Familia'){
      color = 'badge bg-familia rounded-3 fw-semibold';
    }
    if(ambito === 'Emociones'){
      color = 'badge bg-emociones rounded-3 fw-semibold';
    }
    if(ambito === 'Amigos'){
      color = 'badge bg-amigos rounded-3 fw-semibold';
    }
    if(ambito === 'Clase'){
      color = 'badge bg-clase rounded-3 fw-semibold';
    }
    if(ambito === 'Inicio'){
      color = 'badge bg-inicio rounded-3 fw-semibold';
    }
    if(ambito === 'Fuera de clase'){
      color = 'badge bg-fuera rounded-3 fw-semibold';
    }

    return color;
  }
  
  onClickContar(num: number){
    if(num == 7){
      this.contar = 7;
      this.getPreguntasAlumno(this.busqueda);
    } else if(num == 8) {
      this.contar = 8;
      this.getPreguntasAlumno(this.busqueda);
    }else if(num == 9) {
      this.contar = 9;
      this.getPreguntasAlumno(this.busqueda);
    }else if(num == 10) {
      this.contar = 10;
      this.getPreguntasAlumno(this.busqueda);
    }else if(num == 5) {
      this.contar = 5;
      this.getPreguntasAlumno(this.busqueda);
    }else if(num == 6) {
      this.contar = 6;
      this.getPreguntasAlumno(this.busqueda);
    }else if(num == 11) {
      this.contar = 11;
      this.getPreguntasAlumno(this.busqueda);
    }else if(num == 12) {
      this.contar = 12;
      this.getPreguntasAlumno(this.busqueda);
    }
  }

  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.getPreguntasAlumno(this.busqueda);
  }

  cambiarFilasPagina(filas: any){
    this.filPag = filas;
    this.cambiarPagina(1);
  } 

  verPerfil(alumnoID: any){
    this.router.navigate(['profesores/ver-perfil-alumno'], {state: {alumnoID, claseID: this.claseID}});
  }
}
