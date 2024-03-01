import { mat4 } from 'gl-matrix';
import { TEntidad } from './entidad';

export class TMalla extends TEntidad {
    private malla: any; // Considera definir un tipo más específico para 'malla'

    constructor(malla: any) {
        super(); // Llama al constructor de la clase base TEntidad
        this.malla = malla;
    }

    dibujar(matriz: mat4): void {
        console.log('Dibujando TMalla');
        // Implementación del método de dibujo usando 'matriz' y 'this.malla'
    }
}
