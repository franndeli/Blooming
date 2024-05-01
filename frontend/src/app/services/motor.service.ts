import { MotorGrafico } from '../graphics/motor/motorGrafico';
import { ElementRef, Injectable } from '@angular/core';
import { mat4, vec3, mat3 } from 'gl-matrix';
import { TNodo } from '../graphics';
import { CuboService } from './cubo.service'

@Injectable({
  providedIn: 'root'
})
export class MotorService {
  private motorGrafico: MotorGrafico;
  private canvas!: HTMLCanvasElement;
  private interfaz: number = 0;
  private camara!: TNodo;
  private escena!: TNodo;
  private textura!: any;

  constructor(private cuboService: CuboService) {
    this.motorGrafico = new MotorGrafico(cuboService);
  }

  public async inicializarMotor(canvasRef: ElementRef<HTMLCanvasElement>, interfaz: number) {
    this.interfaz = interfaz;
    if(canvasRef && canvasRef.nativeElement){
      this.canvas = canvasRef.nativeElement;
      await this.motorGrafico.iniciarEscena(this.canvas);
      this.escena = this.motorGrafico.crearNodo(null, vec3.create(), vec3.create(), [1, 1, 1]);
      this.camara = this.motorGrafico.crearCamara(this.escena, [0, 0, 10], [0, 0, 0], [1, 1, 1]);
      
      this.textura = await this.motorGrafico.cargarTextura('../../assets/images/logos/logo.png');
      this.textura = await this.motorGrafico.cargarTextura('../../assets/images/logos/logo.png');

      if(this.interfaz == 1){
        this.cuboService.crearCubo(this.motorGrafico, this.escena);
      }
    }else {
      console.error('Referencia de canvas no definida');
      return;
    }
  }

  public limpiarCanvas(){
    this.motorGrafico.initWebGL(this.canvas);
    if(this.interfaz == 1){
      this.cuboService.crearCubo(this.motorGrafico, this.escena);
    }
  }

  public cambiarInterfaz(interfaz: number){
    this.interfaz = interfaz;
    this.limpiarCanvas();
  }

}
