import { MotorGrafico } from '../graphics/motor/motorGrafico';
import { mat4, vec3, mat3 } from 'gl-matrix';
import { Injectable } from '@angular/core';
import { TNodo, TRecursoMalla } from '../graphics';

var dx = 0;
var dy = 0;
var old_x = 0;
var old_y = 0;
var trasX = 0;
var trasY = 0;
var clickIzq = false;

@Injectable({
    providedIn: 'root'
})

export class PlanoService {
    private avatar!: TNodo;
    private motorGrafico: any;
    private requestId: number | null = null;
    private plano!: TNodo;

    public async crearPlano(motor: MotorGrafico, escena: TNodo, texturas: any){
        this.motorGrafico = motor;

        this.motorGrafico.crearCamara(escena, [0, 10, 0], [-90, 0, 0], [1, 1, 1]);

        this.plano = await this.motorGrafico.crearModelo(escena, 'plano_prueba.gltf', [0, 0, 0], [0, 0, 0], [1.2, 1.2, 1.2], texturas);
        
        this.avatar = await this.motorGrafico.crearModelo(escena, 'avatar.gltf', [0, 2.25, 0], [0, 0, 0], [0.5, 0.5, 0.5], texturas);

        trasX = 0;
        trasY = 0;

        //console.log('Escena del PLANO',escena);
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
        let velocidadMovimiento = 5;
        if(clickIzq){
            dx = (event.pageX - old_x) * 5 / width * velocidadMovimiento;
            dy = (event.pageY - old_y) * 5 / height * velocidadMovimiento;
            trasX += dx;
            trasY += dy;
            old_x = event.pageX;
            old_y = event.pageY;
        }
    }

    raycast(){
        // //Parte arriba izquierda
        // let maxAI = [-2.474585339753885, 0.05491405725479126, 2.384185791015625e-07];
        // let minAI = [-7.423756019261654, 0.05491405725479126, -4.771241830065353];
        // //Parte arriba medio
        // let maxAM = [2.474585339753885,  0.05491405725479126, 2.384185791015625e-07]; 
        // let minAM = [-2.474585339753885, 0.05491405725479126, -4.771241830065353];
        // //Parte arriba derecha
        // let maxAD = [7.423756019261654, 0.05491405725479126, 2.384185791015625e-07];
        // let minAD = [2.474585339753885, 0.05491405725479126, -4.771241830065353];
        // //Parte bajo izquierda
        // let maxBI = [-2.474585339753885, 0.05491405725479126, 4.771241830065353];
        // let minBI = [-7.423756019261654, 0.05491405725479126, -2.384185791015625e-07];
        // //Parte bajo medio
        // let maxBM = [2.474585339753885, 0.05491405725479126, 4.771241830065353];
        // let minBM = [-2.474585339753885, 0.05491405725479126, 2.384185791015625e-07];
        // //Parte bajo derecha
        // let maxBD = [7.423756019261654, 0.05491405725479126, 4.771241830065353];
        // let minBD = [2.474585339753885, 0.05491405725479126, 2.384185791015625e-07];
        
        // let partes = [
        //     {nombre: 'Cube.001', max: maxAI, min: minAI},
        //     {nombre: 'Cube.002', max: maxAM, min: minAM},
        //     {nombre: 'Cube.003', max: maxAD, min: minAD},
        //     {nombre: 'Cube.006', max: maxBI, min: minBI},
        //     {nombre: 'Cube.005', max: maxBM, min: minBM},
        //     {nombre: 'Cube.004', max: maxBD, min: minBD}
        // ];

        let rayOrigin = this.avatar.getTraslacion();
        let rayDirection = vec3.fromValues(0, -1, 0);

        const planoTexturasMalla = this.plano!.getEntidad() as TRecursoMalla;

        for(let parte of planoTexturasMalla.getCarasPlano()){
            let vertices = [
                vec3.fromValues(parte.min[0], parte.max[1], parte.min[2]),
                vec3.fromValues(parte.max[0], parte.max[1], parte.min[2]),
                vec3.fromValues(parte.max[0], parte.max[1], parte.max[2]),
                vec3.fromValues(parte.min[0], parte.max[1], parte.max[2])
            ];

            if (this.intersectRayTriangle2(rayOrigin, rayDirection, vertices[0], vertices[1], vertices[2]) || this.intersectRayTriangle2(rayOrigin, rayDirection, vertices[0], vertices[2], vertices[3])) {
                // console.log(parte);
                planoTexturasMalla.seleccionarCara(planoTexturasMalla.objectIDs[parte.nombre]);
                this.motorGrafico.setCaraSeleccionada(parte.nombre, planoTexturasMalla.getTexturaPorCara(parte.nombre));
                return true;
            }else{
                
            }
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