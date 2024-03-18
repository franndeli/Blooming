import { Component, OnInit } from '@angular/core';
import { PreguntaService } from '../../../services/preguntas.service';
import { AlumnoService } from '../../../services/alumnos.service';

@Component({
  selector: 'app-sistema-preguntas',
  templateUrl: './sistema-preguntas.component.html',
  styleUrls: ['./sistema-preguntas.component.css']
})

export class SistemaPreguntasComponent implements OnInit {
  preguntas: any[] = [];
  opcion: any[] = [];
  ambitos: any = null;
  frecuencia: any = null;
  indiceActual: number = 0;
  preguntaActual: any = null;
  mostrarReiniciar: boolean = false;

  objectKeys = Object.keys;


  constructor(private preguntaService: PreguntaService, private alumnoService: AlumnoService) {}

  ngOnInit() {
    this.alumnoService.getAlumnoID(localStorage.getItem('id')).subscribe((ambitos: any) => {
      this.ambitos = JSON.parse(ambitos.alumnos[0].Ambitos);
      this.frecuencia = JSON.parse(ambitos.alumnos[0].AparicionAmbitos);
      this.preguntaService.seleccionarPreguntas(this.ambitos, this.frecuencia).subscribe(preguntas => {
        this.preguntas = preguntas;
        console.log(preguntas);
        if (this.preguntas && this.preguntas.length > 0) {
          this.preguntaActual = this.preguntas[this.indiceActual];
        }
      });
    })
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
      console.log(this.preguntas.length);
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
