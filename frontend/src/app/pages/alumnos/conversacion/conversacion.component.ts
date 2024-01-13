import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PreguntaService } from '../../../services/preguntas.service';
import { OpcionService } from '../../../services/opciones.service';
import { ResultadoService } from '../../../services/resultados.service';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.css']
})
export class ConversacionComponent implements OnInit {
  dialogText: string;
  preguntas: any;
  opcionesData: any;
  resultado: any;
  idPregunta: number;
  opcionActualIndex: number;

  constructor(private preguntaService: PreguntaService, private opcionService: OpcionService, private resultadoService: ResultadoService) {
    this.dialogText = '';
    this.preguntas = [];
    this.opcionesData = [];
    this.resultado = {};
    this.idPregunta = 4;
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

  guardarResultado(opcionId: number, preguntaId: number){
    this.resultado = {
      Respuesta: opcionId,
      ID_Alumno: localStorage.getItem('id'),
      ID_Pregunta: preguntaId
    }

    this.resultadoService.postResultado(JSON.stringify(this.resultado)).subscribe(
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
    this.guardarResultado(respuesta.ID_Opcion, respuesta.ID_Pregunta);
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

