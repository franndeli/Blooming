import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PreguntaService } from '../../../services/preguntas.service';
import { OpcionService } from '../../../services/opciones.service';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.css']
})
export class ConversacionComponent implements OnInit {
  dialogText: string;
  preguntas: any;
  opcionesData: any;
  idPregunta: number;
  opcionActualIndex: number;


  constructor(private preguntaService: PreguntaService, private opcionService: OpcionService) {
    this.dialogText = '';
    this.preguntas = [];
    this.opcionesData = [];
    this.idPregunta = 1;
    this.opcionActualIndex = -1;
  }
  
  ngOnInit() {
    Promise.all([
      this.cargarPregunta(),
      this.cargarOpciones()
    ]).then(() => {
      this.mostrarPregunta();
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

  mostrarPregunta() {
    this.dialogText = this.preguntas[0];
  }

  seleccionarRespuesta(respuesta: any) {
    this.idPregunta = respuesta.ID_PreguntaSiguiente;
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
    }
  }

  onMouseOver(index: number) {
    this.opcionActualIndex = index;
  }

  onMouseOut() {
    this.opcionActualIndex = -1;
  }
}

