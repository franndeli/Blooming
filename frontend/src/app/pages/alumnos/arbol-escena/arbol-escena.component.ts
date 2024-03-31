import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MotorGrafico } from '../../../graphics/motor/motorGrafico';
import { TNodo, TMalla, TCamara } from '../../../graphics';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;
  private motorGrafico!: MotorGrafico;

  constructor() {
    //this.motorGrafico = new MotorGrafico(this.canvasRef);
  }

  // @HostListener('window:resize', ['$event']) onResize(event: Event) {
  //   this.resizeCanvas();
  // }

  async ngAfterViewInit() {
    this.motorGrafico = new MotorGrafico(this.canvasRef);
 
    const escena = this.motorGrafico.crearNodo(null, [10,0,10], [0,Math.PI,0], [1,1,1]);
    console.log('Creado padre con id: ', escena.id);

    const grupo = this.motorGrafico.crearNodo(escena, [0,0,0], [0,0,0], [1,1,1]);
    console.log('Creado grupo con id: ', grupo.id);

    const avatar = await this.motorGrafico.crearModelo(grupo, 'cubo.json', [0,50,0], [70,45,0], [3,3,3]);
    console.log('Creado avatar con id: ', avatar.id);
    const camara = this.motorGrafico.crearCamara(grupo, [0,10,0], [0,-Math.PI/2,0], [1,1,1], 0.1, 100.0);    
    this.motorGrafico.setCamaraActiva(0);

    this.motorGrafico.dibujarEscena();
  }

  // private resizeCanvas() {
  //   const canvas = this.canvasRef.nativeElement;
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }
}
