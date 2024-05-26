import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesorService } from '../../services/profesores.service';
import { ClaseService } from '../../services/clases.service';
import { AlumnoService } from '../../services/alumnos.service';
import Swal from 'sweetalert2'
import * as echarts from 'echarts'; 
import { Console } from 'console';
import { SesionService } from '../../services/sesiones.service';

interface ComparacionAmbito {
  clase: string;
  mejora: string;
  cambio: number;
}

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent implements OnInit{

  clasesData: any; 
  private id: any;
  private clasID: any;
  private centroID: any; //id centro actual

  private totalMediaClase=0;// Objeto para almacenar las medias emocionales por clase
  private alumnosPorClase = 0;
  alumnosTodosData: any;
  public totalAlumnos = 0;

 //id actual
  public IdClaseActual: any;
  public alumnosEnClaseArray : any;
  //total en 1 clase
  public totalAlumnosClase = 0;
  public esClase = false;
  public claseProfeId: any;

  resultadosComparacion: ComparacionAmbito[] = [];

  constructor(private claseService: ClaseService, private profesorService: ProfesorService, private alumnoService: AlumnoService, private router: Router, private sesionService: SesionService){
    this.clasesData = [];
    this.alumnosTodosData = [];
    
  }

  ngOnInit() {
    if(localStorage.getItem('ID_Clase')){
      localStorage.removeItem('ID_Clase');
    }

    if(localStorage.getItem('ID_Alumno')){
      localStorage.removeItem('ID_Alumno');
    }
    this.getClases(); //obtenemos las clases
    this.obtenerIDprofesor();
  }

  /*MÉTODO PARA MOSTRAR LA ETIQUETA DE TU CLASE"*/
  obtenerIDprofesor(){
    this.id = localStorage.getItem('id'); // ID del profesor
    //console.log("ID PROFESOR", this.id);
    this.obtenerClaseProfesor();
  }

  obtenerClaseProfesor(){ 
    this.profesorService.getProfesorID(this.id).subscribe((res: any) => {
      //console.log("INFO PROFESOR", res);
      this.claseProfeId = res.profesores[0].ID_Clase;
      //console.log("ID CLASE PROFESOR", this.claseProfeId);
    });
  }

  esClaseProfe(idClase: any){
    if(this.claseProfeId == idClase){
      return true;
    }else{
      return false;
    }
  }

  /*MÉTODOS PARA LA GRÁFICA*/
  getClases(){
    this.id = localStorage.getItem('id'); // ID del profesor
    this.profesorService.getProfesorID(this.id).subscribe((res: any) => {
     //console.log("INFO PROFESOR", res);
    
      this.centroID = res.profesores[0].ID_Centro;
      this.claseService.getClasesCentro(this.centroID).subscribe(res => {
        this.clasesData = res; // Almacena los datos de las clases en la variable
        //console.log("INFO CLASES DATA" , this.clasesData);
        this.clasesData.clases = this.clasesData.clases.sort((a: any, b: any) => {
          if (a.ID_Clase === this.claseProfeId) return -1; // a (clase del profesor) debe estar primero
          if (b.ID_Clase === this.claseProfeId) return 1;  // b (clase del profesor) debe estar primero
          return 0; // Si ninguno es la clase del profesor, no cambiar el orden
        });
        this.clasesData.clases.forEach((clase: any) => {
          this.IdClaseActual = clase.ID_Clase; // Establecemos la clase actual
          //console.log('ID de la clase actual:', this.IdClaseActual);
          this.getAlumnosClaseActual(clase.ID_Clase); 
        });
      });
      
    });
  }

  getAlumnosClaseActual(claseID: any){  
    this.alumnoService.getAlumnosClase(claseID).subscribe(res => {
      this.alumnosEnClaseArray = res;
      //console.log('Alumnos en la clase actual:', this.alumnosEnClaseArray);
      this.totalAlumnosClase = this.alumnosEnClaseArray.alumnos.length;
      //console.log('Total de alumnos en la clase actual:', this.totalAlumnosClase);
      // Llamamos a mediaEmocional() después de obtener los datos de los alumnos en la clase actual
      this.mediaEmocional(claseID);
      
    })
  }

  mediaEmocional(claseID: any) {
    let totalClase = 0;
    let totalAmigos = 0;
    let totalFamilia = 0;
    let totalEmociones = 0;
    let totalFueraClase = 0;
    let totalAlumnosConsiderados = 0;
    
    let alumnos: any[] =[];
    let todos:any[] = [];

    //console.log("alumnos entran en la mediaEmocional", this.alumnosEnClaseArray);
    //array de los alumnos de esa clase
    alumnos = this.alumnosEnClaseArray.alumnos;
    //array con todos los alumnos de ese profesor
    //todos = this.alumnosTodosData.alumnos;
    //console.log("todos", todos);

    alumnos.forEach((alumno: any) => {
      const ambitosJSON = alumno.Ambitos;
      const ambitosObj = JSON.parse(ambitosJSON);

      // Acceder al valor numérico de cada ámbito
      const valorClase = ambitosObj['Clase'];
      const valorAmigos = ambitosObj['Amigos'];
      const valorFamilia = ambitosObj['Familia'];
      const valorEmociones = ambitosObj['Emociones'];
      const valorFueraClase = ambitosObj['Fuera de clase'];

      //console.log('Valor de Clase:', valorClase);
      //console.log('Valor de Amigos:', valorAmigos);
      //console.log('Valor de Familia:', valorFamilia);
      //console.log('Valor de Emociones:', valorEmociones);
      //console.log('Valor de Fuera de clase:', valorFueraClase);
    });

    // Iterar sobre los datos de todos los alumnos en la clase
    for (let i = 0; i < alumnos.length; i++) {
        const ambitoJSON = alumnos[i].Ambitos;
        const ambitoObj = JSON.parse(ambitoJSON);
        // Sumar el valor numérico de cada ámbito emocional
        if (ambitoObj.hasOwnProperty('Clase')) {
          totalClase += Number(ambitoObj['Clase']);
        }
        if (ambitoObj.hasOwnProperty('Amigos')) {
          totalAmigos += Number(ambitoObj['Amigos']);
        }
        if (ambitoObj.hasOwnProperty('Familia')) {
          totalFamilia += Number(ambitoObj['Familia']);
        }
        if (ambitoObj.hasOwnProperty('Emociones')) {
          totalEmociones += Number(ambitoObj['Emociones']);
        }
        if (ambitoObj.hasOwnProperty('Fuera de clase')) {
          totalFueraClase += Number(ambitoObj['Fuera de clase']);
        }

        totalAlumnosConsiderados++;
      //console.log('Total de alumnos considerados:', totalAlumnosConsiderados);
    }

    // Calcular la suma total de los ámbitos de todos los alumnos
    const total = totalClase + totalAmigos + totalFamilia + totalEmociones + totalFueraClase;

    // Calcular la media emocional de la clase solo si hay alumnos considerados
    if (totalAlumnosConsiderados > 0) {
      this.totalMediaClase = total / totalAlumnosConsiderados/5 ;
      //console.log('Media emocional de la clase', claseID, ':', this.totalMediaClase);
      // Llamar a initECharts() después de calcular la media emocional
      this.initECharts(claseID, this.totalMediaClase);
      this.calcularMediaAnterior(claseID, this.totalMediaClase);
    } else {
      //console.log('No hay alumnos considerados para calcular la media emocional de la clase', claseID);
      this.totalMediaClase = 0;
      this.initECharts(claseID, this.totalMediaClase);
      this.calcularMediaAnterior(claseID, this.totalMediaClase);
    }
    
  }

  async calcularMediaAnterior(claseID: any, totalmedia: any){
    totalmedia = parseFloat(totalmedia.toFixed(3));
    let alumnos: any[] =[];
    alumnos = this.alumnosEnClaseArray.alumnos;
    let totalSum = 0;
    let count = 0;
    if(alumnos.length > 0){
      for (let i = 0; i < alumnos.length; i++){
        await new Promise<void>((resolve, reject) => {
          this.sesionService.getSesionesAlumno(alumnos[i].ID_Alumno, 7).subscribe((res: any) => {
            if(res.sesiones.length > 0){
              let ambitosAnteriores = res.sesiones[0].ValorAmbitoFin;
              let data = JSON.parse(ambitosAnteriores);
              let values: number[] = Object.values(data) as number[];
              let sum = values.reduce((a, b) => a + b, 0);
              let average = sum / values.length;
              totalSum += average;
              resolve(); 
            } else {
              let ambitosActuales = alumnos[i].Ambitos;
              // console.log("ambitos actuales", ambitosActuales);
              let data = JSON.parse(ambitosActuales);
              let values: number[] = Object.values(data) as number[];
              let sum = values.reduce((a, b) => a + b, 0);
              let average = sum / values.length;
              totalSum += average;
              resolve();
            }
          });
        });
      }
      totalSum = totalSum / alumnos.length;
      totalSum = parseFloat(totalSum.toFixed(3));
      //console.log(totalSum);
      if(totalmedia > totalSum){
        this.resultadosComparacion.push({clase: claseID, mejora: 'mejora', cambio: parseFloat((totalmedia - totalSum).toFixed(2))});
      } else if(totalmedia < totalSum){
        this.resultadosComparacion.push({clase: claseID, mejora: 'empeora', cambio: parseFloat((totalSum - totalmedia).toFixed(2))});
      } else {
        this.resultadosComparacion.push({clase: claseID, mejora: 'igual', cambio: 0});
      }
    } else {
      this.resultadosComparacion.push({clase: claseID, mejora: 'igual', cambio: 0});
    }
    //console.log("ams:", this.resultadosComparacion);
  }


  initECharts(claseID: any, totalMediaClase: any) {
    const chartElement = document.getElementById('echarts-chart-' + claseID);
    const chart = echarts.init(chartElement);

    // console.log('Total media clase grafiicccccca:', totalMediaClase);
    const option = {
      series: [
        {
          type: 'gauge',
          progress: {
              show: true,
              width: 18,
              itemStyle: {  
                color: this.getItemColor(totalMediaClase)
              } 
          }, 
          pointer: {
            itemStyle: {  
              color: this.getItemColor(totalMediaClase)
            } 
          },
          axisLine: {
              lineStyle: {
                  width: 18
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
            show:false,
              length: 15,
              lineStyle: {
                  width: 2,
                  color: '#9989'
              }
          },
          axisLabel: {
            show:false,
              distance: 25,
              color: '#99r9',
              fontSize: 20
          },
          anchor: {
              show: true,
              showAbove: true,
              size: 25,
            
              itemStyle: {
                  borderWidth: 0,
                  color: this.getItemColor(totalMediaClase)
              }
          },
          title: {
            offsetCenter: [0, '114%'],
            fontSize: 15,
            fontWeight: 'bold' ,
            color: 'rgb(42, 53, 71)'
          },
          detail: {
              valueAnimation: true,
              fontSize: 20,
              offsetCenter: [0, '70%']
          },
          data: [
              {
                  value:  Math.round(totalMediaClase) ,
                  name: 'Media emocional'
              }
          ]
        }
      ]
    };
    chart.setOption(option);
  }
  getItemColor(totalMediaClase:any) {
    // Determinar el color según el valor del porcentaje
    if (totalMediaClase >= 0 && totalMediaClase <= 20) {
        return 'rgb(233, 31, 31)'; // Color rojo para porcentajes del 0% al 20%
    } else if (totalMediaClase > 20 && totalMediaClase <= 40) {
        return '#F7C65B'; // Color naranja para porcentajes del 21% al 40%
    } else if (totalMediaClase > 40 && totalMediaClase <= 60) {
        return '#dce232'; 
    } else if (totalMediaClase > 60 && totalMediaClase <= 80) {
        return '#8aca69'; 
    } else {
        return '#61AB3D'; // Color verde para porcentajes del 81% al 100%
    }
  }

  verClase(claseID: any){
    // this.clasID = claseID;
    localStorage.setItem('ID_Clase', claseID);
    this.setClaseID();
    this.router.navigate(['profesores/ver-alumnos'], {state: {claseID}});
  }

  setClaseID(){
    this.claseService.setClaseID(this.clasID);
  }

}
