import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { ClaseService } from '../../../services/clases.service';

@Component({
  selector: 'app-ver-alumnos-p',
  templateUrl: './ver-alumnos-p.component.html',
  styleUrl: './ver-alumnos-p.component.css'
})
export class VerAlumnosPComponent implements OnInit{

  alumnosData: any;
  claseData: any;
  private claseID: any;
  public totalAlumnos = 0;
  public posActual = 0;
  public filPag = 5;
  private busqueda = '';

  constructor(private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute, private claseService: ClaseService){
    this.alumnosData = [];
    this.claseData = [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
        this.claseID = history.state.claseID;
    });

    if(this.claseID === '' || undefined){
      this.claseID = this.claseService.getClaseID();
    }
   
    this.obtenerAlumnos(this.busqueda);
  }

  obtenerAlumnos(buscar : string){
    this.busqueda = buscar;
    this.alumnoService.getAlumnosClase(this.claseID, this.posActual, this.filPag, buscar).subscribe((res: any) => {
      if(res["alumnos"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.filPag;
          if(this.posActual < 0){
            this.posActual = 0
          }
          this.obtenerAlumnos(this.busqueda);
        }else {
          this.alumnosData = [];
          this.totalAlumnos = 0;
        }
      }else{
        this.alumnosData = res.alumnos;
        this.totalAlumnos = res.page.total;
      }
    })
  }

  getClaseEstado(estado: any): string {
    let clase = "";
    if(estado === 'Bueno'){
      clase = 'badge bg-success rounded-3 fw-semibold';
    }
    if(estado === 'Normal'){
      clase = 'badge bg-warning rounded-3 fw-semibold';
    }
    if(estado === 'Malo'){
      clase = 'badge bg-danger rounded-3 fw-semibold';
    }

    return clase;
  }

  verPerfil(alumno: any){
    this.router.navigate(['profesores/ver-perfil-alumno'], {state: {alumno, claseID: this.claseID}});
  }

  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.obtenerAlumnos(this.busqueda);
  }

  cambiarFilasPagina(filas: any){
    this.filPag = filas;
    this.cambiarPagina(1);
  }

}
