import { mat4, vec3 } from 'gl-matrix';
import { ElementRef } from '@angular/core';
import { GestorRecursos, TRecursoMalla, TNodo, TCamara, TLuz } from '../../graphics';

var clickIzq = false;
var old_x = 0;
var old_y = 0;
var dx = 0;
var dy = 0;
var dz = 0;
var theta = 0;
var phi = 0;
var psi = 0;
var escalado = 1;
var clickDcho = false;
var old_xRight = 0;
var old_yRight = 0;
var dxRight = 0;
var dyRight = 0;
var trasX = 0;
var trasY = 0;

export class MotorGrafico {

  private width: number = 0;
  private height: number = 0;
  public rotando:boolean = true;
  public time:number = 0;

  public escena!: TNodo;
  private camara!: TNodo;
  private avatar!: TNodo;
  public modelos: TNodo[];
  private camActiva!: TNodo;
  
  private camaraActiva: number = 0;
  private registroLuces: TNodo[] = [];
  private lucesActivas: boolean[] = [];
  private registroCamaras: TNodo[] = [];
  private gestorRecursos = new GestorRecursos();
  
  private program: WebGLProgram | null = null;
  private canvas: ElementRef<HTMLCanvasElement> | null = null;
  private gl!: WebGL2RenderingContext;

  constructor(){
    this.modelos = [];
  }

  async iniciarEscena(canvasRef: ElementRef<HTMLCanvasElement>) {
    if(canvasRef && canvasRef.nativeElement) {
      this.canvas = canvasRef;
      this.canvas.nativeElement.addEventListener("mousedown", this.mouseDown, false);
      this.canvas.nativeElement.addEventListener("mouseup", this.mouseUp, false);
      this.canvas.nativeElement.addEventListener("mouseout", this.mouseUp, false);
      this.canvas.nativeElement.addEventListener("mousemove", this.mouseMove, false);
      this.canvas.nativeElement.addEventListener("wheel", this.zoom, false);
    }

    this.escena = this.crearNodo(null, vec3.create(), vec3.create(), [1, 1, 1]);

    //crear camara
    this.camara = this.crearCamara(this.escena, [0, 0, 5], [0, 0, 0], [1, 1, 1]);
    var numCam = this.registrarCamara(this.camara);
    this.setCamaraActiva(numCam);
    this.camActiva = this.getCamaraActiva();

    //crear avatar
    this.avatar = await this.crearModelo(this.escena, 'untitled.gltf', [0, 0, 0], [0, 0, 0], [1, 1, 1]);

    //crear luces
    
    //this.dibujarEscena();

    let render = () => {
      this.avatar.setTraslacion([trasX, trasY, 0]);
      this.avatar.setRotacion([phi, theta, psi])
      this.avatar.setEscalado([escalado, escalado, escalado]);

      this.dibujarEscena();
      requestAnimationFrame(render);
    }
    render();
  }

  crearNodo(padre:TNodo | null, trasl: vec3, rot: vec3, esc: vec3): TNodo {
    const nodo = new TNodo(null, padre);
    nodo.setTraslacion(trasl);
    nodo.setRotacion(rot);
    nodo.setEscalado(esc);
    nodo.setActualizarMatriz(true);

    if(padre != null){
      padre.addHijo(nodo);
    }

    //console.log('nodo creado: ', nodo)

    return nodo;
  }

  crearCamara(padre: TNodo | null, trasl: vec3, rot: vec3, esc: vec3): TNodo {
    const eCamara = new TCamara();
    const camara = new TNodo(null, padre);

    camara.setEntidad(eCamara);
    camara.setTraslacion(trasl);
    camara.setRotacion(rot);
    camara.setEscalado(esc);
    camara.setActualizarMatriz(true);

    if(padre != null){
      padre.addHijo(camara);
    }

    //console.log('camara creada: ', camara)

    return camara;
  }

  crearLuz(padre: TNodo | null, trasl: vec3, rot: vec3, esc: vec3, intensidad: vec3 /*, tipoLuz: EnumType*/): TNodo {
    const luz = new TNodo(null, padre);
    luz.setEntidad(new TLuz(intensidad));
    luz.setTraslacion(trasl);
    luz.setRotacion(rot);
    luz.setEscalado(esc);
    luz.setActualizarMatriz(true);

    if(padre != null){
      padre.addHijo(luz);
    }

    //console.log('luz creada: ', luz)

    return luz;
  }

  async crearModelo(padre: TNodo | null, fichero: string, trasl: vec3, rot: vec3, esc: vec3): Promise<TNodo> {
    const modelo = new TNodo(null, padre);

    const recurso =  await this.gestorRecursos.getRecurso(fichero, 'malla') as TRecursoMalla;
    recurso.setNombre(fichero);
    //console.log('recurso: ', recurso)

    modelo.setEntidad(recurso);
    //console.log('entidad del modelo: ', modelo.getEntidad())
    modelo.setTraslacion(trasl);
    modelo.setRotacion(rot);
    modelo.setEscalado(esc);
    modelo.setActualizarMatriz(true);

    if(padre != null){
      padre.addHijo(modelo);
    }

    this.modelos.push(modelo);
    //console.log('modelo creado: ', modelo)

    return modelo;
  }

  async dibujarEscena() {
    this.gl = await this.initWebGL(this.canvas!);
    this.checkWebGLError();
    this.escena.recorrer(mat4.create());
  }

  registrarCamara(nodoCam: TNodo) {
    this.registroCamaras.push(nodoCam);
    //console.log('camara registrada: ', this.registroCamaras)
    return this.registroCamaras.length - 1;
  }

  getCamaraActiva() {
    return this.registroCamaras[this.camaraActiva];
  }

  setCamaraActiva(numCam: number) {
    //console.log('activamos camara: ', numCam)
    this.camaraActiva = numCam;
  }

  registrarLuz(nodoLuz: TNodo) {
    this.registroLuces.push(nodoLuz);
  }

  setLuzActiva(numLuz: number, activa: boolean) {
    this.lucesActivas[numLuz] = activa;
  }

  pasarLuzGL(matrizLuz: mat4) {
    if(this.program && this.gl){
      let u_LuzMatrix = this.gl.getUniformLocation(this.program, 'u_LuzMatrix');

      if (u_LuzMatrix !== null) {
        this.gl.uniformMatrix4fv(u_LuzMatrix, false, new Float32Array(matrizLuz));
      }
    }
  }

  pasarVistaGL(matrizVista: mat4) {
    if(this.program && this.gl){
      let u_ViewMatrix = this.gl.getUniformLocation(this.program, 'u_ViewMatrix');

  if (u_ViewMatrix !== null) {
    this.gl.uniformMatrix4fv(u_ViewMatrix, false, new Float32Array(matrizVista));
  }
    }
  }

  private initWebGL(canvas: ElementRef<HTMLCanvasElement>): any{
    let gl = null;
    const canva = canvas.nativeElement;
    gl = canva.getContext('webgl2', { antialias: true, depth: true, stencil: true });

    if (!gl) {
      console.error('No se puede inicializar WebGL. Tu navegador o máquina puede no soportarlo.');
      return null;
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 2.0, 4.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    return gl;
  }

  checkWebGLError() {
    if (!this.gl) {
      console.error('WebGL no está inicializado');
      return;
    }

    let error = this.gl.getError();
    if (error != this.gl.NO_ERROR) {
      console.error('Se produjo un error de WebGL: ', error);
    }
  }

  mouseDown(event: MouseEvent){
    event.preventDefault();

    if(event.button == 0){
      clickIzq = true;
      old_x = event.pageX;
      old_y = event.pageY;
    }

    if(event.button == 2){
      clickDcho = true;
      old_xRight = event.pageX;
      old_yRight = event.pageY;
    }
  }

  mouseUp(event: MouseEvent){
    event.preventDefault();

    if(event.button == 0){
      clickIzq = false;
    }
    if(event.button == 2){
      clickDcho = false;
    }
  }

  mouseMove(event: MouseEvent){
    event.preventDefault();
    //Rotar
    let velocidadRotacion = 10;
    if(clickIzq){
      dx = (event.pageX - old_x) * 2 * Math.PI / this.width * velocidadRotacion;
      dy = (event.pageY - old_y) * 2 * Math.PI / this.height * velocidadRotacion;
      theta += dx;
      phi += dy;
      old_x = event.pageX;
      old_y = event.pageY;
    }

    //Mover
    if(clickDcho){
      dxRight = (event.pageX - old_xRight) * 5 / this.width;
      dyRight = (event.pageY - old_yRight) * 5 / this.height;
      trasX += dxRight;
      trasY += -dyRight;
      old_xRight = event.pageX;
      old_yRight = event.pageY;
    }
  }

  zoom(event: WheelEvent){
    event.preventDefault();

    if(event.deltaY < 0){
      escalado += 0.25;
    } else {
      escalado -= 0.25;
    }

    escalado = Math.min(Math.max(0.25, escalado), 4);

    // ROTACIÓN EJE Z
    // dz = event.deltaY * 2 * Math.PI / this.height;
    // psi += dz;
  }

}