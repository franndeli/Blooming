import { MotorGrafico } from '../graphics/motor/motorGrafico';
import { mat4, vec3, mat3 } from 'gl-matrix';
import { Injectable } from '@angular/core';
import { TNodo } from '../graphics';

var clickIzq = false;
var old_x = 0;
var old_y = 0;
var trasX = 0;
var trasY = 0;
var dx = 0;
var dy = 0;

@Injectable({
    providedIn: 'root'
})

export class PlanoService {
    private plano!: TNodo;
    private avatar!: TNodo;
    private motorGrafico: any;
    private width: number = 0;
    private height: number = 0;
    private modelos: TNodo[] = [];
    private canvas!: HTMLCanvasElement;
    private requestId: number | null = null;

    public async crearPlano(motor: MotorGrafico, escena: TNodo, texturas: any){
        this.motorGrafico = motor;
        this.canvas = this.motorGrafico.getCanvas();

        this.motorGrafico.getCamaraActiva().setTraslacion([0, 5, 11]);
        this.motorGrafico.getCamaraActiva().setRotacion([-20, 0, 0]);

        console.log(escena);

        this.plano = await this.motorGrafico.crearModelo(escena, 'plano_final.gltf', [0, 0, 0], [0, 0, 0], [1.2, 1.2, 1.2], texturas);
        this.avatar = await this.motorGrafico.crearModelo(escena, 'avatar.gltf', [0, 2.25, 0], [0, 0, 0], [0.5, 0.5, 0.5], texturas);

        console.log(escena);
        this.dibujado(escena);
    }

    private dibujado(escena: TNodo){
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId);
        }

        let render = () => {
            if(this.avatar !== null){
                this.avatar.setTraslacion([trasX, 2.25, trasY]);
            }
            this.motorGrafico.dibujarEscena(escena);
            this.requestId = requestAnimationFrame(render);
        }
        this.requestId = requestAnimationFrame(render);
    }

    public detenerDibujado() {
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }

    mouseDown(event: MouseEvent){
        event.preventDefault();
        if(event.button == 0){
            clickIzq = true;
            old_x = event.pageX;
            old_y = event.pageY;
        }
    }
    
    mouseUp(event: MouseEvent){
        event.preventDefault();
        if(event.button == 0){
            clickIzq = false;
        }
    }

    mouseMove(event: MouseEvent, width: number, height: number){
        event.preventDefault();
        console.log('mouseMove')
        let velocidadMovimiento = 5;
        if(clickIzq){
            dx = (event.pageX - old_x) * 5 / width * velocidadMovimiento;
            dy = (event.pageY - old_y) * 5 / height * velocidadMovimiento;
            trasX += dx;
            trasY += dy;
            old_x = event.pageX;
            old_y = event.pageY;
            console.log(trasX, trasY)
        }
    }


    raycast(){
        console.log('raycast')
        let max = [2.0007832050323486, 0.05491405725479126, 3.999821424484253];
        let min = [-2.0007832050323486, -0.05491405725479126, -3.999821424484253];

        let vertices = [
            vec3.fromValues(min[0], min[1], min[2]), // vértice inferior izquierdo
            vec3.fromValues(max[0], min[1], min[2]), // vértice inferior derecho
            vec3.fromValues(min[0], min[1], max[2]), // vértice superior izquierdo
            vec3.fromValues(max[0], min[1], max[2])  // vértice superior derecho
        ]

        let rayOrigin = this.avatar.getTraslacion();
        let rayDirection = vec3.fromValues(0, -1, 0);
    
        let v0 = vertices[0];
        let v1 = vertices[1];
        let v2 = vertices[2];
        let v3 = vertices[3];
    
        if (this.intersectRayTriangle2(rayOrigin, rayDirection, v0, v1, v2) || this.intersectRayTriangle2(rayOrigin, rayDirection, v0, v2, v3)) {
            console.log('sobre el plano')
            return true;
        }else{
            console.log('fuera del plano')
        }
        

        return false;
    }

    intersectRayTriangle2(rayOrigin: vec3, rayDirection: vec3, v0: vec3, v1: vec3, v2: vec3): boolean | null {
        let edge1 = vec3.subtract(vec3.create(), v1, v0);
        let edge2 = vec3.subtract(vec3.create(), v2, v0);

        let pvec = vec3.cross(vec3.create(), rayDirection, edge2);
        let det = vec3.dot(edge1, pvec);

        if (Math.abs(det) < 1e-8) {
            return false;
        }

        let invDet = 1 / det;

        let tvec = vec3.subtract(vec3.create(), rayOrigin, v0);
        let u = vec3.dot(tvec, pvec) * invDet;

        if (u < 0 || u > 1) {
            return false;
        }

        let qvec = vec3.cross(vec3.create(), tvec, edge1);
        let v = vec3.dot(rayDirection, qvec) * invDet;
        
        if (v < 0 || u + v > 1) {
            return false;
        }

        let t = vec3.dot(edge2, qvec) * invDet;

        return t > 1e-8;
    }

}