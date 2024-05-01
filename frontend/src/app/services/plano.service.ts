import { MotorGrafico } from '../graphics/motor/motorGrafico';
import { mat4, vec3, mat3 } from 'gl-matrix';
import { Injectable } from '@angular/core';
import { TNodo } from '../graphics';

var escalado = 1;

@Injectable({
    providedIn: 'root'
})

export class PlanoService {
    private plano!: TNodo;
    private avatar!: TNodo;
    private camActiva: any;
    private motorGrafico: any;
    private width: number = 0;
    private height: number = 0;
    private modelos: TNodo[] = [];
    private canvas!: HTMLCanvasElement;
    private requestId: number | null = null;

    public async crearPlano(motor: MotorGrafico, escena: TNodo){
        this.motorGrafico = motor;
        this.canvas = this.motorGrafico.getCanvas();

        this.plano = await this.motorGrafico.crearModelo(escena, 'plano.gltf', [0, 0, 0], [0, 0, 0], [1, 1, 1]);
        
        console.log(escena);
        this.dibujado(escena);
    }

    private dibujado(escena: TNodo){
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId);
        }

        let render = () => {
            if(this.plano !== null){
                this.plano.setEscalado([escalado, escalado, escalado]);
            }
            this.motorGrafico.dibujarEscena(escena);
            this.requestId = requestAnimationFrame(render);
        }
        this.requestId = requestAnimationFrame(render);
    }

    zoom(event: WheelEvent){
        event.preventDefault();
        if(event.deltaY < 0){
          escalado += 0.25;
        } else {
          escalado -= 0.25;
        }
        escalado = Math.min(Math.max(0.25, escalado), 4);
    }

    public detenerDibujado() {
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }

}