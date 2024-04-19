import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RespuestaService } from '../../../services/respuestas.service';
import { ProfesorService } from '../../../services/profesores.service';

@Component({
  selector: 'app-actividad-reciente',
  templateUrl: './actividad-reciente.component.html',
  styleUrl: './actividad-reciente.component.css'
})
export class ActividadRecienteComponent implements OnInit {
  public filPag = 5;
  public posActual = 0;
  private busqueda = '';
  private idCentro!: number;
  public recientesData: any;
  public totalActividades = 0;

  constructor(private respuestaService: RespuestaService, private profesorService: ProfesorService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.recientesData = [];
  }

  ngOnInit() {
    this.obtenerCentro();
  }

  obtenerCentro() {
    var idPorfesor = localStorage.getItem('id');
    this.profesorService.getProfesorID(idPorfesor).subscribe((res: any) => {
      this.idCentro = res.profesores[0].ID_Centro;
      this.obtenerActividadReciente(this.busqueda);
    });
  }

  obtenerActividadReciente(buscar: string) {
    this.busqueda = buscar;
    this.respuestaService.getRespuestasCentro(this.idCentro, 0, this.posActual, this.filPag).subscribe((res: any) => {
      if(res["respuestas"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.filPag;
          if(this.posActual < 0){
            this.posActual = 0
          }
          this.obtenerActividadReciente(this.busqueda);
        }else {
          this.recientesData = [];
          this.totalActividades = 0;
        }
      }else{
        this.recientesData = res.respuestas;
        this.totalActividades = res.page.total;
        //console.log(this.recientesData)
      }
    });
  }

  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.obtenerActividadReciente(this.busqueda);
  }

  cambiarFilasPagina(filas: any){
    this.filPag = filas;
    this.cambiarPagina(1);
  }  

  verPerfil(alumnoID: any){
    const volverPag = 0;
    this.router.navigate(['profesores/ver-perfil-alumno'], {state: {alumnoID, volverPag}});
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
}
