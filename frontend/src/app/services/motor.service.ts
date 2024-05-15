import { vec3 } from 'gl-matrix';
import { TNodo } from '../graphics';
import { CuboService } from './cubo.service';
import { PlanoService } from './plano.service';
import { ElementRef, Injectable } from '@angular/core';
import { MotorGrafico } from '../graphics/motor/motorGrafico';
import { CargarPreguntasService } from './cargaPreguntas.service';

@Injectable({
  providedIn: 'root'
})

export class MotorService {
  private texturas: any;
  private preguntas: any;
  private escena !: TNodo;
  private escenaCubo!: TNodo;
  private escenaPlano!: TNodo;
  private escenaActual!: TNodo;
  private interfaz: number = 0;
  private canvas!: HTMLCanvasElement;
  private motorGrafico: MotorGrafico;

  constructor(private cuboService: CuboService, private planoService: PlanoService, private cargarPreguntas: CargarPreguntasService) {
    this.motorGrafico = new MotorGrafico(cuboService, planoService);
  }

  public async inicializarMotor(canvasRef: ElementRef<HTMLCanvasElement>, interfaz: number) {
    this.interfaz = interfaz;
    if(canvasRef && canvasRef.nativeElement){

      this.canvas = canvasRef.nativeElement;
      await this.motorGrafico.iniciarEscena(this.canvas, this.interfaz);

      this.escena = this.motorGrafico.crearNodo(null, vec3.create(), vec3.create(), [1, 1, 1]);
      this.escenaCubo = this.motorGrafico.crearNodo(this.escena, vec3.create(), vec3.create(), [1, 1, 1]);
      this.escenaPlano = this.motorGrafico.crearNodo(this.escena, vec3.create(), vec3.create(), [1, 1, 1]);

      this.preguntas = await this.cargarPreguntas.cargarPreguntas();
      await this.cargarTexturas();

      this.cargarInterfaces();
    
    }else {
      console.error('Referencia de canvas no definida');
    }
  }

  public async cambiarInterfaz(interfaz: number){
    this.interfaz = interfaz;
    
    this.motorGrafico.limpiarEscena(this.escenaCubo);
    this.motorGrafico.limpiarEscena(this.escenaPlano);

    await this.motorGrafico.iniciarEscena(this.canvas, interfaz);

    this.cargarInterfaces();
  }

  private cargarInterfaces(){
    if(this.interfaz == 1){
      console.log('ESCENA CUBO')
      this.cuboService.crearCubo(this.motorGrafico, this.escenaCubo, this.texturas);
    }

    if(this.interfaz == 2){
      console.log('ESCENA PLANO')
      this.planoService.crearPlano(this.motorGrafico, this.escenaPlano, this.texturas);
    }
  }

  async cargarTexturas() {
    const texturas: any[] = [];
    
    for(let i=0; i<this.cargarPreguntas.preguntaActual.respuestas.opciones.length; i++){
      texturas.push(this.cargarPreguntas.preguntaActual.respuestas.opciones[i].Imagen);
    }

    this.texturas = await Promise.all(texturas.map(async url => await this.motorGrafico.cargarTextura(url)));
  }

}
