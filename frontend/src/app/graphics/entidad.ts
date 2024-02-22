// Importamos `mat4` de `gl-matrix` para poder tipar el parámetro de `dibujar`.
import { mat4 } from 'gl-matrix';

export abstract class TEntidad {
    constructor() {
        // Constructor vacío
    }

    // Declaramos el método `dibujar` como abstracto y lo tipamos adecuadamente.
    // Esto obliga a las subclases a implementar este método.
    abstract dibujar(matriz: mat4): void;
}
