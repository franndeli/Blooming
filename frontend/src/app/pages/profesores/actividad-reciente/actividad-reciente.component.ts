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
      console.log(this.alumnosData);
    });
  }

  obtenerSesionesAlumnos(){
    this.sesionService.getSesionesCentro(this.idCentro).subscribe((res: any) => {
      console.log(res);
      this.sesionesData = [];
      for(let i=0; i < this.alumnosData.length ; i++){
        for(let j=0; j < res.sesiones.length; j++){
          if(res.sesiones[j].ID_Alumno === this.alumnosData[i].ID_Alumno){
            this.sesionesData.push(res.sesiones[j]);
          }
        }  
      }
      //console.log(this.sesionesData);
      this.contarSesionesPorDia();
      
    }); 
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
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

  contarSesionesPorDia() {
    const sesionesPorDia: { [fecha: string]: number } = {};
  
    this.sesionesData.forEach((sesion: any) => {
      // Verificar si la propiedad 'FechaInicio.Fecha' está presente y tiene un formato correcto
      if (sesion.FechaInicio && sesion.FechaInicio.Fecha && typeof sesion.FechaInicio.Fecha === 'string') {
        const fechaInicio = new Date(sesion.FechaInicio.Fecha);
        const diaSemana = fechaInicio.getDay(); // Obtener el día de la semana (0: Domingo, 1: Lunes, ...)
        sesionesPorDia[diaSemana] = (sesionesPorDia[diaSemana] || 0) + 1; // Contar sesiones por día
      } else {
        console.error('La propiedad "FechaInicio.Fecha" no está presente o tiene un formato incorrecto:', sesion);
        // Puedes agregar lógica adicional para manejar estos casos, como ignorar la sesión o registrar un error
      }
    });
  
    // Actualizar el array actividadPorDia con los datos de sesionesPorDia
    this.actividadPorDia = [0, 0, 0, 0, 0, 0, 0]; // Inicializar el array con 0 para cada día de la semana
    Object.keys(sesionesPorDia).forEach((dia) => {
      this.actividadPorDia[parseInt(dia)] = sesionesPorDia[dia];
    });
    console.log(sesionesPorDia);
    this.dibujarGrafica(); // Llamar a la función para dibujar la gráfica
  }
  
  dibujarGrafica() {
    var chartDom = document.getElementById('chart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: 'Actividad de los alumnos en la aplicación'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.actividadPorDia,
          type: 'line',
          areaStyle: {},
          itemStyle: {
            color: 'rgba(91, 184, 115, 0.7)' 
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }
}
