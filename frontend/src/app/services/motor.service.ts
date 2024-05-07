import { vec3 } from 'gl-matrix';
import { TNodo } from '../graphics';
import { CuboService } from './cubo.service';
import { PlanoService } from './plano.service';
import { ElementRef, Injectable } from '@angular/core';
import { MotorGrafico } from '../graphics/motor/motorGrafico';

@Injectable({
  providedIn: 'root'
})

export class MotorService {
  private escena !: TNodo;
  private escenaCubo!: TNodo;
  private escenaPlano!: TNodo;
  private escenaActual!: TNodo;
  private interfaz: number = 0;
  private canvas!: HTMLCanvasElement;
  private motorGrafico: MotorGrafico;

  constructor(private cuboService: CuboService, private planoService: PlanoService) {
    this.motorGrafico = new MotorGrafico(cuboService, planoService);
  }

  public async inicializarMotor(canvasRef: ElementRef<HTMLCanvasElement>, interfaz: number) {
    this.interfaz = interfaz;
    if(canvasRef && canvasRef.nativeElement){
      this.canvas = canvasRef.nativeElement;
      await this.motorGrafico.iniciarEscena(this.canvas, this.interfaz);

      this.escena = this.motorGrafico.crearNodo(null, vec3.create(), vec3.create(), [1, 1, 1]);
      this.motorGrafico.crearCamara(this.escena, [0, 0, 10], [0, 0, 0], [1, 1, 1]);

      // this.escenaCubo = this.motorGrafico.crearNodo(null, vec3.create(), vec3.create(), [1, 1, 1]);
      // this.motorGrafico.crearCamara(this.escenaCubo, [0, 0, 10], [0, 0, 0], [1, 1, 1]);

      // this.escenaPlano = this.motorGrafico.crearNodo(null, vec3.create(), vec3.create(), [1, 1, 1]);
      // this.motorGrafico.crearCamara(this.escenaPlano, [0, 0, 10], [0, 0, 0], [1, 1, 1]);

      if(this.interfaz == 1){
        this.cuboService.crearCubo(this.motorGrafico, this.escena);
        // this.escenaActual = this.escenaCubo;
      }
      if(this.interfaz == 2){
        this.planoService.crearPlano(this.motorGrafico, this.escena);
        // this.escenaActual = this.escenaPlano;
      }

      // setInterval(() => {
      //   this.interfaz = this.interfaz == 1 ? 2 : 1;
      //   this.cambiarInterfaz(this.interfaz);
      // }, 5000);
    
    }else {
      console.error('Referencia de canvas no definida');
      return;
    }
  }

  // public limpiarCanvas(){
  //   this.motorGrafico.initWebGL(this.canvas);
  //   if(this.interfaz == 1){
  //     this.cuboService.crearCubo(this.motorGrafico, this.escenaCubo);
  //     this.escenaActual = this.escenaCubo;
  //   }
  //   if(this.interfaz == 2){
  //     this.planoService.crearPlano(this.motorGrafico, this.escenaPlano);
  //     this.escenaActual = this.escenaPlano;
  //   }
  // }

  public async cambiarInterfaz(interfaz: number){
    this.interfaz = interfaz;
    console.log('Cambiando a interfaz: ' + interfaz)

    this.motorGrafico.limpiarEscena(this.escena);

    await this.motorGrafico.iniciarEscena(this.canvas, this.interfaz);

    if (this.interfaz == 1) {
      // this.escenaActual = this.escenaCubo;
      this.planoService.detenerDibujado();
      this.cuboService.crearCubo(this.motorGrafico, this.escena);
    }
    if (this.interfaz == 2) {
      // this.escenaActual = this.escenaPlano;
      this.cuboService.detenerDibujado();
      this.planoService.crearPlano(this.motorGrafico, this.escena);
    }
  }

}
