// conversacion.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.css']
})
export class ConversacionComponent implements OnInit {
  dialogText: string;
  selectedResponse: string | null;
  respuestas: string[];
  currentIndex: number;
  preguntaActualIndex: number;

  conversacion: Pregunta[] = [
    { pregunta: '¿Cómo ha ido la semana?', respuestas: ['Bastante bien 😄', ' No ha sido mi mejor semana😢', 'Horrible😠'] },
    { pregunta: '¿Tienes algún problema con algún compañero?', respuestas: ['Me llevo genial con todos', 'Con algunos si', 'No tengo amigos'] },
    // Agrega más preguntas según sea necesario
  ];

  constructor() {
    this.dialogText = '';
    this.respuestas = [];
    this.selectedResponse = null;
    this.currentIndex = 0;
    this.preguntaActualIndex = -1;
  }

  ngOnInit() {
    this.mostrarPregunta();
  }

  mostrarPregunta() {
    const preguntaActual = this.conversacion[this.currentIndex];
    this.dialogText = preguntaActual.pregunta;
    this.respuestas = preguntaActual.respuestas;
  }

  seleccionarRespuesta(respuesta: string) {
    this.selectedResponse = respuesta;
    this.actualizarDialogo();

    this.currentIndex++;
    this.mostrarPregunta();
  }

  actualizarDialogo() {
    switch (this.currentIndex) {
      case 0:
        // Lógica para la primera pregunta
        // ...
        break;
      case 1:
        // Lógica para la segunda pregunta
        // ...
        break;
      case 2:
        // Lógica para la tercera pregunta
        // ...
        break;
      case 3:
        // Lógica para el caso de despedida
        this.dialogText = '¡Gracias por participar en la conversación!';
        this.respuestas = []; // Configura respuestas como un array vacío
        break;
      default:
        this.dialogText = '¡Gracias por participar en la conversación!';
        break;
    }
  }

  onMouseOver(index: number) {
    this.preguntaActualIndex = index;
  }

  onMouseOut() {
    this.preguntaActualIndex = -1;
  }
}

interface Pregunta {
  pregunta: string;
  respuestas: string[];
}
