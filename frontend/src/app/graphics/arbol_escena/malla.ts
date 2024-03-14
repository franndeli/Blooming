import { mat4 } from 'gl-matrix';
import { TEntidad } from './entidad';

export class TMalla extends TEntidad {
    private vertices: Float32Array;
    private normales: Float32Array;
    private coordTex: Float32Array;
    private indices: Uint16Array | Uint32Array; 

    constructor(vertices?: number[], normales?: number[], coordTexturas?: number[], indices?: number[]) {
        super(); // Llama al constructor de la clase base TEntidad
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
        if (!gl || !shaderProgram) {
            console.error("WebGL context or shader program no está definido.");
            return;
        }
        
        // Crear y asociar los datos de vértices al buffer
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(shaderProgram, 'vertPosition');

        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocation);

        // Crear y asociar los índices de la malla al buffer de elementos
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        // Dibujar la malla
        gl.useProgram(shaderProgram);
        
        if(gl.getError() !== gl.NO_ERROR){
            console.error("WebGL error: " + gl.getError());
        }
        
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }
}
