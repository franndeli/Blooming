import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { PreguntaService } from '../../../services/preguntas.service';
import { OpcionService } from '../../../services/opciones.service';
import { ResultadoService } from '../../../services/resultados.service';
import { AlumnoService } from '../../../services/alumnos.service';
//import { Texto3DService } from './ruta-hacia/texto-3d.service'; 
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
  //index: any;

  constructor(private preguntaService: PreguntaService, private opcionService: OpcionService, private resultadoService: ResultadoService, private alumnoService: AlumnoService, private zone: NgZone) {
    this.dialogText = '';
    this.preguntas = [];
    this.opcionesData = [];
    this.nivelEstado = 0;
    this.estado = "";
    this.idPregunta = 4;
    this.opcionActualIndex = -1;
    //this.index = 0;
  }
  divVisible: boolean = false;
  
  ngOnInit() {
    // Carga la pregunta y las opciones primero
    Promise.all([
      this.cargarPregunta(),
      this.cargarOpciones()
    ]).then(() => {
      // Después de que se carguen la pregunta y las opciones, espera 2 segundos
      setTimeout(() => {
        // Usa 'zone.run' para asegurarte de que los cambios en la vista se detecten en Angular
        this.zone.run(() => {
          this.divVisible = true;
          this.mostrarPregunta();
        });
      }, 2000);
    });
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

    this.resultadoService.postResultado(JSON.stringify(resultado)).subscribe(
      (response) => {
        console.log('Resultado guardado correctamente:', response);
      }, (error) => {
        console.error('Error al guadar el resultado:', error);
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
      this.dialogText = '¡Gracias por participar en la conversación!';
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
        console.log('Estado actualizado correctamente:', response);
      }, (error) => {
        console.error('Error al actualizar el estado:', error);
      }
    );

  }

  onMouseOver(index: number) {
    this.opcionActualIndex = index;
  }

  onMouseOut() {
    this.opcionActualIndex = -1;
  }
  /*
  private inicializarTexto3D() {
    // Llama al servicio para obtener el texto 3D y agrégalo a la escena
    this.texto3D = this.texto3DService.crearTexto3D('Texto 3D Aquí');
    // Configura la posición del texto3D según tus necesidades
    this.texto3D.position.set(0, 0, -5); // Ajusta la posición según tus necesidades
    // Agrega texto3D a tu escena Three.js
    this.texto3DService.agregarTexto3DAScene(this.texto3D);
  }*/
}

