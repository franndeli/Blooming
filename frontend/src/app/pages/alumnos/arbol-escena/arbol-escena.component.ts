import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MotorGrafico } from '../../../graphics/motor/motorGrafico';
import { TNodo } from '../../../graphics/arbol_escena/nodo';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;
  motorGrafico!: MotorGrafico;
  private padre: TNodo | null = null;
  private malla1 : TNodo;

  constructor() {
    this.malla1 = new TNodo();
  }

  async ngAfterViewInit() {
    this.motorGrafico = new MotorGrafico(this.canvasRef);
    this.padre = this.motorGrafico.crearNodo(null, [0,0,0], [0,0,0], [1,1,1]);
    this.malla1 = await this.motorGrafico.crearModelo(this.padre, 'malla.json', [0,0,0], [0,0,0], [1,1,1]);
    this.motorGrafico.dibujarEscena();
  }
}
