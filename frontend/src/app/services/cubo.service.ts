import { MotorGrafico } from '../graphics/motor/motorGrafico';
import { mat4, vec3, mat3 } from 'gl-matrix';
import { Injectable } from '@angular/core';
import { TNodo } from '../graphics';

var clickIzq = false;
var escalado = 1;
var old_x = 0;
var old_y = 0;
var theta = 0;
var phi = 0;
var dx = 0;
var dy = 0;

@Injectable({
    providedIn: 'root'
})

export class CuboService {
    private cubo!: TNodo;
    private camActiva: any;
    private motorGrafico: any;
    private width: number = 0;
    private height: number = 0;
    private modelos: TNodo[] = [];
    private canvas!: HTMLCanvasElement;
    private requestId: number | null = null;
    
    public async crearCubo(motor: MotorGrafico, escena: TNodo){
        this.motorGrafico = motor;
        this.canvas = this.motorGrafico.getCanvas();
        
        this.cubo = await this.motorGrafico.crearModelo(escena, 'untitled.gltf', [0, 0, 0], [0, 0, 0], [1, 1, 1]);
        
        console.log(escena);
        this.dibujado(escena);
    }

    private dibujado(escena: TNodo){
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId);
        }

        let render = () => {
            if(this.cubo !== null){
                this.cubo.setRotacion([phi, theta, 0]);
                this.cubo.setEscalado([escalado, escalado, escalado]);
            }
          
            this.motorGrafico.dibujarEscena(escena);

            this.requestId = requestAnimationFrame(render);
        }
        this.requestId = requestAnimationFrame(render);
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
    
    mouseMove(event: MouseEvent){
        event.preventDefault();
        let velocidadRotacion = 30;
        if(clickIzq){
            dx = (event.pageX - old_x) * 2 * Math.PI / this.width * velocidadRotacion;
            dy = (event.pageY - old_y) * 2 * Math.PI / this.height * velocidadRotacion;
            theta += dx;
            phi += dy;
            old_x = event.pageX;
            old_y = event.pageY;
        }
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

    rayPicking(event: MouseEvent) {
        let caras = [
            { vertices: [vec3.fromValues(-1, -1, 1), vec3.fromValues(-1, 1, 1), vec3.fromValues(1, 1, 1), vec3.fromValues(1, -1, 1)], nombre: "Delantera" },
            { vertices: [vec3.fromValues(1, -1, -1), vec3.fromValues(1, 1, -1), vec3.fromValues(-1, 1, -1), vec3.fromValues(-1, -1, -1)], nombre: "Trasera" },
            { vertices: [vec3.fromValues(-1, 1, -1), vec3.fromValues(-1, 1, 1), vec3.fromValues(1, 1, 1), vec3.fromValues(1, 1, -1)], nombre: "Superior" },
            { vertices: [vec3.fromValues(-1, -1, -1), vec3.fromValues(1, -1, -1), vec3.fromValues(1, -1, 1), vec3.fromValues(-1, -1, 1)], nombre: "Inferior" },
            { vertices: [vec3.fromValues(1, -1, -1), vec3.fromValues(1, -1, 1), vec3.fromValues(1, 1, 1), vec3.fromValues(1, 1, -1)], nombre: "Derecha" },
            { vertices: [vec3.fromValues(-1, -1, 1), vec3.fromValues(-1, -1, -1), vec3.fromValues(-1, 1, -1), vec3.fromValues(-1, 1, 1)], nombre: "Izquierda" }
        ];

        let rect = this.canvas.getBoundingClientRect();
        let x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        let y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
    
        let rayClip = vec3.fromValues(x, y, -1);
        let rayEye = vec3.transformMat4(vec3.create(), rayClip, mat4.invert(mat4.create(), this.camActiva.getEntidad().getProjMatrix()));
        rayEye[2] = -1;
        rayEye[3] = 0;
    
        let rayWorld = vec3.transformMat4(vec3.create(), rayEye, mat4.invert(mat4.create(), this.camActiva.getEntidad().getViewMatrix()));
        rayWorld = vec3.normalize(rayWorld, rayWorld);
    
        let cubo;
        let intersecciones = [];
        let caraSeleccionada = null;

        for (let modelo of this.modelos) {
            if (modelo.getEntidad().getNombre() === 'untitled.gltf') {
                cubo = modelo;
                break;
            }
        }
        
        let matrizTransfInversa = mat4.invert(mat4.create(), cubo!.getMatrizTransf());
        let localRayOrigin = vec3.transformMat4(vec3.create(), this.camActiva.getTraslacion(), matrizTransfInversa);
        let localRayDirection = vec3.transformMat3(vec3.create(), rayWorld, mat3.normalFromMat4(mat3.create(), matrizTransfInversa));
        
        for (let cara of caras) {
          let v0 = cara.vertices[0];
          let v1 = cara.vertices[1];
          let v2 = cara.vertices[2];
          let v3 = cara.vertices[3];
    
          let t1 = this.intersectRayTriangle(localRayOrigin, localRayDirection, v0, v1, v2);
          let t2 = this.intersectRayTriangle(localRayOrigin, localRayDirection, v0, v2, v3);
    
          if (t1 !== null || t2 !== null) {
              intersecciones.push({ cara: cara.nombre, t: Math.min(t1 ?? Infinity, t2 ?? Infinity) });
          }
        }
    
        if (intersecciones.length === 0) {
            console.log("Click fuera del cubo");
            return;
        }
    
        intersecciones.sort((a, b) => a.t - b.t);
        caraSeleccionada = intersecciones[0].cara;
        
        console.log("Cara seleccionada: " + caraSeleccionada);
    }
    
    intersectRayTriangle(rayOrigin: vec3, rayDirection: vec3, v0: vec3, v1: vec3, v2: vec3): number | null {
       return null
    }

    public detenerDibujado() {
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }
}