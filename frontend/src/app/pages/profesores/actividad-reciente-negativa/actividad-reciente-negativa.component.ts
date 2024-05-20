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
  //public alumnosClases: any;
  public clasesData: any;
  public totalAlumnos = 0;
  public centroID: any;
  profesoresData: any;
  id: any;
  private clasID: any;
  alu: any;

  public posActual = 0;
  public filPag = 5;

  public contMalo = 0;
  public contBueno = 0;
  public contNormal = 0;
  public totalClases = 0;
  conRiesgo: ClaseInfo[] = [];
  sinRiesgo: ClaseInfo[] = [];
  conysinRiesgo: ClaseInfo[] = [];
  clasesExisten: ClasesExisten[] = [];
  public alumnosClase: any;
  public alumnosAmbitos: any;
  alumnosInfo: AlumnosInfo[] = [];
  alumnosInfo2: AlumnosInfo[] = [];
  private claseID: any;
  private gravedad: number = -1;
  

  constructor(private clasesService: ClaseService, private profesorService: ProfesorService, private centroService: CentroService, private alumnoService: AlumnoService, private respuestaService: RespuestaService, private router: Router, private activatedRoute: ActivatedRoute, private sesionService: SesionService){
    this.respuestasData = [];
    this.sesiones = {};
    this.alumnosData = [];
    this.clasesData = [];
    this.alumnosClase = [];
    this.alumnosAmbitos = [];
  }

  ngOnInit() {

    if(localStorage.getItem('ID_Clase')){
      localStorage.removeItem('ID_Clase');
    }

    if(localStorage.getItem('ID_Alumno')){
      localStorage.removeItem('ID_Alumno');
    }
    
    this.id = localStorage.getItem('id');
    this.obtenerCentro();
  }

  obtenerTodosAlumnos(){
    this.alumnoService.getAlumnosCentro(this.centroID).subscribe((res: any) => {
      this.alumnosData = res.alumnos;
      this.totalAlumnos = this.alumnosData.length;
      //console.log(this.alumnosData);
    }, error => {
      console.error('Error al obtener los alumnos:', error);
    });
  }

  obtenerCentro(){
    this.profesorService.getProfesorID(this.id).subscribe(
      (data: any) => {
        this.centroID = data.profesores[0].ID_Centro; 
        this.obtenerRespuestas();
        this.obtenerClasesCentro();
        this.obtenerTodosAlumnos();
      },
      (error: any) => {
        console.error('Error al obtener el centro:', error);
      }
    );
  }

  obtenerRespuestas(){
    this.respuestaService.getRespuestasCentro(this.centroID, this.gravedad, 0, 5).subscribe((res: any) => {
      this.respuestasData = res.respuestas;
    });
  }

  mostrarMensaje: boolean = true;
  hayDatos: boolean = false;
  
  dibujarGrafica(){
    type EChartsOption = echarts.EChartsOption;
    if (this.conRiesgo.length > 0 || this.sinRiesgo.length > 0 || this.conysinRiesgo.length > 0) {
      this.hayDatos = true;
    } else {
      this.hayDatos = false;
    }

    this.mostrarMensaje = !this.hayDatos;
    
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
              fontSize: 35,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            { value: this.conRiesgo.length, name: 'Con Riesgo', itemStyle: { color: 'rgb(233, 31, 31)' }},
            { value: this.sinRiesgo.length, name: 'Sin Riesgo', itemStyle: { color: '#61AB3D' } },
            { value: this.conysinRiesgo.length, name: 'Normal', itemStyle: { color: '#dce232' } }
          ]
        }
      ]
    };
    option && myChart.setOption(option);
  }

  obtenerClasesCentro(){
    this.clasesService.getClasesCentro(this.centroID, this.posActual, this.filPag).subscribe((res: any)=> {
      if(res["clases"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.filPag;
          if(this.posActual < 0){
            this.posActual = 0
          }
          this.obtenerClasesCentro();
        }else {
          this.clasesData = [];
          this.totalClases = 0;
        }
      }else{
        this.clasesData = res.clases;
        this.totalClases = res.page.total;
      }
      this.obtenerAlumnosClases();
    }, (error) => {
      //console.log('Error al obtener la clase', error);
    });
}

  obtenerAlumnosClases() {
    if (this.clasesData) {
      this.clasesData.forEach((clase: { ID_Clase: number }, index: number) => {
        this.alumnoService.getAlumnosClase(clase.ID_Clase).subscribe((res: any) => {
            this.analizarAlumnos(res.alumnos, index);
          },
          (error) => {
            //console.log('Error al obtener los alumnos del centro:', error);
          }
        );
      });
    }
  }
  
  analizarAlumnos(data: any, index: number) {
    this.alumnosClase = data;
    this.contBueno = 0;
    this.contMalo = 0;
  
    for (let j = 0; j < this.alumnosClase.length; j++) {
      const estado = this.alumnosClase[j].Estado;
      if(this.alumnosClase[j].ID_Centro === this.centroID){
        if (estado === 'Bueno' || estado === 'Muy Bueno') {
          this.contBueno++;
        } else if (estado === 'Malo' || estado === 'Muy Malo') {
          this.contMalo++;
        } else {
          this.contNormal++;
        }
      }
    }
    if (this.contBueno > this.contMalo) {
      this.sinRiesgo.push({nombre: this.clasesData[index]?.Nombre, cont:this.contBueno, maxalumnos: this.clasesData[index]?.NumAlumnos});
      this.clasesExisten.push({nombre: this.clasesData[index].Nombre});
    } else if (this.contMalo > this.contBueno) {
      this.conRiesgo.push({claseid: this.clasesData[index]?.ID_Clase,nombre: this.clasesData[index]?.Nombre, cont:this.contMalo, maxalumnos: this.clasesData[index]?.NumAlumnos});
      this.clasesExisten.push({nombre: this.clasesData[index].Nombre});
    } else if ((this.contBueno === this.contMalo && (this.contBueno !== 0 && this.contMalo !== 0)) 
      || (this.contBueno === this.contMalo && this.contNormal !== 0)) {
      this.conysinRiesgo.push(this.clasesData[index]?.Nombre);
      this.clasesExisten.push({nombre: this.clasesData[index].Nombre});
    }
    this.sinRiesgo.sort((a, b) => b.cont - a.cont);
    this.conRiesgo.sort((a, b) => b.cont - a.cont);

    this.dibujarGrafica();

    this.onChangeClase(this.clasesExisten[0].nombre);
    this.onChangeClase2(this.clasesExisten[0].nombre);
  }

  onChangeClase(event: any) {
    this.alumnosInfo = [];
    let nombreSeleccionado: string | undefined = event.target?.value;
    if(!nombreSeleccionado){
      nombreSeleccionado = this.clasesExisten[0].nombre;
    }
    if (nombreSeleccionado) {
      for(let i=0; i<this.alumnosData.length; i++){
        if(this.alumnosData[i].Clase.Nombre === nombreSeleccionado){
          if( this.alumnosData[i].Estado === 'Malo'){
            this.alumnosInfo.push({idAlumno: this.alumnosData[i].ID_Alumno , nombre: this.alumnosData[i].Nombre, apellidos: this.alumnosData[i].Apellidos, clase: this.alumnosData[i].Clase, estado: this.alumnosData[i].Estado});
          } else if(this.alumnosData[i].Estado === 'Muy Malo'){
            this.alumnosInfo.push({ nombre: this.alumnosData[i].Nombre, apellidos: this.alumnosData[i].Apellidos, clase: this.alumnosData[i].Clase, estado: this.alumnosData[i].Estado});
          }
        }
      }
      const ordenarPorEstado = (a: AlumnosInfo, b: AlumnosInfo) => {
        if (a.estado === 'Muy Malo' && b.estado !== 'Muy Malo') {
          return -1; 
        } else if (a.estado !== 'Muy Malo' && b.estado === 'Muy Malo') {
          return 1; 
        } else {
          return 0; 
        }
      };
      this.alumnosInfo.sort(ordenarPorEstado);
    }
  }

  onChangeClase2(event: any){
    this.alumnosInfo2 = [];
    let nombreSeleccionado: string | undefined = event.target?.value;
    if(!nombreSeleccionado){
      nombreSeleccionado = this.clasesExisten[0].nombre;
    }
    
    if (nombreSeleccionado) {
      for(let i=0; i<this.alumnosData.length; i++){
        if(this.alumnosData[i].Clase.Nombre === nombreSeleccionado){
          if( this.alumnosData[i].Estado === 'Bueno'){
            this.alumnosInfo2.push({idAlumno: this.alumnosData[i].ID_Alumno , nombre: this.alumnosData[i].Nombre, apellidos: this.alumnosData[i].Apellidos, clase: this.alumnosData[i].Clase, estado: this.alumnosData[i].Estado});
          } else if(this.alumnosData[i].Estado === 'Muy Bueno'){
            this.alumnosInfo2.push({ nombre: this.alumnosData[i].Nombre, apellidos: this.alumnosData[i].Apellidos, clase: this.alumnosData[i].Clase, estado: this.alumnosData[i].Estado});
          }
        }
      }
      const ordenarPorEstado = (a: AlumnosInfo, b: AlumnosInfo) => {
        if (a.estado === 'Muy Bueno' && b.estado !== 'Muy Bueno') {
          return -1; 
        } else if (a.estado !== 'Muy Bueno' && b.estado === 'Muy Bueno') {
          return 1; 
        } else {
          return 0; 
        }
      };
      
      this.alumnosInfo2.sort(ordenarPorEstado);
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

  verPerfil(alumnoID: any){
    const volverPag = 1;
    localStorage.setItem('ID_Alumno', alumnoID);
    this.router.navigate(['profesores/ver-perfil-alumno'], {state: {alumnoID, volverPag} });
  }

  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.obtenerClasesCentro();
  }

  cambiarGravedad(event: any){
    this.gravedad = parseInt(event.target?.value);
    this.obtenerRespuestas();
  }
}
