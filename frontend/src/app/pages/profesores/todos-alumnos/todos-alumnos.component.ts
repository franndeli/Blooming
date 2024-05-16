import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { ProfesorService } from '../../../services/profesores.service';


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
  filtroNombre: string = ''; 
  public posActual = 0;
  public filPag = 9;
  private busqueda = '';
  private contar = 0;
  public totalAlumnos = 0;

  constructor(private alumnoService: AlumnoService, private router: Router, private profesorService: ProfesorService){
    this.alumnosData = [];
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
          this.totalAlumnos = 0;
        }
      }else{
        this.alumnosData = res.alumnos;
        this.totalAlumnos = res.page.total;
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
}
