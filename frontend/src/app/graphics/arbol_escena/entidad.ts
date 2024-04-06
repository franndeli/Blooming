import { mat4 } from 'gl-matrix';

export class TEntidad {
    private nombre: string;

    constructor() {
        this.nombre = '';
    }

    dibujar(matrizTransf: mat4): void{};

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    getNombre(): string {
        return this.nombre;
    }
}
