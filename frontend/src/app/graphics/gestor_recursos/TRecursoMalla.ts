import { TRecurso } from './recurso';
import { TMalla } from '../arbol_escena/malla';
import { mat4, vec3 } from 'gl-matrix';
import { TRecursoShader } from './TRecursoShader'

export class TRecursoMalla extends TRecurso {
  private indices: Uint16Array;
  private vertices: Float32Array;
  private normales: number[];
  private coordTex: number[];
  private colores: number[][];
  private nombreMalla: string;
  private programId: any;
  private TRecusoShader: TRecursoShader;
  public override gl: WebGL2RenderingContext;
  private basePath: string = '../../../../assets/json/';

  private bufVertex: any = null;
  private bufNormal: any = null;
  private bufIndex: any = null;
  private bufTextCood: any = null;


  constructor(nombre: string, shader: TRecursoShader) {
    super();
    this.vertices = new Float32Array();
    this.normales = new Array();
    this.coordTex = [];
    this.colores = [];
    this.indices = new Uint16Array();
    var canvas = <HTMLCanvasElement>document.getElementById('canvasWebGL');
    var context = canvas.getContext('webgl2');
    if (context === null) {
      throw new Error('Unable to get WebGL2 context');
    }
    this.gl = context;
    this.TRecusoShader = shader;
    this.programId = this.TRecusoShader.getProgramId();
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

      const mesh = data.meshes.find((m: any) => m.name === "Cube");

      this.vertices = mesh.vertices;
      this.normales = mesh.normals;
      this.indices = new Uint16Array([].concat(...mesh.faces));
      this.coordTex = mesh.texturecoords[0];

      // this.vertices = data.vertices;
      // this.vertices = data.vertices;
      // this.normales = data.normales;
      // this.coordTex = data.coordTexturas;
      // this.indices = data.indices;

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
    
    this.gl.createVertexArray();

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
    const positionLocation = this.gl.getAttribLocation(this.programId, 'vertPosition');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    

    //Normales
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
    // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.normales), this.gl.STATIC_DRAW);
    // const normalLocation = this.gl.getAttribLocation(this.programId, 'vertNormal');
    // this.gl.vertexAttribPointer(normalLocation, 3, this.gl.FLOAT, false, 0, 0);
    // this.gl.enableVertexAttribArray(normalLocation);

    //Indices
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);

    //Coordenadas de textura
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textCoodBuffer);
    // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.coordTex), this.gl.STATIC_DRAW);
    // const textCoordLocation = this.gl.getAttribLocation(this.programId, 'vertTexCoord');
    // this.gl.vertexAttribPointer(textCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
    // this.gl.enableVertexAttribArray(textCoordLocation);

    //Colores
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(coloresAplanados), this.gl.STATIC_DRAW);
    // const colorLocation = this.gl.getAttribLocation(this.programId, 'vertColor');
    // this.gl.vertexAttribPointer(colorLocation, 4, this.gl.FLOAT, false, 0, 0);
    // this.gl.enableVertexAttribArray(colorLocation);

    this.bufVertex = vertexBuffer;
    this.bufNormal = normalBuffer;
    this.bufIndex = indexBuffer;
    this.bufTextCood = textCoodBuffer;
  }

  // En TRecursoMalla
  dibujar(matrizTransf: mat4): void {
    console.log(`Dibujando la malla ${this.getNombre()}`);

    this.gl.useProgram(this.programId);

    //Vertices
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufVertex);
    // const positionLocation = this.gl.getAttribLocation(this.programId, 'vertPosition');
    // this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    // this.gl.enableVertexAttribArray(positionLocation);

    // //Normales
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufNormal);
    // const normalLocation = this.gl.getAttribLocation(this.programId, 'vertNormal');
    // this.gl.vertexAttribPointer(normalLocation, 3, this.gl.FLOAT, false, 0, 0);
    // this.gl.enableVertexAttribArray(normalLocation);

    //Indices
    // this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.bufIndex);

    this.gl.useProgram(this.programId);
    
    // var locationPmatrix = this.gl.getUniformLocation(this.programId, 'u_ProjectionMatrix');
    // var locationVmatrix = this.gl.getUniformLocation(this.programId, 'u_ModelViewMatrix');
    // // var locationMmatrix = this.gl.getUniformLocation(this.programId, 'u_NormalMatrix');

    // if(locationPmatrix){
    //   this.gl.uniformMatrix4fv(locationPmatrix, false, this.TRecusoShader.getProjMatrix());
    // }
    // if(locationVmatrix){
    //   this.gl.uniformMatrix4fv(locationVmatrix, false, this.TRecusoShader.getViewMatrix());
    // }
    // if(locationMmatrix){
    //   this.gl.uniformMatrix4fv(locationMmatrix, false, matrizTransf);
    // }

    this.gl.bindAttribLocation(this.programId, 0, 'vertPosition');
    // this.gl.bindAttribLocation(this.programId, 0, 'vertNormal');
    
    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
  }
}
