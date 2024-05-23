import { vec3 } from 'gl-matrix';
import { TNodo } from '../graphics';
import { CuboService } from './cubo.service';
import { PlanoService } from './plano.service';
import { ElementRef, Injectable } from '@angular/core';
import { MotorGrafico } from '../graphics/motor/motorGrafico';
import { CargarPreguntasService } from './cargaPreguntas.service';
import { RespuestaService } from './respuestas.service';

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

  ////////////////////////////////////////////
  // gravedadesPorAmbito: { [ambito: string]: number } = {};

  constructor(private cuboService: CuboService, private planoService: PlanoService, private cargarPreguntas: CargarPreguntasService) {
    this.motorGrafico = new MotorGrafico(cuboService, planoService);
  }

  public async inicializarMotor(canvasRef: ElementRef<HTMLCanvasElement>, interfaz: number, mostrarContador: any) {
    this.interfaz = interfaz;

    if(canvasRef && canvasRef.nativeElement){

      this.canvas = canvasRef.nativeElement;

      if(mostrarContador == 'false'){
        await this.motorGrafico.iniciarEscena(this.canvas, this.interfaz);

        this.escena = this.motorGrafico.crearNodo(null, vec3.create(), vec3.create(), [1, 1, 1]);
        this.escenaCubo = this.motorGrafico.crearNodo(this.escena, vec3.create(), vec3.create(), [1, 1, 1]);
        this.escenaPlano = this.motorGrafico.crearNodo(this.escena, vec3.create(), vec3.create(), [1, 1, 1]);

        let lolete = await this.cargarPreguntas.comprobarPreguntas();

        if(!lolete) {
          // this.preguntas = 
          await this.cargarPreguntas.cargarPreguntas(mostrarContador);
        }

        await this.cargarTexturas();

        this.cargarInterfaces();
      }
    }else {
      console.error('Referencia de canvas no definida');
    }
  }

  getPreguntas(){
    //console.log(this.cargarPreguntas.preguntaActual);
    return this.cargarPreguntas.preguntaActual;
  }

  async siguientePregunta(gravedad: number, id: any){
    await this.cargarPreguntas.siguientePregunta(gravedad, id);
    return this.cargarPreguntas.preguntaActual;
  }
  
  public async cambiarInterfaz(interfaz: number){
    this.interfaz = interfaz;
    
    this.motorGrafico.limpiarEscena(this.escenaCubo);
    this.motorGrafico.limpiarEscena(this.escenaPlano);

    await this.motorGrafico.iniciarEscena(this.canvas, interfaz);

    await this.cargarTexturas();
    this.cargarInterfaces();
  }

  public async limpiarEscenaMoto(){
    this.motorGrafico.limpiarEscena(this.escenaCubo);
    this.motorGrafico.limpiarEscena(this.escenaPlano);
  }

  private cargarInterfaces(){
    if(this.interfaz == 1){
      //console.log('ESCENA CUBO')
      this.cuboService.crearCubo(this.motorGrafico, this.escenaCubo, this.texturas);
    }

    if(this.interfaz == 2){
      //console.log('ESCENA PLANO')
      this.planoService.crearPlano(this.motorGrafico, this.escenaPlano, this.texturas);
    }
  }

  async cargarTexturas() {
    const texturas: any[] = [];

    //console.log(this.cargarPreguntas.preguntaActual.respuestas.opciones);
    
    for(let i=0; i<this.cargarPreguntas.preguntaActual.respuestas.opciones.length; i++){
      texturas.push(this.cargarPreguntas.preguntaActual.respuestas.opciones[i].Imagen);
    }
    // console.log(texturas);

    this.texturas = await Promise.all(texturas.map(async url => await this.motorGrafico.cargarTextura(url)));
    // console.log(this.texturas);
  }

  getMotorGrafico() {
    return this.motorGrafico;
  }

  /////////////////////////////////////////////////////////////
  
  // siguientePregunta(gravedad: number, id: any) {
  //   let fechaRespuesta = new Date(); // Crea un objeto de fecha con la fecha y hora actual
  //   fechaRespuesta.setHours(fechaRespuesta.getHours() + 2); // Suma dos horas a la fecha actual

  //   // let fechaInicioISO = fechaRespuesta.toISOString();
  //   // const respuesta = {
  //   //   ID_Pregunta: this.cargarPreguntas.preguntaActual.ID_Pregunta,
  //   //   ID_Opcion: id,
  //   //   ID_Alumno: localStorage.getItem('id'),
  //   //   FechaRespuesta: fechaInicioISO,
  //   //   ID_Sesion: localStorage.getItem('sesionId')
  //   // }

  //   // this.respuestaService.postRespuesta(respuesta).subscribe({
  //   //   next: (response) => {
  //   //     console.log('Respuesta creada con éxito:', response);
  //   //   },
  //   //   error: (error) => {
  //   //     console.error('Error al crear respuesta:', error);
  //   //   }
  //   // });

  //   const ambitoActual = this.cargarPreguntas.preguntaActual.NombreAmbito;

  //   if (!this.gravedadesPorAmbito[ambitoActual] && ambitoActual !== "Inicio") {
  //     this.gravedadesPorAmbito[ambitoActual] = 0;
  //   }

  //   if (ambitoActual !== "Inicio") {
  //     this.gravedadesPorAmbito[ambitoActual] += gravedad;
  //   }

  //   //console.log(this.gravedadesPorAmbito);
  //   this.loadNewQuestion();
  // }

  // private loadNewQuestion() {
  //   // Incrementa el índice actual para pasar a la siguiente pregunta
  //   if (this.indiceActual < this.preguntas.length - 1) {
  //     this.indiceActual++;
  //     this.preguntaActual = this.preguntas[this.indiceActual];
  
  //     this.obtenerNumeroAleatorio();
  //     //console.log(this.EL_NUMERO);
  //     this.cargarAnimacion(this.preguntaActual, 0);
  //     this.add3DText();
  //     this.guardarIndiceActual();
  //   } else {
  //     // Manejar el final del cuestionario
  //     this.preguntaActual = null;
  //     this.scene.remove(this.buttonMesh);
  //     this.reiniciar();
  //   }
  // }
}
