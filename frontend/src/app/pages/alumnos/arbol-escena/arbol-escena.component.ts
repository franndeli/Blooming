import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MotorService } from '../../../services/motor.service';
import { TNodo, TMalla, TCamara } from '../../../graphics';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  preguntaActual: any = {};
  texturacaraSeleccionada: any;

  respuestaSeleccionada: any = null;

  public fadeIn: boolean = false;

  constructor(private motorService: MotorService) {}

  ngOnInit() {
    // this.setRandomBackground();
  }

  ngOnDestroy() {
    const motorGrafico = this.motorService.getMotorGrafico();
    motorGrafico.getEventEmitter().off('caraSeleccionada', this.handleCaraSeleccionada);
  }

  async ngAfterViewInit() {
    // Se calcula aleatoriamente que interfaz toca
    let interfaz = 1;
    await this.motorService.inicializarMotor(this.canvasRef, interfaz).then(() => {
      this.preguntaActual = this.motorService.getPreguntas();
      console.log(this.preguntaActual);

      const motorGrafico = this.motorService.getMotorGrafico();
      motorGrafico.getEventEmitter().on('caraSeleccionada', (data: any) => {
        this.handleCaraSeleccionada(data);
      });
    });
  }

  handleCaraSeleccionada(data: any) {
    // console.log('Cara seleccionada en arbol-escena:', data);
    for(let i=0; i<this.preguntaActual.respuestas.opciones.length; i++){
      // console.log(this.preguntaActual.respuestas.opciones[i].Imagen);
      if (this.preguntaActual.respuestas.opciones[i].Imagen == data.textura){
        this.respuestaSeleccionada = this.preguntaActual.respuestas.opciones[i].TextoOpcion;
      }
    }
    if(data.textura == "Sin textura"){
      this.respuestaSeleccionada = null;
    }
    
    this.fadeIn = true;
    setTimeout(() => {
      this.fadeIn = false;
    }, 1000);
  }

  handleButtonClick() {
    // Implementa la acción que deseas realizar cuando se haga clic en el botón
    console.log("Botón clicado y respuesta seleccionada:", this.respuestaSeleccionada);
  }

  // private setRandomBackground() {
  //   const backgrounds = [
  //     'url("../../../../assets/images/backgrounds/DALL·E 2024-05-16 13.49.57 - A very basic and realistic background for a classroom, suitable for children aged 3 to 15. The central areas at the top, middle, and bottom are mostly.webp")'
  //     // 'url("/assets/images/background2.jpg")',
  //     // 'url("/assets/images/background3.jpg")'
  //   ];
  //   const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  //   document.getElementById('background')!.style.backgroundImage = randomBackground;
  // }
}

