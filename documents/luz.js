import { vec3 } from 'gl-matrix';
import { TEntidad } from './entidad';

class TLuz extends TEntidad {
    constructor(intensidad = vec3.fromValues(1, 1, 1)) { // Por defecto: luz blanca
        super();
        this.intensidad = intensidad;
    }

    setIntensidad(intensidad) {
        this.intensidad = intensidad;
    }

    getIntensidad() {
        return this.intensidad;
    }

    dibujar(matriz) {
        console.log('Aplicando luz con intensidad', this.intensidad);
    }
}
