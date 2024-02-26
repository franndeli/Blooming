import { Component, OnInit } from '@angular/core';
import { PreguntaService } from '../../../services/preguntas.service';

@Component({
  selector: 'app-sistema-preguntas',
  templateUrl: './sistema-preguntas.component.html',
  styleUrl: './sistema-preguntas.component.css'
})

export class SistemaPreguntasComponent implements OnInit {
  preguntas: any[] = []; // Añade esta línea para almacenar las preguntas

  constructor(private preguntaService: PreguntaService) {}

  ngOnInit() {
    this.preguntaService.seleccionarPreguntas().subscribe(preguntas => {
      this.preguntas = preguntas; // Almacena las preguntas en la variable
      console.log(preguntas);
    });
  }
}