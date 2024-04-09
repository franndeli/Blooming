import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SesionService } from '../../../services/sesiones.service';
import { RespuestaService } from '../../../services/respuestas.service';
import { ClaseService } from '../../../services/clases.service';
import { CentroService } from '../../../services/centros.service';
import { AlumnoService } from '../../../services/alumnos.service';
import { ProfesorService } from '../../../services/profesores.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-actividad-reciente-negativa',
  templateUrl: './actividad-reciente-negativa.component.html',
  styleUrl: './actividad-reciente-negativa.component.css'
})
export class ActividadRecienteNegativaComponent {

  public respuestasData: any;
  private sesiones: any;
  public alumnosData: any;
  public totalAlumnos = 0;
  public centro: any;
  private gravedad: number = 0;
  profesoresData: any;
  id: any;

  public posActual = 0;
  public filPag = 5;
  private busqueda = '';

  constructor(private profesorService: ProfesorService, private centroService: CentroService, private alumnoService: AlumnoService, private respuestaService: RespuestaService, private router: Router, private activatedRoute: ActivatedRoute, private sesionService: SesionService){
    this.respuestasData = [];
    this.sesiones = {};
    this.alumnosData = [];
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    
    console.log(this.id);

    this.obtenerCentro();
    this.dibujarGrafica();
  }

  obtenerTodosAlumnos(){
    this.alumnoService.getAlumnos().subscribe((res: any) => {
      this.alumnosData = res.alumnos;
      console.log(this.alumnosData);
      this.totalAlumnos = this.alumnosData.length;
      console.log('longitud', this.totalAlumnos);
    }, error => {
      console.error('Error al obtener los alumnos:', error);
    });
  }

  obtenerCentro(){
    this.profesorService.getProfesorID(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.centro = data.profesores[0].ID_Centro; 
        console.log('centro:', this.centro); 
        this.obtenerRespuestas();
      },
      (error: any) => {
        console.error('Error al obtener el centro:', error);
      }
    );
    
  }

  obtenerRespuestas(){
    this.respuestaService.getRespuestasCentro(this.centro).subscribe((res: any) => {
      this.respuestasData = res.respuestas;
      console.log(this.respuestasData);
    });
  }

  dibujarGrafica(){
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('chart2')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };
    option && myChart.setOption(option);
  }

  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.obtenerRespuestas();
  }

  cambiarFilasPagina(filas: any){
    this.filPag = filas;
    this.cambiarPagina(1);
  }
}
