import { MotorGrafico } from '../graphics/motor/motorGrafico';
import { mat4, vec3, mat3, vec4, glMatrix } from 'gl-matrix';
import { Injectable } from '@angular/core';
import { TNodo, TRecursoMalla } from '../graphics';
import { on } from 'node:events';

var dx = 0;
var dy = 0;
var old_x = 0;
var old_y = 0;
var trasX = 0;
var trasY = 0;
var clickIzq = false;
var onAvatar = false;

@Injectable({
    providedIn: 'root'
})

export class PlanoService {
    private plano!: TNodo;
    private avatar!: TNodo;
    private motorGrafico: any;
    private camara!: TNodo;
    private requestId: number | null = null;
    private luz!: TNodo;

    public async crearPlano(motor: MotorGrafico, escena: TNodo, texturas: any){
        this.motorGrafico = motor;

        this.camara = this.motorGrafico.crearCamara(escena, [0, 0, 15], [0, 0, 0], [1, 1, 1]);
        
        this.luz = this.motorGrafico.crearLuz(escena, [0, 10, 0], [0, 0, 0], [1, 1, 1]);
        
        this.plano = await this.motorGrafico.crearModelo(escena, 'plano_final_prueba_2.gltf', [0, 1, 0], [45, 0, 0], [1.2, 1.2, 1.2], texturas);
        this.avatar = await this.motorGrafico.crearModelo(escena, 'pieza_tablero.gltf', [0, 0, 0], [0, 0, 0], [0.8, 0.8, 0.8], texturas);

        trasX = 8.5;
        trasY = 2;

        //console.log('Escena del PLANO',escena);
        this.dibujado(escena);
    }

    private dibujado(escena: TNodo){
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId);
        }

        let render = () => {
            if(this.avatar !== null){
                this.avatar.setTraslacion([trasX, trasY, 2]);
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

    mouseDown(event: MouseEvent, canvas: HTMLCanvasElement){
        event.preventDefault();
        if(event.button == 0){
            clickIzq = true;
            this.rayPicking(event, canvas);
            old_x = event.pageX;
            old_y = event.pageY;
        }
    }
    
    mouseUp(event: MouseEvent){
        event.preventDefault();
        if(event.button == 0){
            clickIzq = false;
            onAvatar = false;
        }
    }

    mouseMove(event: MouseEvent, width: number, height: number){
        event.preventDefault();
        let velocidadMovimientoX = 4.0;
        let velocidadMovimientoY = 3.5;
        if(clickIzq && onAvatar){
            dx = (event.pageX - old_x) * 5 / width * velocidadMovimientoX;
            dy = (event.pageY - old_y) * 5 / height * velocidadMovimientoY;
            trasX += dx;
            trasY += -dy;
            old_x = event.pageX;
            old_y = event.pageY;

            this.rayCasting();
        }
    }

    rayCasting() {
        let rayOrigin = this.avatar.getTraslacion();
        let rayDirection = vec3.fromValues(0, 0, -1);

        // let divisiones = [
        //     {name: "Arriba Izquierda", min: vec3.fromValues(-7.25, 0, 0), max: vec3.fromValues(-2.42, 4.35, 0)},
        //     {name: "Bajo Izquierda", min: vec3.fromValues(-7.25, -4.35, 0), max: vec3.fromValues(-2.42, 0, 0)},
        //     {name: "Arriba Medio", min: vec3.fromValues(-2.42, 0, 0), max: vec3.fromValues(2.42, 4.35, 0)},
        //     {name: "Bajo Medio", min: vec3.fromValues(-2.42, -4.35, 0), max: vec3.fromValues(2.42, 0, 0)},
        //     {name: "Arriba Derecha", min: vec3.fromValues(-2.42, 0, 0), max: vec3.fromValues(7.25, 4.35, 0)},
        //     {name: "Bajo Derecha", min: vec3.fromValues(-2.42, -4.35, 0), max: vec3.fromValues(7.25, 0, 0)}
        // ];  

        const planoTexturasMalla = this.plano!.getEntidad() as TRecursoMalla;
        const divisiones = planoTexturasMalla.getCarasPlano();

        for (let i = 0; i < divisiones.length; i++) {
            let part = divisiones[i];
            let intersection = this.rayIntersectsAABB(rayOrigin, rayDirection, part.min, part.max);
            if (intersection) {
                planoTexturasMalla.seleccionarCara(planoTexturasMalla.objectIDs[part.nombre]);
                this.motorGrafico.setCaraSeleccionada(part.nombre, planoTexturasMalla.getTexturaPorCara(part.nombre));
                return true;
            }
        }
        // console.log("Fuera Plano");
        return false;
    }

    rayIntersectsAABB(rayOrigin: vec3, rayDirection: vec3, aabbMin: vec3, aabbMax: vec3) {
        aabbMin[1] += 2.0;
        aabbMax[1] += 2.0;

        let tMin = (aabbMin[0] - rayOrigin[0]) / rayDirection[0];
        let tMax = (aabbMax[0] - rayOrigin[0]) / rayDirection[0];

        if (tMin > tMax) [tMin, tMax] = [tMax, tMin];

        let yMin = (aabbMin[1] - rayOrigin[1]) / rayDirection[1];
        let yMax = (aabbMax[1] - rayOrigin[1]) / rayDirection[1];

        if (yMin > yMax) [yMin, yMax] = [yMax, yMin];

        if ((tMin > yMax) || (yMin > tMax)) return false;

        if (yMin > tMin) tMin = yMin;
        if (yMax < tMax) tMax = yMax;

        let zMin = (aabbMin[2] - rayOrigin[2]) / rayDirection[2];
        let zMax = (aabbMax[2] - rayOrigin[2]) / rayDirection[2];

        if (zMin > zMax) [zMin, zMax] = [zMax, zMin];

        if ((tMin > zMax) || (zMin > tMax)) return false;

        return true;
    }


    rayPicking(event: MouseEvent, canvas: HTMLCanvasElement) {
        let rect = canvas.getBoundingClientRect();
        let x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        let y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

        let rayClip = vec3.fromValues(x, y, -1);
        let rayEye = vec3.transformMat4(vec3.create(), rayClip, mat4.invert(mat4.create(), this.camara.getEntidad().getProjMatrix()));
        rayEye[2] = -1;
        rayEye[3] = 0;

        let rayWorld = vec3.transformMat4(vec3.create(), rayEye, mat4.invert(mat4.create(), this.camara.getEntidad().getViewMatrix()));
        rayWorld = vec3.normalize(rayWorld, rayWorld);
        
        let matrizTransfInversa = mat4.invert(mat4.create(), this.avatar.getMatrizTransf());
        let localRayOrigin = vec3.transformMat4(vec3.create(), this.camara.getTraslacion(), matrizTransfInversa);
        let localRayDirection = vec3.transformMat3(vec3.create(), rayWorld, mat3.normalFromMat4(mat3.create(), matrizTransfInversa));
        
        let min = vec3.fromValues(-1, -1, -1);
        let max = vec3.fromValues(1, 1, 1);

        if (this.intersectRayBox(localRayOrigin, localRayDirection, min, max)) {
            onAvatar = true;
        } else {
            onAvatar = false;
        }
    }

    intersectRayBox(origin: vec3, direction: vec3, min: vec3, max: vec3): boolean {
        let tmin = (min[0] - origin[0]) / direction[0];
        let tmax = (max[0] - origin[0]) / direction[0];

        if (tmin > tmax) [tmin, tmax] = [tmax, tmin];

        let tymin = (min[1] - origin[1]) / direction[1];
        let tymax = (max[1] - origin[1]) / direction[1];

        if (tymin > tymax) [tymin, tymax] = [tymax, tymin];

        if ((tmin > tymax) || (tymin > tmax))
            return false;

        if (tymin > tmin)
            tmin = tymin;

        if (tymax < tmax)
            tmax = tymax;

        let tzmin = (min[2] - origin[2]) / direction[2];
        let tzmax = (max[2] - origin[2]) / direction[2];

        if (tzmin > tzmax) [tzmin, tzmax] = [tzmax, tzmin];

        if ((tmin > tzmax) || (tzmin > tmax))
            return false;

        return true;
    }
}