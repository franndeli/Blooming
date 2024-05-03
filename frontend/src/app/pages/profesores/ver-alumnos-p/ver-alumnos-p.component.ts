import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { ClaseService } from '../../../services/clases.service';
import { RespuestaService } from '../../../services/respuestas.service'; 
import * as echarts from 'echarts';
import { event } from 'jquery';

@Component({
  selector: 'app-ver-alumnos-p',
  templateUrl: './ver-alumnos-p.component.html',
  styleUrl: './ver-alumnos-p.component.css'
})
export class VerAlumnosPComponent implements OnInit{

  ambitosData: any[] = [];
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

  public contMuyBueno = 0;
  public contBueno = 0;
  public contNormal = 0;
  public contMuyMalo = 0;
  public contMalo = 0;

  constructor(private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute, private claseService: ClaseService, private respuestaService: RespuestaService){
    this.alumnosData = [];
    this.alumnosTodosData = [];
    this.claseData = [];
    this.respuestasData = [];
  }

  ngOnInit() {
    if(localStorage.getItem('ID_Alumno')){
      localStorage.removeItem('ID_Alumno');
    }

    this.activatedRoute.paramMap.subscribe(params => {
        this.claseID = history.state.claseID;
    });

    if(this.claseID === undefined || this.claseID === null){
      this.claseID = localStorage.getItem('ID_Clase');
    }

    this.obtenerClase();
    this.obtenerAlumnos(this.busqueda);
    this.obtenerTodosAlumnos();
    this.obtenerUltimasRespuestas();
  }

  onChangeOption(event: any) {
    const selectedOption = event.target.value;

    switch (selectedOption) {
      case 'General':
        this.contarEstados();
        break;
      case 'Clase':
        this.contarClase();
        break;
      case 'Amigos':
        this.contarAmigos();
        break;
      case 'Familia':
        this.contarFamilia();
        break;
      case 'Emociones':
        this.contarEmociones();
        break;
      case 'Fuera de clase':
        this.contarFueraClase();
        break;
      default:
        break;
    }
  }

  contarEstados(){
    this.contMuyBueno=0; this.contBueno=0; this.contNormal=0; this.contMalo=0; this.contMuyMalo=0;
    
    if(this.totalAlumnos2 !== 0){
      //console.log('hola');
      let i: number;
      for(i = 0; i < this.totalAlumnos2 ; i++ ){
        //console.log(this.alumnosTodosData[i].ID_Clase);
        //console.log(this.claseID);
        if(this.alumnosTodosData[i].ID_Clase == this.claseID){
          //console.log('Primer if');
          if(this.alumnosTodosData[i] && this.alumnosTodosData[i].Estado){
            //console.log('Segundo if');
            if(this.alumnosTodosData[i].Estado === 'Bueno'){
              this.contBueno++; 
            } else if (this.alumnosTodosData[i].Estado === 'Malo') {
              this.contMalo++;
            } else if (this.alumnosTodosData[i].Estado === 'Muy Malo') {
              this.contMuyMalo++;
            } else if (this.alumnosTodosData[i].Estado === 'Muy Bueno') {
              this.contMuyBueno++;
            } else {
              this.contNormal++;
            }
          }
        }
      }
    }
    //console.log(this.contBueno);
    //console.log(this.contMalo);
    //console.log(this.contMuyMalo);
    //console.log(this.contMuyBueno);
    //console.log(this.contNormal);

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
      //console.log(this.alumnosTodosData);
      this.totalAlumnos2 = this.alumnosTodosData.length;
      this.contarEstados();
    }, error => {
      console.error('Error al obtener los alumnos:', error);
    });
    
  }

  obtenerUltimasRespuestas(){
    this.respuestaService.getRespuestasClase(this.claseID, 0, 5).subscribe((res: any) => {
      this.respuestasData = res.respuestas;
    })
  }

  getClaseEstado(estado: any): string {
    let clase = "";
    if(estado === 'Muy Bueno'){
      clase = 'badge bg-success rounded-3 fw-semibold';
    }
    if(estado === 'Bueno'){
      clase = 'badge bg-verde1 rounded-3 fw-semibold';
    }
    if(estado === 'Normal'){
      clase = 'badge bg-amarillo rounded-3 fw-semibold';
      this.contNormal++;
    }
    if(estado === 'Muy Malo'){
      clase = 'badge bg-danger rounded-3 fw-semibold';
    }
    if(estado === 'Malo'){
      clase = 'badge bg-warning rounded-3 fw-semibold';
      this.contMalo++;
    }

    return clase;
  }

  verPerfil(alumnoID: any){
    localStorage.setItem('ID_Alumno', alumnoID);
    this.router.navigate(['profesores/ver-perfil-alumno'], {state: {alumnoID, claseID: this.claseID}});
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

  mostrarMensaje: boolean = true;
  hayDatos: boolean = false;

  dibujarGrafica(){
    type EChartsOption = echarts.EChartsOption;

    if(this.contMuyBueno > 0 || this.contBueno > 0 || this.contNormal > 0 || this.contMalo > 0 || this.contMuyMalo > 0){
      this.hayDatos = true;
    } else {
      this.hayDatos = false;
    }

    this.mostrarMensaje = !this.hayDatos;
    
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
          name: 'Número Alumnos',
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
              fontSize: 35,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: this.contMuyBueno, name: 'Muy Bueno', itemStyle: { color: '#61AB3D' } },
            { value: this.contBueno, name: 'Bueno', itemStyle: { color: '#8aca69' } },
            { value: this.contNormal, name: 'Normal', itemStyle: { color: '#dce232' } },
            { value: this.contMalo, name: 'Malo', itemStyle: { color: '#F7C65B' } },
            { value: this.contMuyMalo, name: 'Muy Malo', itemStyle: { color: 'rgb(233, 31, 31)' } },
          ]
        }
      ]
    };
    
    option && myChart.setOption(option);
  }

  contarClase(){
    this.contMuyBueno=0; this.contBueno=0; this.contNormal=0; this.contMalo=0; this.contMuyMalo=0;
    
    if(this.totalAlumnos2 !== 0){
      let i: number;
      for(i = 0; i < this.totalAlumnos2 ; i++ ){
        if(this.alumnosTodosData[i].ID_Clase == this.claseID){
          if(this.alumnosTodosData[i] && this.alumnosTodosData[i].Ambitos){
            const ambitoJSON = this.alumnosTodosData[i].Ambitos;
            const ambitoObj = JSON.parse(ambitoJSON);
            const valorClase = ambitoObj['Clase'];
            if (valorClase >= 0 && valorClase <= 20) {
              this.contMuyMalo++;
            } else if (valorClase > 20 && valorClase <= 40) {
              this.contMalo++;
            } else if (valorClase > 40 && valorClase <= 60) {
              this.contNormal++;
            } else if (valorClase > 60 && valorClase <= 80) {
              this.contBueno++;
            } else if (valorClase > 80 && valorClase <= 90) {
              this.contMuyBueno++;
            }
          }
        }
      }
    }
    this.dibujarGrafica();
  }
  contarAmigos() {
    this.contMuyBueno=0; this.contBueno=0; this.contNormal=0; this.contMalo=0; this.contMuyMalo=0;
    
    if(this.totalAlumnos2 !== 0){
      let i: number;
      for(i = 0; i < this.totalAlumnos2 ; i++ ){
        if(this.alumnosTodosData[i].ID_Clase == this.claseID){
          if(this.alumnosTodosData[i] && this.alumnosTodosData[i].Ambitos){
            const ambitoJSON = this.alumnosTodosData[i].Ambitos;
            const ambitoObj = JSON.parse(ambitoJSON);
            const valorAmigos = ambitoObj['Amigos'];
            if (valorAmigos >= 0 && valorAmigos <= 20) {
              this.contMuyMalo++;
            } else if (valorAmigos > 20 && valorAmigos <= 40) {
              this.contMalo++;
            } else if (valorAmigos > 40 && valorAmigos <= 60) {
              this.contNormal++;
            } else if (valorAmigos > 60 && valorAmigos <= 80) {
              this.contBueno++;
            } else if (valorAmigos > 80 && valorAmigos <= 90) {
              this.contMuyBueno++;
            }
          }
        }
      }
    }
    this.dibujarGrafica();
  }

  contarFamilia() {
    this.contMuyBueno=0; this.contBueno=0; this.contNormal=0; this.contMalo=0; this.contMuyMalo=0;
    
    if(this.totalAlumnos2 !== 0){
      let i: number;
      for(i = 0; i < this.totalAlumnos2 ; i++ ){
        if(this.alumnosTodosData[i].ID_Clase == this.claseID){
          if(this.alumnosTodosData[i] && this.alumnosTodosData[i].Ambitos){
            const ambitoJSON = this.alumnosTodosData[i].Ambitos;
            const ambitoObj = JSON.parse(ambitoJSON);
            const valorFamilia = ambitoObj['Familia'];
            if (valorFamilia >= 0 && valorFamilia <= 20) {
              this.contMuyMalo++;
            } else if (valorFamilia > 20 && valorFamilia <= 40) {
              this.contMalo++;
            } else if (valorFamilia > 40 && valorFamilia <= 60) {
              this.contNormal++;
            } else if (valorFamilia > 60 && valorFamilia <= 80) {
              this.contBueno++;
            } else if (valorFamilia > 80 && valorFamilia <= 90) {
              this.contMuyBueno++;
            }
          }
        }
      }
    }
    this.dibujarGrafica();
  }

  contarEmociones() {
    this.contMuyBueno=0; this.contBueno=0; this.contNormal=0; this.contMalo=0; this.contMuyMalo=0;
    
    if(this.totalAlumnos2 !== 0){
      let i: number;
      for(i = 0; i < this.totalAlumnos2 ; i++ ){
        if(this.alumnosTodosData[i].ID_Clase == this.claseID){
          if(this.alumnosTodosData[i] && this.alumnosTodosData[i].Ambitos){
            const ambitoJSON = this.alumnosTodosData[i].Ambitos;
            const ambitoObj = JSON.parse(ambitoJSON);
            const valorEmociones = ambitoObj['Emociones'];
            if (valorEmociones >= 0 && valorEmociones <= 20) {
              this.contMuyMalo++;
            } else if (valorEmociones > 20 && valorEmociones <= 40) {
              this.contMalo++;
            } else if (valorEmociones > 40 && valorEmociones <= 60) {
              this.contNormal++;
            } else if (valorEmociones > 60 && valorEmociones <= 80) {
              this.contBueno++;
            } else if (valorEmociones > 80 && valorEmociones <= 90) {
              this.contMuyBueno++;
            }
          }
        }
      }
    }
    this.dibujarGrafica();
  }

  contarFueraClase() {
    this.contMuyBueno=0; this.contBueno=0; this.contNormal=0; this.contMalo=0; this.contMuyMalo=0;
    
    if(this.totalAlumnos2 !== 0){
      let i: number;
      for(i = 0; i < this.totalAlumnos2 ; i++ ){
        if(this.alumnosTodosData[i].ID_Clase == this.claseID){
          if(this.alumnosTodosData[i] && this.alumnosTodosData[i].Ambitos){
            const ambitoJSON = this.alumnosTodosData[i].Ambitos;
            const ambitoObj = JSON.parse(ambitoJSON);
            const valorFueraClase = ambitoObj['Fuera de clase'];
            if (valorFueraClase >= 0 && valorFueraClase <= 20) {
              this.contMuyMalo++;
            } else if (valorFueraClase > 20 && valorFueraClase <= 40) {
              this.contMalo++;
            } else if (valorFueraClase > 40 && valorFueraClase <= 60) {
              this.contNormal++;
            } else if (valorFueraClase > 60 && valorFueraClase <= 80) {
              this.contBueno++;
            } else if (valorFueraClase > 80 && valorFueraClase <= 90) {
              this.contMuyBueno++;
            }
          }
        }
      }
    }
    this.dibujarGrafica();
  }
}
