// Importamos `mat4` de `gl-matrix` para poder tipar el parámetro de `dibujar`.
import { mat4 } from 'gl-matrix';

export abstract class TEntidad {
    constructor() {
        // Constructor vacío
    }

    // Esto obliga a las subclases a implementar este método.
    abstract dibujar(gl: WebGLRenderingContext, shaderProgram: WebGLProgram, matrizTransformacion: mat4): void;
}
