import { TRecurso } from './recurso';
import { TMalla } from '../arbol_escena/malla';
import { mat4, vec3 } from 'gl-matrix';
import { TRecursoShader } from './TRecursoShader'

export class TRecursoMalla extends TRecurso {
  private indices: number[];
  private vertices: number[];
  private normales: number[];
  private coordTex: number[];
  private colores: number[][];
  private nombreMalla: string;
  private TRecusoShader: TRecursoShader;
  public override gl: WebGLRenderingContext;
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

      // this.vertices = data.meshes.vertices;
      // this.normales = data.meshes.normals;
      // this.coordTex = data.meshes.texturecoords;
      // console.log(data.meshes.faces)
      // for(var i = 0; i < data.meshes.faces.length; i++){
      //   for(var j = 0; j < data.meshes.faces[i].length; j++)
      //     this.indices.push(data.meshes.faces[i][j]);
      // }

      //llamada a configurarBuffers
      this.configurarBuffers();
  
      console.log(`Recurso malla ${nombre} cargado correctamente.`);
    
    } catch (error) {
      console.error(`Error al cargar el recurso de malla ${nombre}:`, error);
    }
  }

  configurarBuffers() {
    let vertexBuffer, normalBuffer, indexBuffer, textCoodBuffer, colorBuffer;
    const coloresAplanados = this.colores.flat();

    vertexBuffer = this.gl.createBuffer();
    normalBuffer = this.gl.createBuffer();
    indexBuffer = this.gl.createBuffer();
    textCoodBuffer = this.gl.createBuffer();
    colorBuffer = this.gl.createBuffer();

    if (!vertexBuffer || !normalBuffer || !indexBuffer || !textCoodBuffer || !colorBuffer) {
      throw new Error('Error al crear los buffers');
    }

    //Vertices
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
    const positionLocation = this.gl.getAttribLocation(this.TRecusoShader.getProgramId(), 'vertPosition');
    this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(positionLocation);

    //Normales
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
    // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.normales), this.gl.STATIC_DRAW);
    // const normalLocation = this.gl.getAttribLocation(this.TRecusoShader.getProgramId(), 'vertNormal');
    // this.gl.vertexAttribPointer(normalLocation, 3, this.gl.FLOAT, false, 0, 0);
    // this.gl.enableVertexAttribArray(normalLocation);

    //Indices
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);

    //Coordenadas de textura
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textCoodBuffer);
    // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.coordTex), this.gl.STATIC_DRAW);
    // const textCoordLocation = this.gl.getAttribLocation(this.TRecusoShader.getProgramId(), 'vertTexCoord');
    // this.gl.vertexAttribPointer(textCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
    // this.gl.enableVertexAttribArray(textCoordLocation);

    //Colores
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(coloresAplanados), this.gl.STATIC_DRAW);
    const colorLocation = this.gl.getAttribLocation(this.TRecusoShader.getProgramId(), 'vertColor');
    this.gl.vertexAttribPointer(colorLocation, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(colorLocation);
  }

  // En TRecursoMalla
  dibujar(matrizTransf: mat4): void {
    console.log(`Dibujando la malla ${this.getNombre()}`);
    
    var locationPmatrix = this.gl.getUniformLocation(this.TRecusoShader.getProgramId(), 'Pmatrix');
    var locationVmatrix = this.gl.getUniformLocation(this.TRecusoShader.getProgramId(), 'Vmatrix');
    var locationMmatrix = this.gl.getUniformLocation(this.TRecusoShader.getProgramId(), 'Mmatrix');

    if(locationPmatrix){
      this.gl.uniformMatrix4fv(locationPmatrix, false, this.TRecusoShader.getProjMatrix());
    }
    if(locationVmatrix){
      this.gl.uniformMatrix4fv(locationVmatrix, false, this.TRecusoShader.getViewMatrix());
    }
    if(locationMmatrix){
      this.gl.uniformMatrix4fv(locationMmatrix, false, matrizTransf);
    }

    this.gl.bindAttribLocation(this.TRecusoShader.getProgramId(), 0, 'vertPosition');
    this.gl.bindAttribLocation(this.TRecusoShader.getProgramId(), 1, 'vertNormal');
    
    this.gl.useProgram(this.TRecusoShader.getProgramId());

    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
  }
}
