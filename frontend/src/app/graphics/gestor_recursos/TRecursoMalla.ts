import { TRecurso } from './recurso';
import { TMalla } from '../arbol_escena/malla';
import { mat4, vec3 } from 'gl-matrix';
import { TRecursoShader } from './TRecursoShader'

export class TRecursoMalla extends TRecurso {
  // private mallas: TMalla[] = [];
  private vertices: number[];
  private normales: number[];
  private coordTex: number[];
  private colores: number[][];
  private indices: number[];
  private TRecusoShader: TRecursoShader;
  public override gl: WebGLRenderingContext;
  private buffers: Array<WebGLBuffer>;
  private nombreMalla: string;

  private basePath: string = '../../../../assets/json/';

  constructor(nombre: string, shader: TRecursoShader) {
    super();
    this.vertices = [];
    this.normales = new Array();
    this.coordTex = [];
    this.colores = [];
    this.indices = new Array();
    var canvas = <HTMLCanvasElement>document.getElementById('canvasWebGL');
    var context = canvas.getContext('webgl2');
    if (context === null) {
      throw new Error('Unable to get WebGL2 context');
    }
    this.gl = context;
    this.TRecusoShader = shader;
    this.buffers = new Array(3);
    this.nombreMalla = nombre;
  }

  override async cargarRecurso(nombre: string): Promise<void> {
    console.log(`Cargando recurso de malla ${nombre}...`);
    try {
      const url = this.basePath + nombre;
  
      const response = await fetch(url);
      console.log(response);
      const data = await response.json();
      console.log(data);
  
      this.vertices = data.mallas[0].vertices;
      this.normales = data.mallas[0].normales;
      this.coordTex = data.mallas[0].coordTexturas;
      this.colores = data.mallas[0].colores;
      this.indices = data.mallas[0].indices;

      //llamada a configurarBuffers
  
      console.log(`Recurso malla ${nombre} cargado correctamente.`);
    
    } catch (error) {
      console.error(`Error al cargar el recurso de malla ${nombre}:`, error);
    }
  }

  // En TRecursoMalla
  dibujar(matrizTransf: mat4): void {
    console.log(`Dibujando la malla ${this.getNombre()}`);
    if (!this.gl) {
      console.error("WebGL context or shader program no está definido.");
      return;
    }

    console.log(this.TRecusoShader);
        
        // Crear y asociar los datos de vértices al buffer
        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);

        const positionLocation = this.gl.getAttribLocation(this.TRecusoShader.getProgramId(), 'vertPosition');

        this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(positionLocation);

        // Crear y asociar los datos de color al buffer
        const colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
        const coloresAplanados = this.colores.flat();
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(coloresAplanados), this.gl.STATIC_DRAW);

        const colorLocation = this.gl.getAttribLocation(this.TRecusoShader.getProgramId(), 'vertColor');

        this.gl.vertexAttribPointer(colorLocation, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(colorLocation);

        // Crear y asociar los índices de la malla al buffer de elementos
        const indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);

        // Dibujar la malla
        this.gl.useProgram(this.TRecusoShader.getProgramId());
        
        if(this.gl.getError() !== this.gl.NO_ERROR){
            console.error("WebGL error: " + this.gl.getError());
        }
        
        this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
    // this.mallas.forEach((malla) => {
    //   malla.dibujar(gl, shaderProgram, matrizTransf);
    // });
  }
}
