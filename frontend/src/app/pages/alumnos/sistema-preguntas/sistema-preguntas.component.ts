import { Component, OnInit } from '@angular/core';
import { PreguntaService } from '../../../services/preguntas.service';

@Component({
  selector: 'app-sistema-preguntas',
  templateUrl: './sistema-preguntas.component.html',
  styleUrls: ['./sistema-preguntas.component.css']
})

export class SistemaPreguntasComponent implements OnInit {
  preguntas: any[] = [];
  opcion: any[] = [];
  indiceActual: number = 0;
  preguntaActual: any = null;
  mostrarReiniciar: boolean = false; // Añade esta línea para controlar la visualización del botón de reiniciar

  objectKeys = Object.keys;


  constructor(private preguntaService: PreguntaService) {}

  ngOnInit() {
    this.preguntaService.seleccionarPreguntas().subscribe(preguntas => {
      this.preguntas = preguntas;
      console.log(preguntas);
      if (this.preguntas && this.preguntas.length > 0) {
        this.preguntaActual = this.preguntas[this.indiceActual];
        this.preguntaActual.respuestas.opciones.forEach((opcion: any) => {
          console.log(opcion.TextoOpcion);
        });
      }
    });
  }

  gravedadesPorAmbito: { [ambito: string]: number } = {};

  siguientePregunta(gravedad: number) {
    const ambitoActual = this.preguntaActual.NombreAmbito;

    if (!this.gravedadesPorAmbito[ambitoActual] && ambitoActual !== "Inicio") {
      this.gravedadesPorAmbito[ambitoActual] = 0;
    }

    if (ambitoActual !== "Inicio") {
      this.gravedadesPorAmbito[ambitoActual] += gravedad;
    }

    if (this.indiceActual < this.preguntas.length - 1) {
      this.indiceActual++;
      this.preguntaActual = this.preguntas[this.indiceActual];
    } else {
      this.mostrarReiniciar = true;
      this.preguntaActual = null;

      console.log('Gravedades por ámbito al final:', this.gravedadesPorAmbito);
    }
  }

  esUltimaPregunta(): boolean {
    return this.mostrarReiniciar;
  }

  reiniciar() {
    window.location.reload();
  }
}