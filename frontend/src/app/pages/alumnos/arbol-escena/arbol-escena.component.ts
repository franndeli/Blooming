import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MotorGrafico } from '../../../graphics/motor/motorGrafico';
import { TNodo, TMalla, TCamara } from '../../../graphics';
import { OrbitControls } from '../../../graphics/motor/orbitControls';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;
  // motorGrafico!: MotorGrafico;
  // private escena: TNodo;
  // private avatar : TNodo;
  // private camara: TNodo;
  // private camara2: TNodo;
  // private luz: TNodo;
  private controls : OrbitControls | undefined;

  constructor() {
    // this.escena = new TNodo();
    // this.avatar = new TNodo();
    // this.camara = new TNodo();
    // this.camara2 = new TNodo();
    // this.luz = new TNodo();
  }

  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this.resizeCanvas();
  }

  async ngAfterViewInit() {
    const motorGrafico = new MotorGrafico(this.canvasRef);
 
    const escena = motorGrafico.crearNodo(null, [10,0,10], [0,3.14,0], [1,1,1]);
    console.log('Creado padre con id: ', escena.id);

    const grupo = motorGrafico.crearNodo(escena, [0,0,0], [0,0,0], [1,1,1]);
    console.log('Creado grupo con id: ', grupo.id);

    const avatar = await motorGrafico.crearModelo(grupo, 'cubo.json', [0,50,0], [70,45,0], [1,1,1]);
    console.log('Creado avatar con id: ', avatar.id);
    const camara = motorGrafico.crearCamara(grupo, [0,10,0], [0,3.14/2,0], [1,1,1], 0.1, 100.0);    
    motorGrafico.setCamaraActiva(0);

    motorGrafico.dibujarEscena();

    // this.controls = new OrbitControls(camara, this.canvasRef.nativeElement);

    // const animate = () => {
    //   requestAnimationFrame(animate);
    //   if (this.controls) {
    //     this.controls.update();
    //   }
    //   motorGrafico.dibujarEscena();
    // };

    // animate();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}
