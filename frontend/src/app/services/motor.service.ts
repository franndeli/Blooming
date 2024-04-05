import { ElementRef, Injectable } from '@angular/core';
import { MotorGrafico } from '../graphics/motor/motorGrafico';

@Injectable({
  providedIn: 'root'
})
export class MotorService {
  motorGrafico: MotorGrafico;

  constructor() {
    this.motorGrafico = new MotorGrafico();
  }

  public async inicializarMotor(canvasRef: ElementRef<HTMLCanvasElement>) {
    await this.motorGrafico.iniciarEscena(canvasRef);
  }
}
