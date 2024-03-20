import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MotorGrafico } from '../../../graphics/motor/motorGrafico';
import { TNodo, TMalla, TCamara } from '../../../graphics';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;
  motorGrafico!: MotorGrafico;
  private padre: TNodo;
  private malla1 : TNodo;
  private camara: TNodo;

  constructor() {
    this.padre = new TNodo();
    this.malla1 = new TNodo();
    this.camara = new TNodo();
  }

  async ngAfterViewInit() {
    this.motorGrafico = new MotorGrafico(this.canvasRef);
    
    this.camara = this.motorGrafico.crearCamara(null, [0,0,25], [0,7*3.14/4,0], [1,1,1], 0.1, 1000.0);

    this.padre = this.motorGrafico.crearNodo(null, [0,0,0], [0,0,0], [1,1,1]);
    this.malla1 = await this.motorGrafico.crearModelo(this.padre, 'malla.json', [0,0,0], [0,0,0], [1,1,1]);
    this.motorGrafico.dibujarEscena();
  }
}
