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
  claseid?: number;
  nombre: string;
  cont: number;
  maxalumnos?: number;
}

interface AlumnosInfo {
  idAlumno?: number;
  nombre: string;
  apellidos: string;
  clase: string;
  estado: string;
}

interface ClasesExisten {
  nombre: string;
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
  public alumnosClases: any;
  public clasesData: any;
  public totalAlumnos = 0;
  public centro: any;
  profesoresData: any;
  id: any;
  private clasID: any;
  alu: any;

  public posActual = 0;
  public filPag = 5;

  public contMalo = 0;
  public contBueno = 0;
  public totalClases = 0;
  conRiesgo: ClaseInfo[] = [];
  sinRiesgo: ClaseInfo[] = [];
  conysinRiesgo: ClaseInfo[] = [];
  clasesExisten: ClasesExisten[] = [];
  public alumnosClase: any;
  public alumnosAmbitos: any;
  alumnosInfo: AlumnosInfo[] = [];
  private claseID: any;

  

  constructor(private clasesService: ClaseService, private profesorService: ProfesorService, private centroService: CentroService, private alumnoService: AlumnoService, private respuestaService: RespuestaService, private router: Router, private activatedRoute: ActivatedRoute, private sesionService: SesionService){
    this.respuestasData = [];
    this.sesiones = {};
    this.alumnosData = [];
    this.clasesData = [];
    this.alumnosClase = [];
    this.alumnosAmbitos = [];
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');

    this.obtenerCentro();
    this.obtenerTodosAlumnos();
    
  }

  obtenerTodosAlumnos(){
    this.alumnoService.getAlumnos().subscribe((res: any) => {
      this.alumnosData = res.alumnos;
      this.totalAlumnos = this.alumnosData.length;
      console.log(this.alumnosData);
    }, error => {
      console.error('Error al obtener los alumnos:', error);
    });
    
  }

  obtenerCentro(){
    this.profesorService.getProfesorID(this.id).subscribe(
      (data: any) => {
        this.centro = data.profesores[0].ID_Centro; 
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
    this.contBueno = 0;
    this.contMalo = 0;
  
    for (let j = 0; j < this.alumnosClase.alumnos.length; j++) {
      const estado = this.alumnosClase.alumnos[j].Estado;
      if(this.alumnosClase.alumnos[j].ID_Centro === this.centro){
        if (estado === 'Bueno' || estado === 'Muy Bueno') {
          this.contBueno++;
        } else if (estado === 'Malo' || estado === 'Muy Malo') {
          this.contMalo++;
        }
      }
    }
    if (this.contBueno > this.contMalo) {
      this.sinRiesgo.push({nombre: this.clasesData.clases[index]?.Nombre, cont:this.contBueno});
      this.clasesExisten.push({nombre: this.clasesData.clases[index].Nombre});
    } else if (this.contMalo > this.contBueno) {
      this.conRiesgo.push({claseid: this.clasesData.clases[index]?.ID_Clase,nombre: this.clasesData.clases[index]?.Nombre, cont:this.contMalo, maxalumnos: this.clasesData.clases[index]?.NumAlumnos});
      this.clasesExisten.push({nombre: this.clasesData.clases[index].Nombre});
    } else if (this.contBueno === this.contMalo && (this.contBueno !== 0 && this.contMalo !== 0 ) ) {
      this.conysinRiesgo.push(this.clasesData.clases[index]?.Nombre);
      this.clasesExisten.push({nombre: this.clasesData.clases[index].Nombre});
    }
    this.sinRiesgo.sort((a, b) => b.cont - a.cont);
    this.conRiesgo.sort((a, b) => b.cont - a.cont);
    this.dibujarGrafica();
    this.onChangeClase(this.clasesExisten[0].nombre);
  }

  onChangeClase(event: any) {
    this.alumnosInfo = [];
    let nombreSeleccionado: string | undefined = event.target?.value;
    if(!nombreSeleccionado){
      nombreSeleccionado = this.clasesExisten[0].nombre;
    }
    if (nombreSeleccionado) {
      for(let i=0; i<this.alumnosData.length; i++){
        if(this.alumnosData[i].Clase.Nombre === nombreSeleccionado && this.alumnosData[i].ID_Centro === this.centro){
          if( this.alumnosData[i].Estado === 'Malo'){
            this.alumnosInfo.push({idAlumno: this.alumnosData[i].ID_Alumno , nombre: this.alumnosData[i].Nombre, apellidos: this.alumnosData[i].Apellidos, clase: this.alumnosData[i].Clase, estado: this.alumnosData[i].Estado});
          } else if(this.alumnosData[i].Estado === 'Muy Malo'){
            this.alumnosInfo.push({ nombre: this.alumnosData[i].Nombre, apellidos: this.alumnosData[i].Apellidos, clase: this.alumnosData[i].Clase, estado: this.alumnosData[i].Estado});
          }
        }
      }
    }
  }

  verClase(claseID: any){
    this.clasID = claseID;
    this.setClaseID();
    this.router.navigate(['profesores/ver-alumnos'], {state: {claseID}});
  }

  setClaseID(){
    this.clasesService.setClaseID(this.clasID);
  }

  /*verPerfil(alumno: any) {
    let alu: any = {}; // Inicializa como objeto vacío
    let claseID: number | null = null; // Inicializa claseID como null por defecto
  
    for (let i = 0; i < this.alumnosData.length; i++) {
      if (this.alumnosData[i].ID_Alumno === alumno) {
        alu = this.alumnosData[i];
        claseID = this.alumnosData[i].ID_Clase;
        break; // Salir del bucle una vez encontrado el alumno
      }
    }
  
    if (alu && claseID !== null) {
      console.log(alu);
      console.log(claseID);
      this.router.navigate(['profesores/ver-perfil-alumno'], { state: { alu, claseID } });
    } else {
      console.error('Alumno no encontrado o falta información');
      // Puedes manejar el caso en el que el alumno no se encuentra
    }
  }*/
  
}
