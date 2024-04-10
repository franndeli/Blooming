import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SesionService } from '../../../services/sesiones.service';
import { RespuestaService } from '../../../services/respuestas.service';
import { ClaseService } from '../../../services/clases.service';
import { CentroService } from '../../../services/centros.service';
import { AlumnoService } from '../../../services/alumnos.service';
import { ProfesorService } from '../../../services/profesores.service';
import * as echarts from 'echarts';

interface ClaseInfo {
  nombre: string;
  cont: number;
}

@Component({
  selector: 'app-actividad-reciente-negativa',
  templateUrl: './actividad-reciente-negativa.component.html',
  styleUrl: './actividad-reciente-negativa.component.css'
})
export class ActividadRecienteNegativaComponent {

  public respuestasData: any;
  private sesiones: any;
  public alumnosData: any;
  public clasesData: any;
  public totalAlumnos = 0;
  public centro: any;
  profesoresData: any;
  id: any;

  public posActual = 0;
  public filPag = 5;

  public contMalo = 0;
  public contBueno = 0;
  public totalClases = 0;
  conRiesgo: ClaseInfo[] = [];
  sinRiesgo: ClaseInfo[] = [];
  conysinRiesgo: ClaseInfo[] = [];
  public alumnosClase: any;

  constructor(private clasesService: ClaseService, private profesorService: ProfesorService, private centroService: CentroService, private alumnoService: AlumnoService, private respuestaService: RespuestaService, private router: Router, private activatedRoute: ActivatedRoute, private sesionService: SesionService){
    this.respuestasData = [];
    this.sesiones = {};
    this.alumnosData = [];
    this.clasesData = [];
    this.alumnosClase = [];
    
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    console.log(this.id);

    this.obtenerCentro();
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
        this.obtenerClasesCentro();
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
          name: '',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: true,
            formatter: (params) => {
              switch (params.name) {
                case 'Con Riesgo':
                  return this.conRiesgo.map(clase => clase.nombre).join(', '); 
                case 'Sin Riesgo':
                  return this.sinRiesgo.map(clase => clase.nombre).join(', ');
                case 'Normal':
                  return `${this.conysinRiesgo}`;
                default:
                  return params.name;
              }
              
            },
            position: 'outside'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            { value: this.conRiesgo.length, name: 'Con Riesgo', itemStyle: { color: '#F7835B' }},
            { value: this.sinRiesgo.length, name: 'Sin Riesgo', itemStyle: { color: '#2ecc71' } },
            { value: this.conysinRiesgo.length, name: 'Normal', itemStyle: { color: '#F2F75B' } }
          ]
        }
      ]
    };
    option && myChart.setOption(option);
  }

  obtenerClasesCentro(){
    this.clasesService.getClasesCentro(this.centro).subscribe((data: any)=> {
      this.clasesData = data;
      console.log(this.clasesData);
      this.totalClases = this.clasesData.clases.length;
      this.obtenerAlumnosClases();
    }, (error) => {
      console.log('Errorrororor', error);
    });
    
  }

  obtenerAlumnosClases() {
    if (this.clasesData) {
      for (let i = 0; i < this.totalClases; i++) {
        this.alumnoService.getAlumnosClase(this.clasesData.clases[i].ID_Clase).subscribe(
          (data: any) => {
            this.analizarAlumnos(data, i);
          },
          (error) => {
            console.log('Error al obtener alumnos:', error);
          }
        );
      }
    }
  }
  
  analizarAlumnos(data: any, index: number) {
    this.alumnosClase = data;
    console.log(this.alumnosClase);
    this.contBueno = 0;
    this.contMalo = 0;
  
    for (let j = 0; j < this.alumnosClase.alumnos.length; j++) {
      const estado = this.alumnosClase.alumnos[j].Estado;
      if (estado === 'Bueno' || estado === 'Muy Bueno') {
        this.contBueno++;
      } else if (estado === 'Malo' || estado === 'Muy Malo') {
        this.contMalo++;
      }
    }
  
    if (this.contBueno > this.contMalo) {
      this.sinRiesgo.push({nombre: this.clasesData.clases[index]?.Nombre, cont:this.contBueno});
    } else if (this.contMalo > this.contBueno) {
      this.conRiesgo.push({nombre: this.clasesData.clases[index]?.Nombre, cont:this.contMalo});
    } else if (this.contBueno === this.contMalo && (this.contBueno !== 0 && this.contMalo !== 0 ) ) {
      this.conysinRiesgo.push(this.clasesData.clases[index]?.Nombre);
      console.log('La clase no tiene alumnos o tiene el mismo número de buenos y malos.');
    }
    this.sinRiesgo.sort((a, b) => b.cont - a.cont);
    this.conRiesgo.sort((a, b) => b.cont - a.cont);

  
    console.log('Clases sin riesgo:', this.sinRiesgo);
    console.log('Clases con riesgo:', this.conRiesgo);
    console.log('Clases limbo:', this.conysinRiesgo);
    this.dibujarGrafica();
  }

  buscarPeorAmbito(){

  }
}
