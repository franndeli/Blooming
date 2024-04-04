import { mat4, vec3 } from 'gl-matrix';
import { ElementRef } from '@angular/core';
import vertexShaderText from '../../graphics/shaders/vertexShader';
import fragmentShaderText from '../../graphics/shaders/fragmentShader';
import { GestorRecursos, TRecursoMalla, TNodo, TCamara, TLuz, TMalla } from '../../graphics';


export class MotorGrafico {
  
  private raiz = new TNodo();
  private camaraActiva: number = 0;
  private registroLuces: TNodo[] = [];
  private lucesActivas: boolean[] = [];
  private registroCamaras: TNodo[] = [];
  private gestorRecursos = new GestorRecursos();
  
  program: WebGLProgram | null = null;
  gl: WebGLRenderingContext | null = null;
  recursoMalla: TRecursoMalla | null = null;

  constructor(canvasRef: ElementRef<HTMLCanvasElement>) {

    if (canvasRef && canvasRef.nativeElement) {
      const canvas = canvasRef.nativeElement;
      // this.gl = canvas.getContext('webgl');
      this.gl = canvas.getContext('webgl2', { antialias: true, depth: true, stencil: true });
      
      if (!this.gl) {
        console.error('No se puede inicializar WebGL. Tu navegador o máquina puede no soportarlo.');
        return;
      }

      this.gl.clearColor(0.0, 2.0, 4.0, 1.0);
      this.gl.clearDepth(1.0);
      this.gl.enable(this.gl.DEPTH_TEST);

      // Accept fragment if it closer to the camera than the former one
      this.gl.depthFunc(this.gl.LESS);

      // Cull triangles which normal is not towards the camera
      this.gl.enable(this.gl.CULL_FACE);

      //Backface culling
      this.gl.cullFace(this.gl.BACK);
      this.gl.frontFace(this.gl.CCW);

      // Enable blending
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

      this.gl.depthFunc(this.gl.LEQUAL);
           
      this.checkWebGLError();
      
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
    } else {
      console.error('El elemento canvas no está disponible.');
    }
  }

  crearNodo(padre:TNodo | null, trasl: vec3, rot: vec3, esc: vec3): TNodo {
    if(padre == null){
      padre = this.raiz;
    }
    const nodo = new TNodo(null, padre);
    nodo.setTraslacion(trasl);
    nodo.setRotacion(rot);
    nodo.setEscalado(esc);
    nodo.setActualizarMatriz(true);

    padre.addHijo(nodo);

    console.log('nodo creado: ', nodo)

    return nodo;
  }

  crearCamara(padre: TNodo | null, trasl: vec3, rot: vec3, esc: vec3, cercano: number, lejano: number): TNodo {
    if(padre == null){
      padre = this.raiz;
    }
    const camara = new TNodo(null, padre);
    camara.setEntidad(new TCamara(cercano, lejano));
    camara.setTraslacion(trasl);
    camara.setRotacion(rot);
    camara.setEscalado(esc);
    camara.setActualizarMatriz(true);

    padre.addHijo(camara);

    this.registrarCamara(camara);

    console.log('camara creada: ', camara)

    return camara;
  }

  crearLuz(padre: TNodo | null, trasl: vec3, rot: vec3, esc: vec3, intensidad: vec3 /*, tipoLuz: EnumType*/): TNodo {
    if(padre == null){
      padre = this.raiz;
    }
    const luz = new TNodo(null, padre);
    luz.setEntidad(new TLuz(intensidad));
    luz.setTraslacion(trasl);
    luz.setRotacion(rot);
    luz.setEscalado(esc);
    luz.setActualizarMatriz(true);

    padre.addHijo(luz);

    console.log('luz creada: ', luz)

    return luz;
  }

  async crearModelo(padre: TNodo | null, fichero: string, trasl: vec3, rot: vec3, esc: vec3): Promise<TNodo> {
    if(padre == null){
      padre = this.raiz;
    }
    const modelo = new TNodo(null, padre);
    const recurso =  await this.gestorRecursos.getRecurso(fichero, 'malla') as TRecursoMalla;
    console.log('recurso: ', recurso)
    this.recursoMalla = recurso;
    
    let vertices: number[] = [];
    let normales: number[] = [];
    let coordTexturas: number[] = [];
    let indices: number[] = [];

    recurso.getMallas().forEach(malla => {
        vertices = vertices.concat(malla.getVertices());
        normales = normales.concat(malla.getNormales());
        coordTexturas = coordTexturas.concat(malla.getCoordTexturas());
        indices = indices.concat(malla.getIndices());
    });

    modelo.setEntidad(new TMalla(vertices, normales, coordTexturas, indices));
    console.log('modelo entidad: ', modelo.getEntidad())
    modelo.setTraslacion(trasl);
    modelo.setRotacion(rot);
    modelo.setEscalado(esc);
    modelo.setActualizarMatriz(true);

    padre.addHijo(modelo);

    console.log('modelo creado: ', modelo)

    return modelo;
  }

  // Recorrer el arbol de nodos y dibujar cada uno de ellos
  dibujarEscena() {
    let matrizId = mat4.create();

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

    this.raiz.recorrer(matrizId);
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

  render() {
    if(this.gl && this.program){
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      
      if(this.recursoMalla){
        this.recursoMalla.dibujar(this.gl, this.program);
        // requestAnimationFrame(() => this.render());
      }
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