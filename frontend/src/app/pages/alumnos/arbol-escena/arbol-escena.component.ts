import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { MotorService } from '../../../services/motor.service';
import { GlobalStateService } from '../../../services/graphics/helpers/globalstate.service';
import { Subscription, interval } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  preguntaActual: any = {};
  texturacaraSeleccionada: any;
  respuestaSeleccionada: any = null;
  respuestaSeleccionadaCompleta: any = null;
  respuestaGravedad: any = null;

  indiceActual: any;

  public fadeIn: boolean = false;
  private interfaz!: number;

  public loading: boolean = true;

  public mostrarContador: any = 'false';
  public countdownTime: number = 0;
  private countdownSubscription?: Subscription;

  constructor(private motorService: MotorService, 
    private globalStateService: GlobalStateService, 
    private cdRef: ChangeDetectorRef,
    private authService: AuthService ) {}

  async ngOnInit() {
    this.elegirFondo();
    // // console.log('Estoy en ngOnInit');
    await this.globalStateService.initializeState();

    await new Promise(resolve => setTimeout(resolve, 50));
    // this.mostrarContador = this.globalStateService.mostrarContador;
    this.mostrarContador = localStorage.getItem('mostrarContador');
    this.countdownTime = this.globalStateService.countdownTime;

    // console.log("this.mostrarContador", this.mostrarContador);
    // console.log(this.countdownTime);

    // console.log(this.mostrarContador == 'true');

    if (this.mostrarContador == 'true') {
      // console.log("this.mostrarContador", this.mostrarContador);
      // console.log("Entro en mostrarContador = true")
      this.startCountdown();
    } else {
      // // console.log("Entro en mostrarContador = false")
      this.indiceActual = JSON.parse(localStorage.getItem('indiceActual') || '0');
      this.updateProgressBar();
    }

    this.yoquese();
    // this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    const motorGrafico = this.motorService.getMotorGrafico();
    motorGrafico.getEventEmitter().off('caraSeleccionada', this.handleCaraSeleccionada);

    this.stopCountdown();
  }

  async ngAfterViewInit() {
    // // // console.log('Estoy en ngAfterViewInit');
    // // this.mostrarContador = localStorage.getItem('mostrarContador');
    
    // // // console.log(this.jaja)
    // if(this.indiceActual > 0){
    //   this.loading = false;
    // }
    // // Se calcula aleatoriamente que interfaz toca
    // this.interfaz = Math.random() < 0.5 ? 1 : 2;

    // const start = Date.now();

    // // console.log(this.mostrarContador);
    // // console.log(localStorage.getItem('mostrarContador'));

    // // console.log(this.globalStateService.mostrarContador)

    // await this.motorService.inicializarMotor(this.canvasRef, this.interfaz, localStorage.getItem('mostrarContador')).then(() => {
    //   this.preguntaActual = this.motorService.getPreguntas();
    //   //// console.log(this.preguntaActual);
    // });

    // const elapsed = Date.now() - start;
    // const remainingTime = Math.max(2000 - elapsed, 0);
    // setTimeout(() => {
    //   this.loading = false; // Ocultar la pantalla de carga
    // }, remainingTime);

    // // setInterval(() => {
    //   // interfaz = interfaz == 1 ? 2 : 1;
    //   // this.motorService.cambiarInterfaz(interfaz);
    // // }, 30000);
    // const motorGrafico = this.motorService.getMotorGrafico();
    // motorGrafico.getEventEmitter().on('caraSeleccionada', (data: any) => {
    //   this.handleCaraSeleccionada(data);
    // });
    //   // this.cdRef.detectChanges();
  }

  async yoquese(){
    // // console.log('Estoy en ngAfterViewInit');
    // this.mostrarContador = localStorage.getItem('mostrarContador');
    
    // // console.log(this.jaja)
    if(this.indiceActual > 0){
      this.loading = false;
    }
    // Se calcula aleatoriamente que interfaz toca
    this.interfaz = Math.random() < 0.5 ? 1 : 2;

    const start = Date.now();

    // console.log(this.mostrarContador);
    // console.log(localStorage.getItem('mostrarContador'));

    // console.log(this.globalStateService.mostrarContador)

    await this.motorService.inicializarMotor(this.canvasRef, this.interfaz, localStorage.getItem('mostrarContador')).then(() => {
      this.preguntaActual = this.motorService.getPreguntas();
      //// console.log(this.preguntaActual);
    });

    const elapsed = Date.now() - start;
    const remainingTime = Math.max(2000 - elapsed, 0);
    setTimeout(() => {
      this.loading = false; // Ocultar la pantalla de carga
    }, remainingTime);

    // setInterval(() => {
      // interfaz = interfaz == 1 ? 2 : 1;
      // this.motorService.cambiarInterfaz(interfaz);
    // }, 30000);
    const motorGrafico = this.motorService.getMotorGrafico();
    motorGrafico.getEventEmitter().on('caraSeleccionada', (data: any) => {
      this.handleCaraSeleccionada(data);
    });
      // this.cdRef.detectChanges();
  }

  handleCaraSeleccionada(data: any) {
    // // console.log('hola');
    // // console.log('Cara seleccionada en arbol-escena:', data);
    for(let i=0; i<this.preguntaActual.respuestas.opciones.length; i++){

      //// console.log(this.preguntaActual.respuestas.opciones[i])

      // // console.log(this.preguntaActual.respuestas.opciones[i].Imagen);
      if (this.preguntaActual.respuestas.opciones[i].Imagen == data.textura){
        this.respuestaSeleccionadaCompleta = this.preguntaActual.respuestas.opciones[i];
        this.respuestaSeleccionada = this.preguntaActual.respuestas.opciones[i].TextoOpcion;
        this.respuestaGravedad = this.preguntaActual.respuestas.opciones[i].Gravedad;
      }
    }
    if(data.textura == "Sin textura"){
      this.respuestaSeleccionada = null;
    }
    
    //// console.log(this.respuestaSeleccionada);
    // this.fadeIn = true;
    // setTimeout(() => {
    //   this.fadeIn = false;
    // }, 1000);
  }

  async handleButtonClick() {
    this.interfaz = Math.random() < 0.5 ? 1 : 2;
    this.setRespuestaSeleccionadaNull();

    const motorGrafico = this.motorService.getMotorGrafico();
    motorGrafico.getEventEmitter().off('caraSeleccionada', this.handleCaraSeleccionada);
    this.indiceActual++;

    await this.updateProgressBar();

    this.preguntaActual = this.motorService.siguientePregunta(this.respuestaSeleccionadaCompleta.Gravedad, this.respuestaSeleccionadaCompleta.ID_Opcion);
    //// console.log(this.preguntaActual);

    if(this.preguntaActual == null){
      await this.motorService.limpiarEscenaMoto();
      this.mostrarContador == 'true';
      this.startCountdown();
      return;
    }

    this.motorService.cambiarInterfaz(this.interfaz);
  }

  setRespuestaSeleccionadaNull() {
    this.respuestaSeleccionada = null;
  }

  // private setRandomBackground() {
  //   const backgrounds = [
  //     'url("../../../../assets/images/backgrounds/DALL·E 2024-05-16 13.49.57 - A very basic and realistic background for a classroom, suitable for children aged 3 to 15. The central areas at the top, middle, and bottom are mostly.webp")'
  //     // 'url("/assets/images/background2.jpg")',
  //     // 'url("/assets/images/background3.jpg")'
  //   ];
  //   const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  //   document.getElementById('background')!.style.backgroundImage = randomBackground;
  // }

  async updateProgressBar() {
    const preguntas = JSON.parse(localStorage.getItem('preguntas') || '[]');

    // // console.log(this.indiceActual);

    if (preguntas.length > 0) {
        const progreso = ((this.indiceActual) / (preguntas.length)) * 100;
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.height = `${progreso}%`;
        }
    }
  }

  private startCountdown() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      const time = this.globalStateService.calculateTimeUntilNextPeriod();
      // this.countdownTime = time.hours * 3600 + time.minutes * 60 + time.seconds;
      // // console.log(time);
      this.countdownTime = time;
    });
  }

  private stopCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  private elegirFondo(){
    const background = document.getElementById('background');
    const colors = ['green', 'blue', 'red'];
    const selectedColor = colors[Math.floor(Math.random() * colors.length)];
    background!.classList.add(selectedColor);
  }

  handleButtonClickjaja() {
    //// console.log('Botón presionado');
    Swal.fire({
      title: "¿Estás seguro de que quieres salir del juego?",
      //text: "Vas a salir de la aplicación",
      icon: "warning",
      iconColor: "#68A63C",
      showCancelButton: true,
      confirmButtonColor: "#68A63C",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }

}

