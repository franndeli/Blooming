import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { ProfesorService } from '../../../services/profesores.service';
import { RespuestaService } from '../../../services/respuestas.service';
import { SesionService } from '../../../services/sesiones.service';


@Component({
  selector: 'app-todos-alumnos',
  templateUrl: './todos-alumnos.component.html',
  styleUrl: './todos-alumnos.component.css'
})
export class TodosAlumnosComponent {
  private idProfesor: any;
  private idClase: any;
  private idCentro: any;
  alumnosData: any;
  public alumnosTendencia: any;
  sesionAlumnoAnterior: any;
  filtroNombre: string = ''; 
  public posActual = 0;
  public filPag = 9;
  private busqueda = '';
  private contar = 0;
  public totalAlumnos = 0;
  private EstadoAnterior: any;

  constructor(private alumnoService: AlumnoService, private router: Router, private sesionService: SesionService, private profesorService: ProfesorService, private respuestaService: RespuestaService){
    this.alumnosData = [];
    this.alumnosTendencia = [];
  }

  ngOnInit(){
    this.idProfesor = localStorage.getItem('id');
    this.getIdCentro();
    
  }

  getIdCentro(){
    this.profesorService.getProfesorID(this.idProfesor).subscribe((res: any) => {
      this.idCentro = res.profesores[0].ID_Centro;
      this.getAlumnosCentro(this.busqueda);
    });
  }

  getAlumnosCentro(buscar : string){
    this.busqueda = buscar;
    this.alumnoService.getAlumnosCentro(this.idCentro,this.posActual, this.filPag,  this.contar, this.busqueda).subscribe((res: any) => {
      if(res["alumnos"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.filPag;
          if(this.posActual < 0){
            this.posActual = 0
          }
          this.getAlumnosCentro(this.busqueda);
        }else {
          this.alumnosData = [];
          this.alumnosTendencia = [];
          this.totalAlumnos = 0;
        }
      }else{
        this.alumnosData = res.alumnos;
        this.alumnosTendencia = [];
        this.totalAlumnos = res.page.total;
        this.compararEstados();
      }
    });
  }
  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.getAlumnosCentro(this.busqueda);
  }

  cambiarFilasPagina(filas: any){
    this.filPag = filas;
    this.cambiarPagina(1);
  }

  filtrarAlumnos() {
    this.getAlumnosCentro(this.filtroNombre);
  }

  onClickContar(num: number){
    if(num == 1){
      this.contar = 1;
      this.getAlumnosCentro(this.busqueda);
    } else if(num == 2){
      this.contar = 2;
      this.getAlumnosCentro(this.busqueda);
    }else if(num == 11){
      this.contar = 11;
      this.getAlumnosCentro(this.busqueda);
    }else if(num == 12){
      this.contar = 12;
      this.getAlumnosCentro(this.busqueda);
    }else if(num == 5){
      this.contar = 5;
      this.getAlumnosCentro(this.busqueda);
    }else if(num == 6){
      this.contar = 6;
      this.getAlumnosCentro(this.busqueda);
    }
  }

  verPerfil(alumnoID: any){
    this.router.navigate(['profesores/ver-perfil-alumno'], {state: {alumnoID, claseID: this.idClase}});
  }

  getClaseEstado(estado: any): string {
    let clase = "";
    if(estado === 'Muy Bueno'){
      clase = 'badge bg-success rounded-3 fw-semibold';
    }
    if(estado === 'Bueno'){
      clase = 'badge bg-verde1 rounded-3 fw-semibold';
    }
    if(estado === 'Normal'){
      clase = 'badge bg-amarillo rounded-3 fw-semibold';
    }
    if(estado === 'Muy Malo'){
      clase = 'badge bg-danger rounded-3 fw-semibold';
    }
    if(estado === 'Malo'){
      clase = 'badge bg-warning rounded-3 fw-semibold';
    }

    return clase;
  }

  compararEstados() {
    this.EstadoAnterior = '';
    const estados = ['Muy Malo', 'Malo', 'Normal', 'Bueno', 'Muy Bueno']; // Orden de los estados de peor a mejor

    for (let i = 0; i < this.totalAlumnos; i++) {
      if (this.alumnosData[i]) { 
        this.sesionService.getSesionesAlumno(this.alumnosData[i].ID_Alumno, 7).subscribe((res: any) => {
          //console.log(res);
          if(res.sesiones.length > 0){
            this.sesionAlumnoAnterior = res.sesiones[0];
            console.log(this.sesionAlumnoAnterior);
  
            let data = JSON.parse(this.sesionAlumnoAnterior.ValorAmbitoFin);
  
            let values: number[] = Object.values(data) as number[];
            let sum = values.reduce((a, b) => a + b, 0);
            let average = sum / values.length;
    
            console.log('La media es: ', average);
  
            if(average >= 0 && average <= 20){
              this.EstadoAnterior = 'Muy Malo';
            } else if (average > 20 && average <= 40){
              this.EstadoAnterior = 'Malo';
            } else if (average > 40 && average <= 60){
              this.EstadoAnterior = 'Normal';
            } else if (average > 60 && average <= 80){
              this.EstadoAnterior = 'Bueno';
            } else if (average > 80 && average <= 100){
              this.EstadoAnterior = 'Muy Bueno';
            }
            console.log('El estado anterior es: ', this.EstadoAnterior);
            console.log('El estado actual es: ', this.alumnosData[i].Estado);
  
            // Comparación de estados
            const indiceEstadoAnterior = estados.indexOf(this.EstadoAnterior);
            const indiceEstadoActual = estados.indexOf(this.alumnosData[i].Estado);
  
            if (indiceEstadoActual > indiceEstadoAnterior) {
              this.alumnosTendencia.push({id: this.alumnosData[i].ID_Alumno, tendencia: 'mejora'});
            } else if (indiceEstadoActual < indiceEstadoAnterior) {
              this.alumnosTendencia.push({id: this.alumnosData[i].ID_Alumno, tendencia: 'empeora'});
            } else {
              this.alumnosTendencia.push({id: this.alumnosData[i].ID_Alumno, tendencia: 'igual'});
            }
            
          } else{
            this.alumnosTendencia.push({id: this.alumnosData[i].ID_Alumno, tendencia: 'igual'});
          }
        });
      }
      
    }
    console.log('La tendencia es: ', this.alumnosTendencia);
  }
  
}
