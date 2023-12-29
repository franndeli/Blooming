import { Component } from '@angular/core';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrl: './conversacion.component.css'
})
export class ConversacionComponent {
  dialogText: string;
  selectedResponse: string | null;

  constructor() {
    this.dialogText = 'Hola, ¿cómo estás?'; // Inicializa el texto del diálogo
    this.selectedResponse = null; // Inicializa la respuesta seleccionada
  }

  seleccionarRespuesta(respuesta: string) {
    this.selectedResponse = respuesta;
    this.actualizarDialogo(); // Actualiza el texto del diálogo según la respuesta seleccionada
  }

  private actualizarDialogo() {
    // Lógica para actualizar el texto del diálogo según la respuesta seleccionada
    switch (this.selectedResponse) {
      case 'Respuesta 1':
        this.dialogText = '¡Excelente elección!';
        break;
      case 'Respuesta 2':
        this.dialogText = 'Interesante, cuéntame más.';
        break;
      case 'Respuesta 3':
        this.dialogText = 'Hmm, eso suena intrigante.';
        break;
      default:
        this.dialogText = '¡Gracias por tu respuesta!';
        break;
    }
  }
}
