import { mat4 } from 'gl-matrix';
import { TEntidad } from './entidad';

export class TCamara extends TEntidad {
    private esPerspectiva: boolean;
    private cercano: number;
    private lejano: number;

    constructor(cercano: number, lejano: number) {
        super();
        this.esPerspectiva = true;
        this.cercano = cercano; 
        this.lejano = lejano;
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

    dibujar(gl: WebGLRenderingContext, shaderProgram: WebGLProgram): void {
        console.log(`Configurando cámara ${this.esPerspectiva ? 'perspectiva' : 'paralela'} con planos ${this.cercano} - ${this.lejano}`);
        // Implementación específica del dibujo o configuración de la cámara
    }
}
