import { mat4 } from 'gl-matrix';
import { TEntidad } from './entidad';

class TMalla extends TEntidad {
    constructor(malla) {
        super();
        this.malla = malla;
    }

    dibujar(matriz) {
        console.log('Dibujando TMalla');
    }
}
