import { mat4 } from 'gl-matrix';
import { TEntidad } from './entidad';

export class TCamara extends TEntidad {
    private esPerspectiva: boolean;
    private cercano: number;
    private lejano: number;

    constructor() {
        super(); // Llama al constructor de la clase base TEntidad
        // Por defecto: cámara perspectiva
        this.esPerspectiva = true;
        this.cercano = 0.1; 
        this.lejano = 1000.0;
    }

    setPerspectiva(cercano: number, lejano: number): void {
        this.esPerspectiva = true;
        this.cercano = cercano;
        this.lejano = lejano;
    }

    setParalela(cercano: number, lejano: number): void {
        this.esPerspectiva = false;
        this.cercano = cercano;
        this.lejano = lejano;
    }

    dibujar(matriz: mat4): void {
        console.log(`Configurando cámara ${this.esPerspectiva ? 'perspectiva' : 'paralela'} con planos ${this.cercano} - ${this.lejano}`);
        // Implementación específica del dibujo o configuración de la cámara
    }
}