import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MotorGrafico } from '../../../graphics/motor/motorGrafico';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private motorGrafico: MotorGrafico) { }

  async ngAfterViewInit() {
    this.motorGrafico.iniciarEscena(this.canvasRef);
  }
}
