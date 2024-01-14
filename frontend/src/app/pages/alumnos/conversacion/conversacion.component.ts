import { Component, OnInit, NgZone } from '@angular/core';
//nuevo
//import { Texto3DService } from './ruta-hacia/texto-3d.service'; 
import * as THREE from 'three';

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
  //private texto3D: THREE.Mesh;

  conversacion: Pregunta[] = [
    { pregunta: '¿Cómo ha ido la semana?', respuestas: ['Bastante bien 😄', ' No ha sido mi mejor semana😢', 'Horrible😠'] },
    { pregunta: '¿Tienes algún problema con algún compañero?', respuestas: ['Me llevo genial con todos', 'Con algunos si', 'No tengo amigos'] },
    // Agrega más preguntas según sea necesario
  ];

  constructor(private zone: NgZone) {
    this.dialogText = '';
    this.respuestas = [];
    this.selectedResponse = null;
    this.currentIndex = 0;
    this.preguntaActualIndex = -1;
  }

  ngOnInit() {
    this.mostrarPregunta();
    //this.inicializarTexto3D();
  }

  mostrarPregunta() {
    const preguntaActual = this.conversacion[this.currentIndex];
    this.dialogText = preguntaActual.pregunta;
    this.respuestas = preguntaActual.respuestas;
  }

  seleccionarRespuesta(respuesta: string) {
    this.selectedResponse = respuesta;

    // Utiliza NgZone.run para asegurarte de que Angular detecte los cambios
    this.zone.run(() => {
      this.currentIndex++;

      if (this.currentIndex < this.conversacion.length) {
        this.mostrarPregunta();
      } else {
        this.finalizarConversacion();
      }
    });
  }

  finalizarConversacion() {
    // Lógica para el caso de despedida
    this.dialogText = '¡Gracias por participar en la conversación!';
    this.respuestas = []; // Configura respuestas como un array vacío
  }

  onMouseOver(index: number) {
    this.preguntaActualIndex = index;
  }

  onMouseOut() {
    this.preguntaActualIndex = -1;
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

interface Pregunta {
  pregunta: string;
  respuestas: string[];
}
