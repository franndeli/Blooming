import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MotorGrafico } from '../../../graphics/motor/motorGrafico';
import { MotorService } from '../../../services/motor.service';
import { TNodo, TMalla, TCamara } from '../../../graphics';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private motorService: MotorService) {}

  async ngAfterViewInit() {
    // Se calcula aleatoriamente que interfaz toca
    let interfaz = 1;
    this.motorService.inicializarMotor(this.canvasRef, interfaz);
  }
}
