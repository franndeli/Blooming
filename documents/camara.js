import { TEntidad } from './entidad';

class TCamara extends TEntidad {
    constructor() {
        super();
        // Por defecto: cámara perspectiva
        this.esPerspectiva = true;
        this.cercano = 0.1; 
        this.lejano = 1000.0;
    }

    setPerspectiva(cercano, lejano) {
        this.esPerspectiva = true;
        this.cercano = cercano;
        this.lejano = lejano;
    }

    setParalela(cercano, lejano) {
        this.esPerspectiva = false;
        this.cercano = cercano;
        this.lejano = lejano;
    }

    dibujar(matriz) {
        console.log(`Configurando cámara ${this.esPerspectiva ? 'perspectiva' : 'paralela'} con planos ${this.cercano} - ${this.lejano}`);
    }
}
