import { mat4, vec3 } from 'gl-matrix';
import { ElementRef } from '@angular/core';
import { GestorRecursos, TRecursoMalla } from '../../graphics';
import vertexShaderText from '../../graphics/shaders/vertexShader';
import fragmentShaderText from '../../graphics/shaders/fragmentShader';

export class MotorGrafico {
    private gestorRecursos = new GestorRecursos();

    async iniciarEscena(canvasRef: ElementRef<HTMLCanvasElement>): Promise<void> {
        if (canvasRef && canvasRef.nativeElement) {
            const canvas = canvasRef.nativeElement;
            const gl = canvas.getContext('webgl');
        
            if (!gl) {
              console.error('No se puede inicializar WebGL. Tu navegador o máquina puede no soportarlo.');
              return;
            }
      
            gl.clearColor(0.0, 2.0, 4.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
      
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            // Códigos de shaders (vertex y fragment) aquí o cargados de alguna manera
      
            if(vertexShader){
              gl.shaderSource(vertexShader, vertexShaderText);
            }
      
            if(fragmentShader){
              gl.shaderSource(fragmentShader, fragmentShaderText);
            }
      
            /* Compila y enlaza el programa de shader
            const shaderProgram = this.createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);*/
      
            if(vertexShader){
              gl.compileShader(vertexShader);
              if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
                return;
              }
            }
      
            if(fragmentShader){
              gl.compileShader(fragmentShader);
              if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
                return;
              }
            }
      
            const program = gl.createProgram();
            if(program && vertexShader){
              gl.attachShader(program, vertexShader);
            }
      
            if(program && fragmentShader){
              gl.attachShader(program, fragmentShader);
            }
      
            if(program){
              gl.linkProgram(program);
              if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('ERROR linking program!', gl.getProgramInfoLog(program));
                return;
              }
              gl.validateProgram(program);
              if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                console.error('ERROR validating program!', gl.getProgramInfoLog(program));
                return;
              }
            }
            
            // Carga los recursos necesarios para la malla
            await this.gestorRecursos.cargarRecurso('mallaEjemplo', 'malla', '../../../../assets/json/malla.json');
            
            // Asigna el recurso malla a la variable
            const recursoMalla = this.gestorRecursos.getRecurso('mallaEjemplo', 'malla') as TRecursoMalla;
            
            console.log(recursoMalla);
            if (recursoMalla) {
              // Llama al método dibujar de recursoMalla
              if(program){
                console.log(program);
                console.log(gl);
                recursoMalla.dibujar(gl, program);
              }
            }
          } else {
            console.error('El elemento canvas no está disponible.');
          }
    }
}