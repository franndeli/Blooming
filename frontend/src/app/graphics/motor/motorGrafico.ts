import { mat4, vec3 } from 'gl-matrix';
import { ElementRef } from '@angular/core';
import { GestorRecursos, TRecursoMalla, TNodo, TCamara, TLuz, TMalla } from '../../graphics';
import vertexShaderText from '../../graphics/shaders/vertexShader';
import fragmentShaderText from '../../graphics/shaders/fragmentShader';

export class MotorGrafico {
  gl: WebGLRenderingContext | null = null;
  program: WebGLProgram | null = null;
  recursoMalla: TRecursoMalla | null = null;
  private raiz = new TNodo();
  private gestorRecursos = new GestorRecursos();

  crearNodo(padre:TNodo, trasl: vec3, rot: vec3, esc: vec3): TNodo {
    if(padre == null){
      padre = this.raiz;
    }
    const nodo = new TNodo(null, padre);
    nodo.traslacion = trasl;
    nodo.rotacion = rot;
    nodo.escalado = esc;
    //actualiza la matriz de transformación -> actualizarMatriz = true;
    return nodo;
  }

  crearCamara(padre: TNodo, trasl: vec3, rot: vec3, esc: vec3, cercano: number, lejano: number): TNodo {
    if(padre == null){
      padre = this.raiz;
    }
    const camara = new TNodo(null, padre);
    camara.entidad = new TCamara();
    camara.traslacion = trasl;
    camara.rotacion = rot;
    camara.escalado = esc;
    //actualiza la matriz de transformación -> actualizarMatriz = true;
    return camara;
  }

  crearLuz(padre: TNodo, trasl: vec3, rot: vec3, esc: vec3, intensidad: vec3 /*, tipoLuz: EnumType*/): TNodo {
    if(padre == null){
      padre = this.raiz;
    }
    const luz = new TNodo(null, padre);
    luz.entidad = new TLuz(intensidad);
    luz.traslacion = trasl;
    luz.rotacion = rot;
    luz.escalado = esc;
    //actualiza la matriz de transformación -> actualizarMatriz = true;
    return luz;
  }

  crearModelo(padre: TNodo, trasl: vec3, rot: vec3, esc: vec3, fichero: string): TNodo {
    if(padre == null){
      padre = this.raiz;
    }
    const modelo = new TNodo(null, padre);
    const recurso = this.gestorRecursos.getRecurso(fichero, 'malla') as TRecursoMalla;
    
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

    modelo.entidad = new TMalla(vertices, normales, coordTexturas, indices);
    modelo.traslacion = trasl;
    modelo.rotacion = rot;
    modelo.escalado = esc;
    //actualiza la matriz de transformación -> actualizarMatriz = true;
    return modelo;
  }

  async iniciarEscena(canvasRef: ElementRef<HTMLCanvasElement>): Promise<void> {
    if (canvasRef && canvasRef.nativeElement) {
      const canvas = canvasRef.nativeElement;
      this.gl = canvas.getContext('webgl');
      
      if (!this.gl) {
        console.error('No se puede inicializar WebGL. Tu navegador o máquina puede no soportarlo.');
        return;
      }

      if(this.gl){
        this.gl.clearColor(0.0, 2.0, 4.0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
      }
     
      const error = this.gl.getError();
      if (error != this.gl.NO_ERROR) {
        console.error('Se produjo un error de WebGL: ', error);
      }
      
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

        this.gl.useProgram(this.program);

        const error = this.gl.getError();
        if (error != this.gl.NO_ERROR) {
          console.error('Se produjo un error de WebGL: ', error);
        }
      }
            
      // Carga los recursos necesarios para la malla
      const cargaMalla = this.gestorRecursos.cargarRecurso('mallaEjemplo', 'malla', '../../../../assets/json/malla.json');
      await Promise.all([cargaMalla]);

      // Asigna el recurso malla a la variable
      this.recursoMalla = this.gestorRecursos.getRecurso('mallaEjemplo', 'malla') as TRecursoMalla;
            
      console.log(this.recursoMalla);
      this.render();
      // if (recursoMalla) {
      //   // Llama al método dibujar de recursoMalla
      //   if(program){
      //     console.log(program);
      //     console.log(gl);
      //     recursoMalla.dibujar(gl, program);
      //   }
      // }
    } else {
      console.error('El elemento canvas no está disponible.');
    }
  }

  render() {
    if(this.gl && this.program){
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      
      if(this.recursoMalla){
        console.log(this.program);
        console.log(this.gl);
        this.recursoMalla.dibujar(this.gl, this.program);
      }
    }
  }
}