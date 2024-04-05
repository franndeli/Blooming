import { mat4, vec3 } from 'gl-matrix';
import { ElementRef } from '@angular/core';
import vertexShaderText from '../../graphics/shaders/vertexShader';
import fragmentShaderText from '../../graphics/shaders/fragmentShader';
import { GestorRecursos, TRecursoMalla, TNodo, TCamara, TLuz, TMalla } from '../../graphics';


export class MotorGrafico {

  public escena!: TNodo;
  private camara!: TNodo;
  private avatar!: TNodo;
  public modelos: TNodo[];
  
  private camaraActiva: number = 0;
  private registroLuces: TNodo[] = [];
  private lucesActivas: boolean[] = [];
  private registroCamaras: TNodo[] = [];
  private gestorRecursos = new GestorRecursos();
  
  private program: WebGLProgram | null = null;
  private canvas: ElementRef<HTMLCanvasElement> | null = null;
  private gl!: WebGLRenderingContext;

  constructor(){
    this.modelos = [];
  }

  async iniciarEscena(canvasRef: ElementRef<HTMLCanvasElement>) {
    if(canvasRef && canvasRef.nativeElement) {
      this.canvas = canvasRef;
    }

    //this.crearShaders();

    this.escena = this.crearNodo(null, vec3.create(), vec3.create(), [1, 1, 1]);

    this.avatar = await this.crearModelo(this.escena, 'cubo.json', [0, 0, 0], [0, 45, 0], [1, 1, 1]);

    //crear camara
    this.camara = this.crearCamara(this.escena, [0, 0, 0], [0, 0, 0], [1, 1, 1], 0.1, 100.0);

    //crear luces

    this.dibujarEscena();
  }

  crearShaders() {
    const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    // Códigos de shaders (vertex y fragment) aquí o cargados de alguna manera
      
    if(vertexShader){
      this.gl.shaderSource(vertexShader, vertexShaderText);
    }
      
    if(fragmentShader){
      this.gl.shaderSource(fragmentShader, fragmentShaderText);
    }
      
    if(vertexShader){
      this.gl.compileShader(vertexShader);
      if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader!', this.gl.getShaderInfoLog(vertexShader));
        return;
      }
    }
      
    if(fragmentShader){
      this.gl.compileShader(fragmentShader);
      if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
        console.error('ERROR compiling fragment shader!', this.gl.getShaderInfoLog(fragmentShader));
        return;
      }
    }
      
    this.program = this.gl.createProgram();
    if(this.program && vertexShader){
      this.gl.attachShader(this.program, vertexShader);
    }
      
    if(this.program && fragmentShader){
      this.gl.attachShader(this.program, fragmentShader);
    }
      
    if(this.program){
      this.gl.linkProgram(this.program);
      if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
        console.error('ERROR linking program!', this.gl.getProgramInfoLog(this.program));
        return;
      }
      this.gl.validateProgram(this.program);
      if (!this.gl.getProgramParameter(this.program, this.gl.VALIDATE_STATUS)) {
        console.error('ERROR validating program!', this.gl.getProgramInfoLog(this.program));
        return;
      }

      // Delete de los shaders

      this.gl.useProgram(this.program);

      this.checkWebGLError();
    }
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

    console.log('nodo creado: ', nodo)

    return nodo;
  }

  crearCamara(padre: TNodo | null, trasl: vec3, rot: vec3, esc: vec3, cercano: number, lejano: number): TNodo {
    const eCamara = new TCamara(cercano, lejano);
    const camara = new TNodo(null, padre);

    camara.setEntidad(eCamara);
    camara.setTraslacion(trasl);
    camara.setRotacion(rot);
    camara.setEscalado(esc);
    camara.setActualizarMatriz(true);

    if(padre != null){
      padre.addHijo(camara);
    }

    this.registrarCamara(camara);

    console.log('camara creada: ', camara)

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

    console.log('luz creada: ', luz)

    return luz;
  }

  async crearModelo(padre: TNodo | null, fichero: string, trasl: vec3, rot: vec3, esc: vec3): Promise<TNodo> {
    const modelo = new TNodo(null, padre);

    const recurso =  await this.gestorRecursos.getRecurso(fichero, 'malla', this.gl) as TRecursoMalla;
    recurso.setNombre(fichero);
    console.log('recurso: ', recurso)

    modelo.setEntidad(recurso);
    console.log('entidad del modelo: ', modelo.getEntidad())
    modelo.setTraslacion(trasl);
    modelo.setRotacion(rot);
    modelo.setEscalado(esc);
    modelo.setActualizarMatriz(true);

    if(padre != null){
      padre.addHijo(modelo);
    }

    this.modelos.push(modelo);
    console.log('modelo creado: ', modelo)

    return modelo;
  }

  // Recorrer el arbol de nodos y dibujar cada uno de ellos
  async dibujarEscena() {
    this.gl = await this.initWebGL(this.canvas!);
    this.checkWebGLError();

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.enable(this.gl.CULL_FACE);
    this.gl.cullFace(this.gl.BACK);

    for (let luz of this.registroLuces) {
      let matrizLuz = luz.getMatrizTransf();
      this.pasarLuzGL(matrizLuz);
    }

    let camaraActiva = this.getCamaraActiva();
    console.log('camara activa: ', camaraActiva)
    let matrizCamara = camaraActiva.getMatrizTransf();
    let matrizVista = mat4.invert(mat4.create(), matrizCamara);
    this.pasarVistaGL(matrizVista);

    console.log('matriz vista: ', matrizVista)

    this.render();
  }

  registrarCamara(nodoCam: TNodo) {
    this.registroCamaras.push(nodoCam);
    console.log('camara registrada: ', this.registroCamaras)
  }

  getCamaraActiva() {
    return this.registroCamaras[this.camaraActiva];
  }

  // Guardar el indice del array de la camara que hemos activado, solo 1 cam activa a la vez
  setCamaraActiva(numCam: number) {
    console.log('activamos camara: ', numCam)
    this.camaraActiva = numCam;
  }

  registrarLuz(nodoLuz: TNodo) {
    this.registroLuces.push(nodoLuz);
  }

  // Guardar en un array las luces activas o que han sido desactivadas, se puede tener varias luces activas a la vez
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

    return gl;
  }

  render() {
    if(this.gl && this.program){
      //this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);      
      this.escena.recorrer(mat4.create(), this.gl, this.program);
    }
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

}