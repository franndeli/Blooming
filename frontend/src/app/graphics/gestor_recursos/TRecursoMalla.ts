import { TRecurso } from './recurso';
import { TMalla } from '../arbol_escena/malla';
import { mat4, vec3 } from 'gl-matrix';
import { TRecursoShader } from './TRecursoShader'
import { Vector3 } from 'three';

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

  private vertexBuffers: WebGLBuffer[] = [];
  private normalBuffers: WebGLBuffer[] = [];
  private indexBuffers: WebGLBuffer[] = [];
  private texCoordBuffers: WebGLBuffer[] = [];
  private colorBuffers: WebGLBuffer[] = []; // Si decides usar colores
  private indexCounts: number[] = [];

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
    // console.log(`Cargando recurso de malla ${nombre}...`);

    // try {
    //   const url = this.basePath + nombre;
    //   const response = await fetch(url);
    //   const gltf = await response.json();
    //   const mesh = gltf.meshes[0]; // Usualmente, glTF tiene un array de 'meshes'
    //   const primerPrimitive = mesh.primitives[0];

    //   // Cargar vertices
    //   const accessorVertices = gltf.accessors[primerPrimitive.attributes.POSITION];
    //   const bufferViewVertices = gltf.bufferViews[accessorVertices.bufferView];
    //   const vertexBuffer = await fetch(this.basePath + gltf.buffers[bufferViewVertices.buffer].uri);
    //   const vertexData = await vertexBuffer.arrayBuffer();
    //   console.log(vertexData);
    //   this.vertices = new Float32Array(vertexData);

    //   // Cargar normales
    //   const accessorNormal = gltf.accessors[primerPrimitive.attributes.NORMAL];
    //   const bufferViewNormal = gltf.bufferViews[accessorNormal.bufferView];
    //   const normalBuffer = await fetch(this.basePath + gltf.buffers[bufferViewNormal.buffer].uri);
    //   const normalData = await normalBuffer.arrayBuffer();
    //   this.normales = new Float32Array(normalData);

    //   // Cargar coordenadas de textura (si existen)
    //   if (primerPrimitive.attributes.TEXCOORD_0) {
    //     const accessorTexCoords = gltf.accessors[primerPrimitive.attributes.TEXCOORD_0];
    //     const bufferViewTexCoords = gltf.bufferViews[accessorTexCoords.bufferView];
    //     const texCoordBuffer = await fetch(this.basePath + gltf.buffers[bufferViewTexCoords.buffer].uri);
    //     const texCoordData = await texCoordBuffer.arrayBuffer();
    //     this.coordTexturas = new Float32Array(texCoordData);
    //   }

    //   // Cargar colores
    //   /*if (primerPrimitive.attributes.COLOR_0) {
    //     const accessorColor = gltf.accessors[primerPrimitive.attributes.COLOR_0];
    //     const bufferViewColor = gltf.bufferViews[accessorColor.bufferView];
    //     const colorBuffer = await fetch(this.basePath + gltf.buffers[bufferViewColor.buffer].uri);
    //     const colorData = await colorBuffer.arrayBuffer();
    //     this.colores = new Float32Array(colorData);  // Asumiendo que los colores son vec4 RGBA
    //   }*/

    //   // Cargar índices
    //   if (primerPrimitive.indices) {
    //     const accessorIndices = gltf.accessors[primerPrimitive.indices];
    //     const bufferViewIndices = gltf.bufferViews[accessorIndices.bufferView];
    //     const indexBuffer = await fetch(this.basePath + gltf.buffers[bufferViewIndices.buffer].uri);
    //     const indexData = await indexBuffer.arrayBuffer();
    //     this.indices = new Uint16Array(indexData); // Asumiendo que los índices son Uint16
    //   }

    //   this.configurarBuffers();
    //   console.log(`Recurso malla ${nombre} cargado correctamente.`);

    // } catch (error) {
    //   console.error(`Error al cargar el recurso de malla ${nombre}:`, error);
    // }

    console.log(`Cargando recurso de malla ${nombre}...`);

    try {
        const url = this.basePath + nombre;
        const response = await fetch(url);
        const gltf = await response.json();

        // Cargar todos los buffers en memoria primero para evitar solicitudes múltiples
        const bufferData = await Promise.all(gltf.buffers.map(async (buffer: any) => {
            const bufferUrl = this.basePath + buffer.uri;
            const bufferResponse = await fetch(bufferUrl);
            return bufferResponse.arrayBuffer();
        }));

        console.log(bufferData);

        // Recorrer cada malla en el archivo GLTF
        for (const mesh of gltf.meshes) {
            console.log(`Procesando malla: ${mesh.name}`);

            // Recorrer cada primitiva en la malla
            for (const primitive of mesh.primitives) {
                const attributes = primitive.attributes;
                const indices = primitive.indices;

                // Cargar los vértices
                const bufferViewVertices = gltf.bufferViews[attributes.POSITION];
                const vertexData = new Float32Array(bufferData[bufferViewVertices.buffer], bufferViewVertices.byteOffset, bufferViewVertices.byteLength / Float32Array.BYTES_PER_ELEMENT);
                console.log(`Datos de vértices cargados para malla: ${mesh.name}`);

                // Cargar las normales
                const bufferViewNormal = gltf.bufferViews[attributes.NORMAL];
                const normalData = new Float32Array(bufferData[bufferViewNormal.buffer], bufferViewNormal.byteOffset, bufferViewNormal.byteLength / Float32Array.BYTES_PER_ELEMENT);
                console.log(`Datos de normales cargados para malla: ${mesh.name}`);

                let texCoordData = undefined;
                if (attributes.TEXCOORD_0 !== undefined) {
                    const bufferViewTexCoords = gltf.bufferViews[attributes.TEXCOORD_0];
                    texCoordData = new Float32Array(bufferData[bufferViewTexCoords.buffer], bufferViewTexCoords.byteOffset, bufferViewTexCoords.byteLength / Float32Array.BYTES_PER_ELEMENT);
                    console.log(`Datos de coordenadas de textura cargados para malla: ${mesh.name}`);
                }

                let indexData = undefined;
                if (indices !== undefined) {
                    const bufferViewIndices = gltf.bufferViews[gltf.accessors[indices].bufferView];
                    indexData = new Uint16Array(bufferData[bufferViewIndices.buffer], bufferViewIndices.byteOffset, bufferViewIndices.byteLength / Uint16Array.BYTES_PER_ELEMENT);
                    console.log(`Datos de índices cargados para malla: ${mesh.name}`);
                }

                // Llamar a métodos de configuración de WebGL para usar estos datos
                this.configurarBuffers(vertexData, normalData, texCoordData, indexData);
            }
        }

        console.log(`Recurso malla ${nombre} cargado correctamente.`);

    } catch (error) {
        console.error(`Error al cargar el recurso de malla ${nombre}:`, error);
    }
  }


  // configurarBuffers() {
  //   let vertexBuffer, normalBuffer, indexBuffer, textCoodBuffer, colorBuffer;
    
  //   this.gl.createVertexArray();

  //   vertexBuffer = this.gl.createBuffer();
  //   normalBuffer = this.gl.createBuffer();
  //   indexBuffer = this.gl.createBuffer();
  //   textCoodBuffer = this.gl.createBuffer();
  //   colorBuffer = this.gl.createBuffer();

  //   if (!vertexBuffer || !normalBuffer || !indexBuffer || !textCoodBuffer || !colorBuffer) {
  //     throw new Error('Error al crear los buffers');
  //   }

  //   //Vertices
  //   this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
  //   this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
  //   const positionLocation = this.gl.getAttribLocation(this.programId, 'vertPosition');
  //   this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
  //   this.gl.enableVertexAttribArray(positionLocation);

  //   //Normales
  //   this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
  //   this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.normales), this.gl.STATIC_DRAW);
  //   const normalLocation = this.gl.getAttribLocation(this.programId, 'vertNormal');
  //   this.gl.vertexAttribPointer(normalLocation, 3, this.gl.FLOAT, false, 0, 0);
  //   this.gl.enableVertexAttribArray(normalLocation);

  //   //Indices
  //   this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  //   this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);

  //   //Texturas
  //   // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textCoodBuffer);
  //   // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.coordTex), this.gl.STATIC_DRAW);
  //   // const textCoordAttribLocation = this.gl.getAttribLocation(this.programId, 'vertTexCoord');
  //   // this.gl.vertexAttribPointer(textCoordAttribLocation, 2, this.gl.FLOAT, false, 0, 0);
  //   // this.gl.enableVertexAttribArray(textCoordAttribLocation);

  //   //Colores
  //   this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
  //   this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.colores), this.gl.STATIC_DRAW);
  //   const colorLocation = this.gl.getAttribLocation(this.programId, 'vertColor');
  //   this.gl.vertexAttribPointer(colorLocation, 4, this.gl.FLOAT, false, 0, 0);
  //   this.gl.enableVertexAttribArray(colorLocation);

  //   this.bufVertex = vertexBuffer;
  //   this.bufNormal = normalBuffer;
  //   this.bufIndex = indexBuffer;
  //   this.bufTextCood = textCoodBuffer;
  // }

  configurarBuffers(vertexData: Float32Array, normalData: Float32Array, texCoordData?: Float32Array, indexData?: Uint16Array): void {
    let gl = this.gl;

    // Crear y configurar el buffer de vértices
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
    this.vertexBuffers.push(vertexBuffer!);

    console.log(vertexBuffer);

    let error = gl.getError();
    if (error !== gl.NO_ERROR) {
        console.error('WebGL Error:', error);
    }

    // Crear y configurar el buffer de normales
    let normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normalData, gl.STATIC_DRAW);
    this.normalBuffers.push(normalBuffer!);

    // Crear y configurar el buffer de coordenadas de textura, si existe
    let texCoordBuffer = null;
    if (texCoordData) {
        texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texCoordData, gl.STATIC_DRAW);
    }
    this.texCoordBuffers.push(texCoordBuffer!);

    // Crear y configurar el buffer de índices, si existe
    let indexBuffer = null;
    if (indexData) {
        indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexData, gl.STATIC_DRAW);
        this.indexCounts.push(indexData.length);
    } else {
        this.indexCounts.push(0);
    }
    this.indexBuffers.push(indexBuffer!);

    // No se configuraron buffers de colores en este ejemplo, pero puedes agregarlo si es necesario
  }

  // dibujar(matrizTransf: mat4): void {

  //   // Usar el programa de shader actual
  //   this.gl.useProgram(this.programId);

  //   // Obtener y configurar la matriz de modelo-vista
  //   var locationVmatrix = this.gl.getUniformLocation(this.programId, 'u_ModelViewMatrix');
  //   if (locationVmatrix) {
  //     let modelViewMatrix = mat4.create();
  //     mat4.multiply(modelViewMatrix, this.TRecusoShader.getViewMatrix(), matrizTransf);
  //     this.gl.uniformMatrix4fv(locationVmatrix, false, modelViewMatrix);
  //   }

  //   // Asegurarse de que los buffers de vértices y de índices estén correctamente vinculados
  //   // Esto solo es necesario si los buffers podrían haber cambiado desde la última vez que se configuraron
  //   this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufVertex);
  //   this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.bufIndex);

  //   // Dibujar los elementos
  //   this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
  // }

  dibujar(matrizTransf: mat4): void {
    let gl = this.gl;
    gl.useProgram(this.programId);

    // Iterar sobre cada mesh registrado (cada uno tiene su propio conjunto de buffers)
    for (let i = 0; i < this.vertexBuffers.length; i++) {
        // Configuración del buffer de vértices y atributo en el shader
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffers[i]);
        let positionLocation = gl.getAttribLocation(this.programId, 'vertPosition');
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocation);

        // Configuración del buffer de normales y atributo en el shader
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffers[i]);
        let normalLocation = gl.getAttribLocation(this.programId, 'vertNormal');
        gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(normalLocation);

        // Configuración de la matriz de modelo-vista
        let locationVmatrix = gl.getUniformLocation(this.programId, 'u_ModelViewMatrix');
        let modelViewMatrix = mat4.create();
        mat4.multiply(modelViewMatrix, this.TRecusoShader.getViewMatrix(), matrizTransf);
        gl.uniformMatrix4fv(locationVmatrix, false, modelViewMatrix);

        // Configuración del buffer de coordenadas de textura, si existe
        if (this.texCoordBuffers[i]) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffers[i]);
            let textCoordAttribLocation = gl.getAttribLocation(this.programId, 'vertTexCoord');
            gl.vertexAttribPointer(textCoordAttribLocation, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(textCoordAttribLocation);
        }

        // Vinculación y dibujo usando el buffer de índices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffers[i]);
        gl.drawElements(gl.TRIANGLES, this.indexCounts[i], gl.UNSIGNED_SHORT, 0);
    }
  }
}
