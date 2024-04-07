import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { ClaseService } from '../../../services/clases.service';
import { RespuestaService } from '../../../services/respuestas.service'; 
import * as echarts from 'echarts';

@Component({
  selector: 'app-ver-alumnos-p',
  templateUrl: './ver-alumnos-p.component.html',
  styleUrl: './ver-alumnos-p.component.css'
})
export class VerAlumnosPComponent implements OnInit{

  alumnosData: any;
  alumnosTodosData: any;
  claseData: any;
  respuestasData: any;
  private claseID: any;
  public totalAlumnos = 0;
  public totalAlumnos2 = 0;
  public posActual = 0;
  public filPag = 5;
  private busqueda = '';

  public contBueno = 0;
  public contNormal = 0;
  public contMalo = 0;

  constructor(private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute, private claseService: ClaseService, private respuestaService: RespuestaService){
    this.alumnosData = [];
    this.alumnosTodosData = [];
    this.claseData = [];
    this.respuestasData = [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
        this.claseID = history.state.claseID;
    });

    if(this.claseID === '' || undefined){
      this.claseID = this.claseService.getClaseID();
    }
    this.obtenerClase();
    this.obtenerTodosAlumnos();

   
  }

  contarEstados(){
    if(this.totalAlumnos2 !== 0){
      let i: number;
      for(i = 0; i < this.totalAlumnos2 ; i++ ){
        console.log(this.alumnosTodosData[i]);
        if(this.alumnosTodosData[i].ID_Clase === this.claseID){
          if(this.alumnosTodosData[i] && this.alumnosTodosData[i].Estado){
            if(this.alumnosTodosData[i].Estado === 'Bueno'){
              this.contBueno++; 
            } else if (this.alumnosTodosData[i].Estado === 'Malo') {
              this.contMalo++;
            } else {
              this.contNormal++;
            }
          }
        }
      }
      console.log('bueno' , this.contBueno);
      console.log('normal', this.contNormal);
      console.log('malo', this.contMalo);
    }
    this.dibujarGrafica();
  }
  
  
  obtenerClase(){
    this.claseService.getClase(this.claseID).subscribe((res: any) => {
      this.claseData = res.clases[0];
    })
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

  obtenerTodosAlumnos(){
    this.alumnoService.getAlumnos().subscribe((res: any) => {
      this.alumnosTodosData = res.alumnos;
      console.log(this.alumnosTodosData);
      this.totalAlumnos2 = this.alumnosTodosData.length;
      console.log('longitud', this.totalAlumnos2);
      this.contarEstados();
    }, error => {
      console.error('Error al obtener los alumnos:', error);
    });
    
    this.obtenerAlumnos(this.busqueda);
    
  }

  obtenerUltimasRespuestas(){
    this.respuestaService.getRespuestasClase(this.claseID).subscribe((res: any) => {
      this.respuestasData = res.respuestas;
    })
  }

  getClaseEstado(estado: any): string {
    let clase = "";
    if(estado === 'Bueno'){
      clase = 'badge bg-success rounded-3 fw-semibold';
    }
    if(estado === 'Normal'){
      clase = 'badge bg-warning rounded-3 fw-semibold';
      this.contNormal++;
    }
    if(estado === 'Malo'){
      clase = 'badge bg-danger rounded-3 fw-semibold';
      this.contMalo++;
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

  dibujarGrafica(){
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('chart1')!;
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
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
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
            { value: this.contBueno, name: 'Bueno', itemStyle: { color: '#61AB3D' } },
            { value: this.contNormal, name: 'Normal', itemStyle: { color: '#ffae1f' } },
            { value: this.contMalo, name: 'Malo', itemStyle: { color: '#fa896b' } },
          ]
        }
      ]
    };
    
    option && myChart.setOption(option);
  }
}
