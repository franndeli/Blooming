import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { SesionService } from '../../../services/sesiones.service';
import { RespuestaService } from '../../../services/respuestas.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-ver-perfil-alumno',
  templateUrl: './ver-perfil-alumno.component.html',
  styleUrl: './ver-perfil-alumno.component.css'
})

export class VerPerfilAlumnoComponent implements OnInit, AfterViewInit {
  private alumnoID: any;
  public alumnosData: any;
  public nombreClase: string = '';
  public respuestasData: any;
  private sesiones: any;
  private claseID: any;
  private dias: number = 7;
  private gravedad: number = 0;
  public nombresAmbitos: any = [];
  private volverPag: number = 0;

  constructor(private respuestaService: RespuestaService, private router: Router, private activatedRoute: ActivatedRoute, private sesionService: SesionService, private alumnoService: AlumnoService){
    this.alumnosData = [];
    this.respuestasData = [];
    this.sesiones = {};
  }

  ngOnInit() {
    this.sesiones.Ambitos = {};
    this.sesiones.Dias = {};
    this.activatedRoute.paramMap.subscribe(params => {
      this.alumnoID = history.state.alumnoID;
      this.volverPag = history.state.volverPag;
      this.claseID = history.state.claseID;
    });
    this.obtenerAlumno();
    this.obtenerRespuestas();
  }

  ngAfterViewInit() {
    this.obtenerSesiones();
  }

  obtenerAlumno(){
    this.alumnoService.getAlumnoID(this.alumnoID).subscribe((res: any) => {
      this.alumnosData = res.alumnos[0];
      this.alumnosData.Ambitos = JSON.parse(this.alumnosData.Ambitos);
      this.nombreClase = this.alumnosData.Clase.Nombre;
    });
  }

  obtenerSesiones(){
    this.sesionService.getSesionesAlumno(this.alumnoID, this.dias).subscribe((res: any) => {
      const sesionesData = res.sesiones;
      this.sesiones.Ambitos.Clase = sesionesData.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Clase);
      this.sesiones.Ambitos.Amigos = sesionesData.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Amigos);
      this.sesiones.Ambitos.Familia = sesionesData.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Familia);
      this.sesiones.Ambitos.Emociones = sesionesData.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Emociones);
      this.sesiones.Ambitos["Fuera de clase"] = sesionesData.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin)["Fuera de clase"]);

      this.nombresAmbitos = Object.keys(this.sesiones.Ambitos);

      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      this.sesiones.Dias = sesionesData.map((sesion: any) => {
        const partes = sesion.FechaFin.Fecha.split("-");
        const date = new Date(`${partes[1]}-${partes[0]}-${partes[2]}`);
        const dayName = days[date.getDay()];
        return dayName;
      });

      this.dibujarGrafica();
    });
  }

  dibujarGrafica(){
    var chartDom = document.getElementById('chart');
    var myChart = echarts.init(chartDom);
    var option: echarts.EChartsOption;

    option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: this.nombresAmbitos
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.sesiones.Dias
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100
      },
      series: [
        {
          name: 'Amigos',
          type: 'line',
          data: this.sesiones.Ambitos.Amigos
        },
        {
          name: 'Clase',
          type: 'line',
          data: this.sesiones.Ambitos.Clase
        },
        
        {
          name: 'Familia',
          type: 'line',
          data: this.sesiones.Ambitos.Familia
        },
        {
          name: 'Emociones',
          type: 'line',
          data: this.sesiones.Ambitos.Emociones
        },
        {
          name: 'Fuera de clase',
          type: 'line',
          data: this.sesiones.Ambitos["Fuera de clase"]
        }
      ]
    };

    option && myChart.setOption(option);
  }

  obtenerRespuestas(){
    this.respuestaService.getRespuestasAlumno(this.alumnoID, this.gravedad, 0, 5).subscribe((res: any) => {
      this.respuestasData = res.respuestas;
    });
  }

  cambiarDias(event: any) {
    this.dias = parseInt(event.target?.value);
    this.obtenerSesiones();
  }

  getGravedadClass(gravedad: number){
    if(gravedad >= 0 && gravedad < 50){
      return 'grave-gravedad';
    } else if(gravedad >= 50 && gravedad <= 65){
      return 'leve-gravedad';
    }else if(gravedad > 65 && gravedad <= 100){
      return 'nula-gravedad';
    } else {
      return '';
    }
  }

  cambiarGravedad(event: any){
    this.gravedad = parseInt(event.target?.value);
    this.obtenerRespuestas();
  }

  volver(){
    if(this.claseID){
      this.router.navigate(['profesores/ver-alumnos'], {state: {claseID: this.claseID}});
    } else {
      if(this.volverPag === 0){
        this.router.navigate(['profesores/actividad-reciente']);
      }
      if(this.volverPag === 1){
        this.router.navigate(['profesores/actividad-negativa']);
      }
      
    }
    
  }

}
