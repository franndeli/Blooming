import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RespuestaService } from '../../../services/respuestas.service';
import { ProfesorService } from '../../../services/profesores.service';
import { SesionService } from '../../../services/sesiones.service';
import { AlumnoService } from '../../../services/alumnos.service';
import * as echarts from 'echarts';

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
  alumnosData: any;
  sesionesData: any;
  public actividadPorDia: number[] = [];
  sessionsData: any[] = [];

  constructor(private sesionService: SesionService, private alumnoService: AlumnoService, private respuestaService: RespuestaService, private profesorService: ProfesorService, private router: Router, private activatedRoute: ActivatedRoute) {
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
      this.obtenerAlumnosCentro();
    });
  }

  obtenerAlumnosCentro(){
    this.alumnoService.getAlumnosCentro(this.idCentro).subscribe((res: any) => {
      this.alumnosData = res.alumnos;
      this.obtenerSesionesAlumnos();
      this.contarSesiones();  
    });
  }

  obtenerSesionesAlumnos(){
    this.sesionService.getSesiones().subscribe((res: any) => {
      console.log(res);
      this.sesionesData = [];
      for(let i=0; i < res.sesiones.length; i++){
        for(let j=0; j < this.alumnosData.length; j++){
          if(res.sesiones[i].ID_Alumno === this.alumnosData[j].ID_Alumno){
            this.sesionesData.push(res.sesiones[i]);
            
          }
        }  
      }
      console.log(this.sesionesData);
      this.dibujarGrafica();
    }); 
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  }

  contarSesiones(){
    this.sesionService.getSessionsByDay(this.idCentro).subscribe(
      (res: any) => {
        this.sessionsData = res;
        console.log('Datos de sesiones por día:', this.sessionsData);
      },
      (error) => {
        console.error('Error al obtener datos de sesiones por día:', error);
      }
    );
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

  
  dibujarGrafica(){
    var chartDom = document.getElementById('chart');
    var myChart = echarts.init(chartDom);
    var option;

    const axisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = axisData.map(function (item, i) {
      return Math.round(Math.random() * 1000 * (i + 1));
    });
    const links = data.map(function (item, i) {
      return {
        source: i,
        target: i + 1
      };
    });
    links.pop();
    option = {
      title: {
        text: 'Actividad Reciente'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: axisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'graph',
          layout: 'none',
          coordinateSystem: 'cartesian2d',
          symbolSize: 40,
          label: {
            show: true
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          data: data,
          links: links,
          lineStyle: {
            color: '#2f4554'
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }
}
