import { mat4 } from 'gl-matrix';
import { TEntidad } from './entidad';

export class TMalla extends TEntidad {
    private vertices: Float32Array;
    private normales: Float32Array;
    private coordTex: Float32Array;
    private indices: Uint16Array | Uint32Array; 
    private gl?: WebGLRenderingContext;
    private shaderProgram?: WebGLProgram;

    constructor(gl?: WebGLRenderingContext, shaderProgram?: WebGLProgram, vertices?: number[], normales?: number[], coordTexturas?: number[], indices?: number[]) {
        super(); // Llama al constructor de la clase base TEntidad
        this.gl = gl;
        this.shaderProgram = shaderProgram;
        this.vertices = new Float32Array(vertices || []);
        this.normales = new Float32Array(normales || []);
        this.coordTex = new Float32Array(coordTexturas || []);
        this.indices = new Uint16Array(indices || []);
    }

    actualizarVertices(nuevosVertices: number[]) {
        this.vertices = new Float32Array(nuevosVertices);
    }

    actualizarNormales(nuevasNormales: number[]) {
        this.vertices = new Float32Array(nuevasNormales);
    }

    actualizarCoordTex(nuevasCoordTex: number[]) {
        this.vertices = new Float32Array(nuevasCoordTex);
    }
    actualizarIndices(nuevosIndices: number[]) {
        this.vertices = new Float32Array(nuevosIndices);
    }

    dibujar(gl: WebGLRenderingContext, shaderProgram: WebGLProgram): void {
        // Asegurar que gl y shaderProgram están definidos
        if (!this.gl || !this.shaderProgram) {
            console.error("WebGL context or shader program no está definido.");
            return;
        }
    
        // Localizar los attributes en los shaders
        const vertexPosition = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
        const vertexNormal = this.gl.getAttribLocation(this.shaderProgram, 'aVertexNormal');
        const textureCoord = this.gl.getAttribLocation(this.shaderProgram, 'aTextureCoord');
    
        // Crear y asociar los datos de vértices al buffer
        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(vertexPosition);
    
        // Normales
        if (vertexNormal !== -1) { // Solo si el shader utiliza normales
            const normalBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.normales), this.gl.STATIC_DRAW);
            this.gl.vertexAttribPointer(vertexNormal, 3, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(vertexNormal);
        }
    
        // Coordenadas de textura
        if (textureCoord !== -1) { // Solo si el shader utiliza coordenadas de textura
            const textureCoordBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textureCoordBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.coordTex), this.gl.STATIC_DRAW);
            this.gl.vertexAttribPointer(textureCoord, 2, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(textureCoord);
        }
    
        // Crear y asociar los índices de la malla al buffer de elementos
        const indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new (this.indices.length > 65535 ? Uint32Array : Uint16Array)(this.indices), this.gl.STATIC_DRAW);
    
        // Dibujar la malla
        const vertexCount = this.indices.length;
        this.gl.drawElements(this.gl.TRIANGLES, vertexCount, this.indices.length > 65535 ? this.gl.UNSIGNED_INT : this.gl.UNSIGNED_SHORT, 0);
    }
    
}
