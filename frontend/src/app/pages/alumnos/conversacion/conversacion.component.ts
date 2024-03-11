import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { PreguntaService } from '../../../services/preguntas.service';
import { OpcionService } from '../../../services/opciones.service';
import { RespuestaService } from '../../../services/respuestas.service';
import { AlumnoService } from '../../../services/alumnos.service';
import * as THREE from 'three';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.css']
})
export class ConversacionComponent implements OnInit {
  dialogText: string;
  preguntas: any;
  opcionesData: any;
  nivelEstado: any;
  estado: any;
  idPregunta: number;
  opcionActualIndex: number;

  alumnoData: any;
  //index: any;

  constructor(private preguntaService: PreguntaService, private opcionService: OpcionService, private resultadoService: RespuestaService, private alumnoService: AlumnoService, private zone: NgZone) {
    this.dialogText = '';
    this.preguntas = [];
    this.opcionesData = [];
    this.nivelEstado = 0;
    this.estado = "";
    this.idPregunta = 4;
    this.opcionActualIndex = -1;

    this.alumnoData = [];
    //this.index = 0;
  }
  divVisible: boolean = false;
  
  ngOnInit() {
    Promise.all([
      this.cargarPregunta(),
      this.cargarOpciones()
    ]).then(() => {
      setTimeout(() => {
        this.zone.run(() => {
          this.divVisible = true;
          this.mostrarPregunta();
        });
      }, 2000);
    });

    this.obtenerAlumno();
  }

  obtenerAlumno(){
    let id = localStorage.getItem('id');
    this.alumnoService.getAlumnoID(id).subscribe((res: any) => {
      this.alumnoData = res.alumnos[0];
    })
  }

  cargarPregunta(): Promise<void>{
    return new Promise<void>((resolve) => {
      this.preguntaService.getPreguntaID(this.idPregunta).subscribe((res: any) => {
        this.preguntas = res.preguntas.map((pregunta: { TextoPregunta: string }) => pregunta.TextoPregunta);
        resolve();
      });
    });
  }

  cargarOpciones(): Promise<void>{
    return new Promise<void>((resolve) => {
      this.opcionService.getOpcionesPregunta(this.idPregunta).subscribe((res: any) => {
        this.opcionesData = res.opciones;
        resolve();
      });
    });
  }

  guardarResultado(opcionId: number, preguntaId: number){
    const resultado = {
      Respuesta: opcionId,
      ID_Alumno: localStorage.getItem('id'),
      ID_Pregunta: preguntaId
    }

    this.resultadoService.postRespuesta(JSON.stringify(resultado)).subscribe(
      (response) => {
      }, (error) => {
      }
    );

  }

  mostrarPregunta() {
    this.dialogText = this.preguntas[0];
  }

  seleccionarRespuesta(respuesta: any) {
    this.idPregunta = respuesta.ID_PreguntaSiguiente;
    this.actualizarEstado(respuesta.Gravedad);
    this.guardarResultado(respuesta.ID_Opcion, respuesta.ID_Pregunta);
    //this.index++;
    this.actualizarDialogo();
  }

  actualizarDialogo() {
    if(this.idPregunta !== 0){
      Promise.all([
        this.cargarPregunta(),
        this.cargarOpciones()
      ]).then(() => {
        this.mostrarPregunta();
      });
    }else{
      this.dialogText = '¡Nos vemos mañana '+ this.alumnoData.Nombre +' !';
      this.opcionesData = [];
      this.guardarEstado();
    }
  }

  actualizarEstado(gravedad: any){
    if(gravedad === 'Grave'){
      this.nivelEstado++;
    }
    if(gravedad === 'Leve'){
      this.nivelEstado += 0.5;
    }
  }

  guardarEstado(){
    if(this.nivelEstado <= 1){
      this.estado = 'Bueno';
    }
    if(this.nivelEstado > 1 && this.nivelEstado <= 1.5){
      this.estado = 'Normal';
    }
    if(this.nivelEstado > 1.5){
      this.estado = 'Malo';
    }
    
    const estadoData = {
      ID_Alumno: localStorage.getItem('id'),
      Estado: this.estado
    }
    
    this.alumnoService.putEstadoAlumno(estadoData).subscribe(
      (response) => {
      }, (error) => {
      }
    );

  }

  onMouseOver(index: number) {
    this.opcionActualIndex = index;
  }

  onMouseOut() {
    this.opcionActualIndex = -1;
  }
}

