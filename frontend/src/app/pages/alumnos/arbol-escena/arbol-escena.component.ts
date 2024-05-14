import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy  } from '@angular/core';
import { MotorGrafico } from '../../../graphics/motor/motorGrafico';
import { MotorService } from '../../../services/motor.service';
import { TNodo, TMalla, TCamara } from '../../../graphics';
import { CuboService } from '../../../services/cubo.service';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;
  preguntaActual: any = {};

  private intervalId: any;

  constructor(private motorService: MotorService, private cuboService: CuboService) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.mostrarUltimaCaraSeleccionada();
    }, 500);
  }

  async ngAfterViewInit() {
    // Se calcula aleatoriamente que interfaz toca
    let interfaz = 1;
    await this.motorService.inicializarMotor(this.canvasRef, interfaz).then(() => {
      this.preguntaActual = this.motorService.getPreguntas();
      console.log(this.preguntaActual);
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  mostrarUltimaCaraSeleccionada() {
    const infoCara = this.cuboService.ultimaCaraSeleccionada;
    console.log(infoCara);
    if (infoCara) {
      console.log(`Cara seleccionada: ${infoCara.cara}, Textura: ${infoCara.textura}`);
    }
  };
}

