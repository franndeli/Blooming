import { mat4, vec3 } from 'gl-matrix';
import { TEntidad } from './entidad';

export class TLuz extends TEntidad {
    private intensidad: vec3;

    constructor(intensidad: vec3 = vec3.fromValues(1, 1, 1)) { // Por defecto: luz blanca
        super(); // Llama al constructor de la clase base TEntidad
        this.intensidad = intensidad;
    }

    setIntensidad(intensidad: vec3): void {
        this.intensidad = intensidad;
    }

    getIntensidad(): vec3 {
        return this.intensidad;
    }

    dibujar(matriz: mat4): void {
        console.log('Aplicando luz con intensidad', this.intensidad);
        // Aquí podrías incluir la lógica para aplicar la luz usando la 'matriz'
        // pero esto dependerá de la implementación específica de tu motor gráfico.
    }
}
