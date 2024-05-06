import { TRecurso } from './recurso';
import { mat4, vec3 } from 'gl-matrix';
import { TRecursoShader } from './TRecursoShader';

export class TRecursoMalla extends TRecurso {
  private programId: any;
  private indices: Uint16Array;
  private vertices: Float32Array;
  private normales: Float32Array;
  private coordTexturas: Float32Array;
  private TRecusoShader: TRecursoShader;
  public override gl: WebGL2RenderingContext;
  private basePath: string = '../../../../assets/glTF/';

  private bufIndex: any = null;
  private bufVertex: any = null;
  private bufNormal: any = null;
  private bufTextCood: any = null;

  private vertexBuffers: WebGLBuffer[] = [];
  private normalBuffers: WebGLBuffer[] = [];
  private indexBuffers: WebGLBuffer[] = [];
  private texCoordBuffers: WebGLBuffer[] = [];
  private colorBuffers: WebGLBuffer[] = []; // Si decides usar colores
  private indexCounts: number[] = [];

  private baseColor!: Float32Array;

  private objectIDs: any = {};

  private texturas: any

  private texturaPorCara: any;

  private selectedFaceIndex: number | null = null;

  constructor(nombre: string, shader: TRecursoShader, texturas: any) {
    super();
    this.vertices = new Float32Array();
    this.normales = new Float32Array();
    this.coordTexturas = new Float32Array();
    this.baseColor = new Float32Array(4);
    this.indices = new Uint16Array();

    // console.log(texturas);

    this.texturas = texturas;

    // console.log(this.texturas);

    var canvas = <HTMLCanvasElement>document.getElementById('canvasWebGL');
    var context = canvas.getContext('webgl2');
    if (context === null) {
      throw new Error('Unable to get WebGL2 context');
    }
    this.gl = context;
    this.TRecusoShader = shader;
    this.programId = this.TRecusoShader.getProgramId();
    this.setNombre(nombre);
    console.log(this.getNombre())
  }

  override async cargarRecurso(nombre: string): Promise<void> {
    // console.log(`Cargando recurso de malla ${nombre}...`);

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

        // console.log(bufferData);

        
        let meshIndex = 0;

        // Recorrer cada malla en el archivo GLTF
        for (const mesh of gltf.meshes) {
            console.log(`Procesando malla: ${mesh.name}`);

            this.objectIDs[mesh.name] = meshIndex;
            meshIndex++;
            console.log(mesh.name);

            // Recorrer cada primitiva en la malla
            for (const primitive of mesh.primitives) {
                const attributes = primitive.attributes;
                const indices = primitive.indices;

                const materialIndex = primitive.material;
                const material = gltf.materials[materialIndex];
                const baseColorFactor = material.pbrMetallicRoughness.baseColorFactor;

                this.baseColor = new Float32Array(baseColorFactor);

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

                // let colorData = undefined;
                // if (attributes.COLOR_0 !== undefined) {
                //     const bufferViewColor = gltf.bufferViews[attributes.COLOR_0];
                //     colorData = new Float32Array(bufferData[bufferViewColor.buffer], bufferViewColor.byteOffset, bufferViewColor.byteLength / Float32Array.BYTES_PER_ELEMENT);
                //     console.log(`Datos de colores cargados para malla: ${mesh.name}`, colorData);
                // }

                // Llamar a métodos de configuración de WebGL para usar estos datos
                this.configurarBuffers(vertexData, normalData, texCoordData, indexData);
            }
        }
        
        this.calcularCarasTexturas();
        
        console.log(`Recurso malla ${nombre} cargado correctamente.`);

    } catch (error) {
        console.error(`Error al cargar el recurso de malla ${nombre}:`, error);
    }
  }

  configurarBuffers(vertexData: Float32Array, normalData: Float32Array, texCoordData?: Float32Array, indexData?: Uint16Array, colorData?: any): void {
    let gl = this.gl;

    // Crear y configurar el buffer de vértices
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
    this.vertexBuffers.push(vertexBuffer!);

    // console.log(vertexBuffer);

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
        this.texCoordBuffers.push(texCoordBuffer!);
    }

    //Crear y configurar el buffer de color, si existe
    let colorBuffer = null;
    if (colorData) {
        colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
        this.colorBuffers.push(colorBuffer!);
    }

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

  calcularCarasTexturas() {
    const caras = ["Cube.001", "Cube.002", "Cube.003", "Cube.004", "Cube.005", "Cube.006"];
    const texturasDisponibles = this.texturas.length;
    this.texturaPorCara = {};

    // Mezclar aleatoriamente el array de caras
    caras.sort(() => 0.5 - Math.random());

    // Asegurarse de que el número de texturas no exceda el número de caras
    const carasParaTexturizar = Math.min(caras.length, texturasDisponibles);

    // Crear un array de índices de textura y mezclarlo aleatoriamente
    let indicesTexturas = Array.from({length: texturasDisponibles}, (_, index) => index);
    indicesTexturas.sort(() => 0.5 - Math.random());

    for (let i = 0; i < carasParaTexturizar; i++) {
        // Asignar cada textura a una cara diferente
        this.texturaPorCara[this.objectIDs[caras[i]]] = indicesTexturas[i];
    }
  }

  public seleccionarCara(index: number) {
    this.selectedFaceIndex = index;
  }



  dibujar(matrizTransf: mat4): void {
    let gl = this.gl;
    gl.useProgram(this.programId);

    // let applyTextureArray = [0, 0, 0, 0, 0, 0];
    // applyTextureArray[2] = 1;

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

        //Configuración de buffer de textura
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffers[i]);
        let texCoordLocation = gl.getAttribLocation(this.programId, 'vertTexCoord');
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(texCoordLocation);

        // let applyTexture = (i === this.objectIDs["Cube.006"]);
        // let applyTextureUniform = gl.getUniformLocation(this.programId, 'applyTexture');
        // gl.uniform1i(applyTextureUniform, applyTexture ? 1 : 0);

        let texturaIndex = this.texturaPorCara[i];

        // console.log(this.texturas[texturaIndex].tex);
        if (texturaIndex !== undefined) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texturas[texturaIndex].texture);
            gl.uniform1i(gl.getUniformLocation(this.programId, 'sampler'), 0);
            gl.uniform1i(gl.getUniformLocation(this.programId, 'applyTexture'), 1);
        } else {
            gl.uniform1i(gl.getUniformLocation(this.programId, 'applyTexture'), 0);
        }

        let isSelectedUniform = gl.getUniformLocation(this.programId, 'isSelected');
        gl.uniform1i(isSelectedUniform, this.selectedFaceIndex === i ? 1 : 0);

        // Configuración de la matriz de modelo-vista
        var locationVmatrix = this.gl.getUniformLocation(this.programId, 'u_ModelViewMatrix');
        if (locationVmatrix) {
          let modelViewMatrix = mat4.create();
          mat4.multiply(modelViewMatrix, this.TRecusoShader.getViewMatrix(), matrizTransf);
          this.gl.uniformMatrix4fv(locationVmatrix, false, modelViewMatrix);
        }

        let colorLocation = gl.getUniformLocation(this.programId, 'u_Color');
        gl.uniform4fv(colorLocation, this.baseColor);

        // Configuración del buffer de coordenadas de textura, si existe
        // if (this.texCoordBuffers[i]) {
        //     gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffers[i]);
        //     let textCoordAttribLocation = gl.getAttribLocation(this.programId, 'vertTexCoord');
        //     gl.vertexAttribPointer(textCoordAttribLocation, 2, gl.FLOAT, false, 0, 0);
        //     gl.enableVertexAttribArray(textCoordAttribLocation);
        // }

        // Vinculación y dibujo usando el buffer de índices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffers[i]);
        gl.drawElements(gl.TRIANGLES, this.indexCounts[i], gl.UNSIGNED_SHORT, 0);
    }
  }
}
