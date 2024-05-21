import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { SesionService } from '../../../services/sesiones.service';
import { RespuestaService } from '../../../services/respuestas.service';
import * as echarts from 'echarts';
import { Console } from 'console';
import * as xmlbuilder from 'xmlbuilder';
import jsPDF from 'jspdf';
import Epub from 'epub-gen';
import Papa from 'papaparse';

interface ComparacionAmbito {
  nombre: string;
  mejora: string;
  cambio: number;
}

interface Respuesta {
  FechaRespuesta: string;
  Pregunta: { TextoPregunta: string };
  Opcion: { TextoOpcion: string };
}

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
  private gravedad: number = -1;
  public nombresAmbitos: any = [];
  private volverPag: number = 0;
  public tendenciaAmbitos: any = [];
  public ambitosAnteriores: any = [];
  resultadosComparacion: ComparacionAmbito[] = [];

  constructor(private respuestaService: RespuestaService, private router: Router, private activatedRoute: ActivatedRoute, private sesionService: SesionService, private alumnoService: AlumnoService){
    this.alumnosData = [];
    this.respuestasData = [];
    this.sesiones = {};
    this.tendenciaAmbitos = [];
  }

  ngOnInit() {
    this.sesiones.Ambitos = {};
    this.sesiones.Dias = {};
    this.activatedRoute.paramMap.subscribe(params => {
      this.alumnoID = history.state.alumnoID;
      this.volverPag = history.state.volverPag;
      this.claseID = history.state.claseID;
    });

    if(this.alumnoID === undefined || this.alumnoID === null){
      this.alumnoID = localStorage.getItem('ID_Alumno');
    }

    this.obtenerAlumno();
    this.obtenerRespuestas();
    //this.obtenerSesiones();
    this.compararAmbitos();
  }

  ngAfterViewInit() {
    this.obtenerSesiones();
  }

  obtenerAlumno(){
    this.alumnoService.getAlumnoID(this.alumnoID).subscribe((res: any) => {
      this.alumnosData = res.alumnos[0];
      //console.log(this.alumnosData);
      this.alumnosData.Ambitos = JSON.parse(this.alumnosData.Ambitos);
      //this.sesiones.Ambitos = this.alumnosData.Ambitos;
      this.nombreClase = this.alumnosData.Clase.Nombre;

      //console.log(this.alumnosData.Ambitos);
      //console.log(this.sesiones.Ambitos);
    });
  }

  obtenerSesiones(){
    this.sesionService.getSesionesAlumno(this.alumnoID, this.dias).subscribe((res: any) => {
      const sesionesData = res.sesiones;

      //console.log(this.sesiones.Ambitos);
      //console.log(this.sesiones);
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

  mostrarMensaje: boolean = true;
  hayDatos: boolean = false;

  dibujarGrafica(){
    var chartDom = document.getElementById('chart');
    var myChart = echarts.init(chartDom);
    var option: echarts.EChartsOption;

    if(this.sesiones.Dias > 0 || this.sesiones.Ambitos.Amigos > 0 
      || this.sesiones.Ambitos.Clase > 0 || this.sesiones.Ambitos.Familia > 0 
      || this.sesiones.Ambitos.Emociones > 0 || this.sesiones.Ambitos["Fuera de clase"] > 0 ){

      this.hayDatos = true;
    } else {
      this.hayDatos = false;
    }

    this.mostrarMensaje = !this.hayDatos;


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
    this.respuestaService.getRespuestasAlumno(this.alumnoID, -1, 0, 5, 0, '').subscribe((res: any) => {
      this.respuestasData = res.respuestas;
      console.log(this.alumnoID);
    });
  }

  cambiarDias(event: any) {
    this.dias = parseInt(event.target?.value);
    this.obtenerSesiones();
  }

  getGravedadClass(gravedad: number){
    if(gravedad >= 0 && gravedad < 20){
      return 'muymalo-gravedad';
    }else if(gravedad >= 20 && gravedad <= 40){
      return 'malo-gravedad';
    } else if(gravedad >= 40 && gravedad <= 60){
      return 'normal-gravedad';
    }else if(gravedad >= 60 && gravedad <= 80){
      return 'bueno-gravedad';
    }else if(gravedad > 80 && gravedad <= 100){
      return 'muybueno-gravedad';
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

  generarPDF() {
    const pdf = new jsPDF();
    pdf.setFont('helvetica', 'bold');
    pdf.text('Preguntas del alumno ' + this.alumnosData.Nombre + ' ' + this.alumnosData.Apellidos, 105, 20, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    let yPos = 35;
    for(let i = 0; i < this.respuestasData.length; i++){
      pdf.text('Fecha: ' + this.respuestasData[i].FechaRespuesta, 15, yPos);
      pdf.text('Pregunta: ' + this.respuestasData[i].Pregunta.TextoPregunta, 15, yPos + 15);
      pdf.text('Opción: ' + this.respuestasData[i].Opcion.TextoOpcion, 15, yPos + 25);
      yPos += 45; 
    }

    pdf.save('respuestas_alumno'+this.alumnosData.ID_Alumno+'.pdf');
  }
  generarXML() {
    // Crear un documento XML
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <respuestas_alumno>
        <alumno>
            <nombre>${this.alumnosData.Nombre}</nombre>
            <apellidos>${this.alumnosData.Apellidos}</apellidos>
        </alumno>
        <respuestas>`;

    // Agregar cada respuesta como un elemento en el XML
    for(let i = 0; i < this.respuestasData.length; i++){
        const respuestaXML = `
            <respuesta>
                <fecha>${this.respuestasData[i].FechaRespuesta}</fecha>
                <pregunta>${this.respuestasData[i].Pregunta.TextoPregunta}</pregunta>
                <opcion>${this.respuestasData[i].Opcion.TextoOpcion}</opcion>
            </respuesta>`;
        
        xmlContent += respuestaXML;
    }

    // Cerrar las etiquetas del documento XML
    const finalXMLContent = xmlContent + '</respuestas></respuestas_alumno>';

    // Descargar el contenido XML como un archivo
    const blob = new Blob([finalXMLContent], { type: 'text/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'respuestas_alumno.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  generarHTML() {
    // Iniciar la construcción del documento HTML
    let htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Respuestas del alumno ${this.alumnosData.Nombre} ${this.alumnosData.Apellidos}</title>
    </head>
    <body>
        <h1>Preguntas del alumno ${this.alumnosData.Nombre} ${this.alumnosData.Apellidos}</h1>
        <ul>`;

    // Agregar cada respuesta como un elemento en la lista HTML
    for(let i = 0; i < this.respuestasData.length; i++){
        htmlContent += `
        <li>
            <strong>Fecha:</strong> ${this.respuestasData[i].FechaRespuesta}<br>
            <strong>Pregunta:</strong> ${this.respuestasData[i].Pregunta.TextoPregunta}<br>
            <strong>Opción:</strong> ${this.respuestasData[i].Opcion.TextoOpcion}<br>
        </li>`;
    }

    // Cerrar las etiquetas del documento HTML
    htmlContent += `
        </ul>
    </body>
    </html>`;

    // Descargar el contenido HTML como un archivo
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'respuestas_alumno.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  generarCSV() {
    function quitarAcentos(cadena: string): string {
      return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const nombreAlumno = `${this.alumnosData.Nombre} ${this.alumnosData.Apellidos}`;
    const nombreAlumnoSinAcentos = quitarAcentos(nombreAlumno);

    const csvData: any[] = this.respuestasData.map((respuesta: Respuesta) => ({
      Fecha: respuesta.FechaRespuesta,
      Pregunta: quitarAcentos(respuesta.Pregunta.TextoPregunta),
      Opcion: quitarAcentos(respuesta.Opcion.TextoOpcion)
    }));
  
    let csvContent = `"Nombre del Alumno: ${nombreAlumnoSinAcentos}"\n`;
    csvContent += 'Fecha,Pregunta,Opcion\n';
    csvData.forEach((item: any) => {
      const row = [
        item.Fecha,
        `"${decodeURIComponent(item.Pregunta).replace(/"/g, '""')}"`,
        `"${decodeURIComponent(item.Opcion).replace(/"/g, '""')}"`
      ];
      csvContent += row.join(',') + '\n';
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.setAttribute('download', 'respuestas_alumno.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  verMasPreguntas(alumnoID: any){
    this.router.navigate(['profesores/ver-mas-preguntas'], {state: {alumnoID, claseID: this.claseID}});
  }

  compararAmbitos(){
    this.sesionService.getSesionesAlumno(this.alumnoID, 7).subscribe((res: any) => {
      if(res.sesiones.length > 0){
        this.ambitosAnteriores = JSON.parse(res.sesiones[0].ValorAmbitoFin);
        //this.tendenciaAmbitos = this.ambitosAnteriores;
        this.resultadosComparacion = this.comparar(this.ambitosAnteriores, this.alumnosData.Ambitos);
        console.log(this.ambitosAnteriores);
        console.log(this.alumnosData.Ambitos);
        console.log(this.resultadosComparacion);
      }
    });
  }
  comparar(ambitosAnteriores: {[key: string]: number}, ambitosActuales: {[key: string]: number}): ComparacionAmbito[] {
    const resultados: ComparacionAmbito[] = [];
  
    for (const ambito in ambitosAnteriores) {
      if (ambitosAnteriores.hasOwnProperty(ambito) && ambitosActuales.hasOwnProperty(ambito)) {
        let cambio = (ambitosAnteriores[ambito] - ambitosActuales[ambito]);
        cambio = parseFloat(cambio.toFixed(2));
        let mejora: string;
        if (cambio > 0) {
          mejora = 'empeora';
        } else if (cambio < 0) {
          mejora = 'mejora';
        } else {
          mejora = 'igual';
        }
        resultados.push({
          nombre: ambito,
          mejora: mejora,
          cambio: Math.abs(cambio)
        });
      }
    }
  
    return resultados;
  }
}
