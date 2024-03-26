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
  private camara2: TNodo;

  constructor() {
    this.padre = new TNodo();
    this.malla1 = new TNodo();
    this.camara = new TNodo();
    this.camara2 = new TNodo();
  }

  async ngAfterViewInit() {
    this.motorGrafico = new MotorGrafico(this.canvasRef);
    
    this.camara = this.motorGrafico.crearCamara(null, [0,0,0], [0,0,0], [1,10,1], 0.1, 1000.0);
    this.camara2 = this.motorGrafico.crearCamara(null, [19,20,15], [27,90,0], [2,2,2], 2, 100.0);

    this.motorGrafico.setCamaraActiva(0);

    this.padre = this.motorGrafico.crearNodo(null, [0,0,0], [0,0,0], [1,1,1]);
    this.malla1 = await this.motorGrafico.crearModelo(this.padre, 'malla2.json', [0,0,0], [90,90,0], [1,1,1]);
    this.motorGrafico.dibujarEscena();
  }
}
