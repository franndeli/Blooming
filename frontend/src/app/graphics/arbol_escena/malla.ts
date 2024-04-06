import { mat4 } from 'gl-matrix';
import { TEntidad } from './entidad';
import { TRecursoMalla } from '../gestor_recursos/TRecursoMalla';

export class TMalla extends TEntidad {
    public TRecursoMalla: TRecursoMalla | null;
    private cargada: boolean;

    constructor() {
        super();
        this.TRecursoMalla = null;
        this.cargada = false;
    }

    override dibujar(matrizTransf: mat4): void {
        this.TRecursoMalla?.dibujar(matrizTransf);
    }
}
