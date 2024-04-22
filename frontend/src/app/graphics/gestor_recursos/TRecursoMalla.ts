import { TRecurso } from './recurso';
import { TMalla } from '../arbol_escena/malla';
import { mat4, vec3 } from 'gl-matrix';
import { TRecursoShader } from './TRecursoShader'

export class TRecursoMalla extends TRecurso {
  private indices: Uint16Array;
  private vertices: Float32Array;
  private normales: Float32Array;
  private coordTexturas: Float32Array;
  private colores: Float32Array;
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
    this.normales = new Float32Array();
    this.coordTexturas = new Float32Array();
    this.colores = new Float32Array();
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
      const gltf = await response.json();

      const mesh = gltf.meshes[0]; // Usualmente, glTF tiene un array de 'meshes'
      const primerPrimitive = mesh.primitives[0];

      // Cargar posiciones
      const accessorPosicion = gltf.accessors[primerPrimitive.attributes.POSITION];
      const bufferViewPosicion = gltf.bufferViews[accessorPosicion.bufferView];
      const posicionBuffer = await fetch(this.basePath + gltf.buffers[bufferViewPosicion.buffer].uri);
      const posicionData = await posicionBuffer.arrayBuffer();
      this.vertices = new Float32Array(posicionData);

      // Cargar normales
      const accessorNormal = gltf.accessors[primerPrimitive.attributes.NORMAL];
      const bufferViewNormal = gltf.bufferViews[accessorNormal.bufferView];
      const normalBuffer = await fetch(this.basePath + gltf.buffers[bufferViewNormal.buffer].uri);
      const normalData = await normalBuffer.arrayBuffer();
      this.normales = new Float32Array(normalData);

      // Cargar coordenadas de textura (si existen)
      if (primerPrimitive.attributes.TEXCOORD_0) {
        const accessorTexCoords = gltf.accessors[primerPrimitive.attributes.TEXCOORD_0];
        const bufferViewTexCoords = gltf.bufferViews[accessorTexCoords.bufferView];
        const texCoordBuffer = await fetch(this.basePath + gltf.buffers[bufferViewTexCoords.buffer].uri);
        const texCoordData = await texCoordBuffer.arrayBuffer();
        this.coordTexturas = new Float32Array(texCoordData);
      }

      // Cargar colores
      /*if (primerPrimitive.attributes.COLOR_0) {
        const accessorColor = gltf.accessors[primerPrimitive.attributes.COLOR_0];
        const bufferViewColor = gltf.bufferViews[accessorColor.bufferView];
        const colorBuffer = await fetch(this.basePath + gltf.buffers[bufferViewColor.buffer].uri);
        const colorData = await colorBuffer.arrayBuffer();
        this.colores = new Float32Array(colorData);  // Asumiendo que los colores son vec4 RGBA
      }*/

      // Cargar índices
      if (primerPrimitive.indices) {
        const accessorIndices = gltf.accessors[primerPrimitive.indices];
        const bufferViewIndices = gltf.bufferViews[accessorIndices.bufferView];
        const indexBuffer = await fetch(this.basePath + gltf.buffers[bufferViewIndices.buffer].uri);
        const indexData = await indexBuffer.arrayBuffer();
        this.indices = new Uint16Array(indexData); // Asumiendo que los índices son Uint16
      }

      // Llamada a configurarBuffers
      this.configurarBuffers();

      console.log(`Recurso malla ${nombre} cargado correctamente.`);

    } catch (error) {
      console.error(`Error al cargar el recurso de malla ${nombre}:`, error);
    }
  }


  configurarBuffers() {
    let vertexBuffer, normalBuffer, indexBuffer, textCoodBuffer, colorBuffer;

    //const coloresAplanados = this.colores.flat();
    
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
    this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(positionLocation);

    var textCoordAttribLocation = this.gl.getAttribLocation(this.programId, 'vertTexCoord');
    this.gl.vertexAttribPointer(textCoordAttribLocation, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(textCoordAttribLocation);

    //Normales
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.normales), this.gl.STATIC_DRAW);
    const normalLocation = this.gl.getAttribLocation(this.programId, 'vertNormal');
    this.gl.vertexAttribPointer(normalLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(normalLocation);

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
    // Configurar el buffer de colores
    colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.colores), this.gl.STATIC_DRAW);
    const colorLocation = this.gl.getAttribLocation(this.programId, 'vertColor');
    this.gl.vertexAttribPointer(colorLocation, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(colorLocation);

    

    this.bufVertex = vertexBuffer;
    this.bufNormal = normalBuffer;
    this.bufIndex = indexBuffer;
    this.bufTextCood = textCoodBuffer;
  }

  // En TRecursoMalla
  // dibujar(matrizTransf: mat4): void {
  //   console.log(`Dibujando la malla ${this.nombreMalla}`);

  //   this.gl.useProgram(this.programId);
    
  //   var locationPmatrix = this.gl.getUniformLocation(this.programId, 'u_ProjectionMatrix');
  //   var locationVmatrix = this.gl.getUniformLocation(this.programId, 'u_ModelViewMatrix');
  //   // // var locationMmatrix = this.gl.getUniformLocation(this.programId, 'u_NormalMatrix');

  //   if(locationPmatrix){
  //     this.gl.uniformMatrix4fv(locationPmatrix, false, this.TRecusoShader.getProjMatrix());
  //   }
    
  //   if(locationVmatrix){
  //     this.gl.uniformMatrix4fv(locationVmatrix, false, this.TRecusoShader.getViewMatrix());
  //   }
  //   // if(locationMmatrix){
  //   //   this.gl.uniformMatrix4fv(locationMmatrix, false, matrizTransf);
  //   // }

  //   this.gl.bindAttribLocation(this.programId, 0, 'vertPosition');
  //   this.gl.bindAttribLocation(this.programId, 0, 'vertNormal');
    
  //   this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
  // }

  dibujar(matrizTransf: mat4): void {
    //console.log(`Dibujando la malla ${this.nombreMalla}`);

    // Usar el programa de shader actual
    this.gl.useProgram(this.programId);
    
    // Obtener y configurar la matriz de proyección si es necesario
    // var locationPmatrix = this.gl.getUniformLocation(this.programId, 'u_ProjectionMatrix');
    // if (locationPmatrix) {
    //   this.gl.uniformMatrix4fv(locationPmatrix, false, this.TRecusoShader.getProjMatrix());
    // }

    // Obtener y configurar la matriz de modelo-vista
    var locationVmatrix = this.gl.getUniformLocation(this.programId, 'u_ModelViewMatrix');
    if (locationVmatrix) {
      let modelViewMatrix = mat4.create();
      mat4.multiply(modelViewMatrix, this.TRecusoShader.getViewMatrix(), matrizTransf);
      this.gl.uniformMatrix4fv(locationVmatrix, false, modelViewMatrix);
    }

    // Asegurarse de que los buffers de vértices y de índices estén correctamente vinculados
    // Esto solo es necesario si los buffers podrían haber cambiado desde la última vez que se configuraron
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufVertex);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.bufIndex);

    // Dibujar los elementos
    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
  }

}
