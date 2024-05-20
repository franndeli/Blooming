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

  objectIDs: any = {};

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

    this.texturas = texturas;

    var canvas = <HTMLCanvasElement>document.getElementById('canvasWebGL');
    var context = canvas.getContext('webgl2');
    if (context === null) {
      throw new Error('Unable to get WebGL2 context');
    }
    this.gl = context;
    this.TRecusoShader = shader;
    this.programId = this.TRecusoShader.getProgramId();
    this.setNombre(nombre);
  }

  setSelectedFaceNull(){
    this.selectedFaceIndex = null;
  }

  override async cargarRecurso(nombre: string): Promise<void> {
    this.selectedFaceIndex = null;

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
        
        let meshIndex = 0;

        // Recorrer cada malla en el archivo GLTF
        for (const mesh of gltf.meshes) {
            this.objectIDs[mesh.name] = meshIndex;
            meshIndex++;

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

                // Cargar las normales
                const bufferViewNormal = gltf.bufferViews[attributes.NORMAL];
                const normalData = new Float32Array(bufferData[bufferViewNormal.buffer], bufferViewNormal.byteOffset, bufferViewNormal.byteLength / Float32Array.BYTES_PER_ELEMENT);

                let texCoordData = undefined;
                if (attributes.TEXCOORD_0 !== undefined) {
                  const bufferViewTexCoords = gltf.bufferViews[attributes.TEXCOORD_0];
                  texCoordData = new Float32Array(bufferData[bufferViewTexCoords.buffer], bufferViewTexCoords.byteOffset, bufferViewTexCoords.byteLength / Float32Array.BYTES_PER_ELEMENT);
                }

                let indexData = undefined;
                if (indices !== undefined) {
                  const bufferViewIndices = gltf.bufferViews[gltf.accessors[indices].bufferView];
                  indexData = new Uint16Array(bufferData[bufferViewIndices.buffer], bufferViewIndices.byteOffset, bufferViewIndices.byteLength / Uint16Array.BYTES_PER_ELEMENT);
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
    this.selectedFaceIndex = null;
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
        // Asignar el nombre de cada textura a una cara diferente
        this.texturaPorCara[caras[i]] = this.texturas[indicesTexturas[i]].nombre;
    }

    //console.log(this.texturaPorCara);
  }

  getTexturaPorCara(cara: string): string {
    //console.log(this.texturaPorCara[cara]);
    return this.texturaPorCara[cara] || "Sin textura";
  }

  public seleccionarCara(index: number) {
    this.selectedFaceIndex = index;
    // let caraActual = Object.keys(this.objectIDs).find(key => this.objectIDs[key] === index);
    // if (caraActual) {
    //     console.log(`Cara seleccionada: ${caraActual}, Textura: ${this.getTexturaPorCara(caraActual)}`);
    // }
  }

  getCaras() {
    return [
        { nombre: "Cube.001", vertices: [vec3.fromValues(-1, -1, 1), vec3.fromValues(-1, 1, 1), vec3.fromValues(1, 1, 1), vec3.fromValues(1, -1, 1)], textura: this.texturaPorCara["Cube.001"] },
        { nombre: "Cube.002", vertices: [vec3.fromValues(1, -1, -1), vec3.fromValues(1, 1, -1), vec3.fromValues(-1, 1, -1), vec3.fromValues(-1, -1, -1)], textura: this.texturaPorCara["Cube.002"] },
        { nombre: "Cube.003", vertices: [vec3.fromValues(-1, 1, -1), vec3.fromValues(-1, 1, 1), vec3.fromValues(1, 1, 1), vec3.fromValues(1, 1, -1)], textura: this.texturaPorCara["Cube.003"] },
        { nombre: "Cube.004", vertices: [vec3.fromValues(-1, -1, 1), vec3.fromValues(-1, -1, -1), vec3.fromValues(-1, 1, -1), vec3.fromValues(-1, 1, 1)], textura: this.texturaPorCara["Cube.004"] },
        { nombre: "Cube.005", vertices: [vec3.fromValues(-1, -1, -1), vec3.fromValues(1, -1, -1), vec3.fromValues(1, -1, 1), vec3.fromValues(-1, -1, 1)], textura: this.texturaPorCara["Cube.005"] },
        { nombre: "Cube.006", vertices: [vec3.fromValues(1, -1, -1), vec3.fromValues(1, -1, 1), vec3.fromValues(1, 1, 1), vec3.fromValues(1, 1, -1)], textura: this.texturaPorCara["Cube.006"] }
    ];
  }

  getCarasPlano() {
    return [
      {nombre: "Cube.001", min: vec3.fromValues(-7.25, 0, 0), max: vec3.fromValues(-2.42, 4.35, 0)},
      {nombre: "Cube.006", min: vec3.fromValues(-7.25, -4.35, 0), max: vec3.fromValues(-2.42, 0, 0)},
      {nombre: "Cube.002", min: vec3.fromValues(-2.42, 0, 0), max: vec3.fromValues(2.42, 4.35, 0)},
      {nombre: "Cube.005", min: vec3.fromValues(-2.42, -4.35, 0), max: vec3.fromValues(2.42, 0, 0)},
      {nombre: "Cube.003", min: vec3.fromValues(-2.42, 0, 0), max: vec3.fromValues(7.25, 4.35, 0)},
      {nombre: "Cube.004", min: vec3.fromValues(-2.42, -4.35, 0), max: vec3.fromValues(7.25, 0, 0)}
  ];
  }

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

        // Configuración de buffer de textura
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffers[i]);
        let texCoordLocation = gl.getAttribLocation(this.programId, 'vertTexCoord');
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(texCoordLocation);

        // Identificar la cara actual mediante su índice para buscar la textura correspondiente
        let caraActual = Object.keys(this.objectIDs).find(key => this.objectIDs[key] === i);
        if (caraActual && this.texturaPorCara[caraActual]) {
            let texturaInfo = this.texturas.find((t: any) => t.nombre === this.texturaPorCara[caraActual!]);
            if (texturaInfo && texturaInfo.texture) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texturaInfo.texture);
                gl.uniform1i(gl.getUniformLocation(this.programId, 'sampler'), 0);
                gl.uniform1i(gl.getUniformLocation(this.programId, 'applyTexture'), 1);
            } else {
                gl.uniform1i(gl.getUniformLocation(this.programId, 'applyTexture'), 0);
            }
        } else {
            gl.uniform1i(gl.getUniformLocation(this.programId, 'applyTexture'), 0);
        }

        // Seleccionar la cara si está seleccionada
        let isSelectedUniform = gl.getUniformLocation(this.programId, 'isSelected');
        gl.uniform1i(isSelectedUniform, this.selectedFaceIndex === i ? 1 : 0);

        // Configuración de la matriz de modelo-vista
        let modelViewMatrix = mat4.create();
        mat4.multiply(modelViewMatrix, this.TRecusoShader.getViewMatrix(), matrizTransf);
        gl.uniformMatrix4fv(gl.getUniformLocation(this.programId, 'u_ModelViewMatrix'), false, modelViewMatrix);

        // Configurar el color base
        let colorLocation = gl.getUniformLocation(this.programId, 'u_Color');
        gl.uniform4fv(colorLocation, this.baseColor);

        // Vinculación y dibujo usando el buffer de índices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffers[i]);
        gl.drawElements(gl.TRIANGLES, this.indexCounts[i], gl.UNSIGNED_SHORT, 0);
    }
}

}
