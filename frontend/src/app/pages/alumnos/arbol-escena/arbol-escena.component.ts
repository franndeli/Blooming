import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TNodo, TCamara, TLuz, TMalla, GestorRecursos, TRecursoMalla } from '../../../graphics';
import { vec3, mat4 } from 'gl-matrix';

import vertexShaderText from '../../../graphics/shaders/vertexShader';
import fragmentShaderText from '../../../graphics/shaders/fragmentShader';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;
  private gestorRecursos = new GestorRecursos();

  constructor() { }

  async ngAfterViewInit() {
    this.iniciarEscena();
  }

  /*private compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) { // Verifica si shader es null
      throw new Error('Error creating shader.');
    }
  
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw new Error('Shader compilation failed');
    }
  
    return shader;
  }*/
  

  // Método auxiliar para crear y enlazar un programa de shader
  /*private createShaderProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram {
    const vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) { // Verifica si shaderProgram es null
        throw new Error('Unable to create shader program.');
    }

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Shader program linking failed:', gl.getProgramInfoLog(shaderProgram));
        gl.deleteProgram(shaderProgram); // Asegúrate de eliminar el programa si el enlace falla
        throw new Error('Shader program linking failed');
    }

    return shaderProgram;
  }*/

  /*async  iniciarEscena(): Promise<void> {
    if (this.canvasRef && this.canvasRef.nativeElement) {
      const canvas = this.canvasRef.nativeElement;
      const gl = canvas.getContext('webgl');
  
      if (!gl) {
        console.error('No se puede inicializar WebGL. Tu navegador o máquina puede no soportarlo.');
        return;
      }
    
      // Configuración inicial de WebGL
      gl.clearColor(0.0, 0.0, 0.0, 1.0); // Fondo negro, opaco
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Crear el nodo raíz del árbol de la escena
      const raiz = new TNodo();

      // Crear una cámara y añadirla a la escena
      const camara = new TCamara();
      const nodoCamara = new TNodo(camara);
      raiz.addHijo(nodoCamara);
      this.actualizarInformacion("Se ha añadido una cámara, longitud actual del array de hijos: " + raiz.hijos.length);

      // Crear una luz y añadirla a la escena
      const luz = new TLuz(vec3.fromValues(1, 1, 1)); // Luz blanca
      const nodoLuz = new TNodo(luz);
      raiz.addHijo(nodoLuz);
      this.actualizarInformacion("Se ha añadido una luz, longitud actual del array de hijos: " + raiz.hijos.length);

      // Crear una malla y añadirla a la escena
      const malla = new TMalla(); // Supongamos que este es el identificador de la malla
      const nodoMalla = new TNodo(malla);
      raiz.addHijo(nodoMalla);
      this.actualizarInformacion("Se ha añadido una malla, longitud actual del array de hijos: " + raiz.hijos.length);

      // Añadir un nodo hijo a nodoMalla y verificar recorrido
      const hijoDeMalla = new TMalla();
      const nodoHijoDeMalla = new TNodo(hijoDeMalla);
      nodoMalla.addHijo(nodoHijoDeMalla);
      this.actualizarInformacion("Se ha añadido un hijo malla, longitud actual del array de hijos de malla: " + nodoMalla.hijos.length);

      this.actualizarInformacion("No se ha añadido ningún hijo a cámara, longitud actual del array de hijos de cámara: " + nodoCamara.hijos.length);
      // Aplicar transformaciones a la cámara
      nodoCamara.setTraslacion(vec3.fromValues(0, 0, 5));
      nodoCamara.setRotacion(vec3.fromValues(0, 0, 0));
      nodoCamara.setEscalado(vec3.fromValues(1, 1, 1));

      // Aplicar transformaciones a la luz
      nodoLuz.setTraslacion(vec3.fromValues(2, 2, 0));
      nodoLuz.setRotacion(vec3.fromValues(0, 0, 0));
      nodoLuz.setEscalado(vec3.fromValues(1, 1, 1));

      // Aplicar transformaciones a la malla
      nodoMalla.setTraslacion(vec3.fromValues(-2, 0, 0));
      nodoMalla.setRotacion(vec3.fromValues(0, 0, 0));
      nodoMalla.setEscalado(vec3.fromValues(1, 1, 1));

      // Imprimir información después de las transformaciones iniciales
      this.imprimirMatrizTransformacion(nodoCamara, "cámara");
      this.imprimirMatrizTransformacion(nodoLuz, "luz");
      this.imprimirMatrizTransformacion(nodoMalla, "malla");
      this.imprimirMatrizTransformacion(nodoHijoDeMalla, "hijo de malla");

      // Actualizar transformaciones y recorrer de nuevo
      nodoCamara.setTraslacion(vec3.fromValues(0, 2, 5));
      raiz.recorrer(mat4.create()); // Suponiendo que recorrer actualiza y aplica las transformaciones

      // Imprimir información después de actualizar transformaciones
      this.actualizarInformacion("Después de actualizar transformaciones:");
      this.imprimirMatrizTransformacion(nodoCamara, "cámara actualizada");

      console.log("Escena inicializada y lista para renderizar");

      try {
        await this.gestorRecursos.cargarRecurso('mallaEjemplo', 'malla', '../../../../assets/json/malla.json');
        this.actualizarInformacion("Malla 'mallaEjemplo' cargada y almacenada en memoria.");
        
        // Intentamos cargar la misma malla de nuevo para verificar que se recupera de memoria:
        await this.gestorRecursos.cargarRecurso('mallaEjemplo', 'malla', '../../../../assets/json/malla.json');
        this.actualizarInformacion("Verificación completada: La malla 'mallaEjemplo' se ha recuperado de la memoria sin necesidad de recargarla.");

      } catch (error) {
        console.error("Error al cargar la malla:", error);
        this.actualizarInformacion(`Error al cargar la malla: ${error}`);
      }

      try{
        await this.gestorRecursos.cargarRecurso('materialEjemplo', 'material', '../../../../assets/json/material.json');
        this.actualizarInformacion("Material 'materialEjemplo' cargado y almacenado en memoria.");

        await this.gestorRecursos.cargarRecurso('mallaEjemplo', 'malla', '../../../../assets/json/material.json');
        this.actualizarInformacion("Verificación completada: El material 'materialEjemplo' se ha recuperado de la memoria sin necesidad de recargarla.");

        await this.gestorRecursos.cargarRecurso('materialEjemplo2', 'material', '../../../../assets/json/material.json');
        this.actualizarInformacion("Material 'materialEjemplo2' cargado y almacenado en memoria.");
      } catch (error){
        console.error("Error al cargar el material:", error);
        this.actualizarInformacion(`Error al cargar el material: ${error}`);
      }
    }

    else {
      console.error('El elemento canvas no está disponible.');
    }
  }*/

  async iniciarEscena(): Promise<void> {
    if (this.canvasRef && this.canvasRef.nativeElement) {
      const canvas = this.canvasRef.nativeElement;
      const gl = canvas.getContext('webgl');
  
      if (!gl) {
        console.error('No se puede inicializar WebGL. Tu navegador o máquina puede no soportarlo.');
        return;
      }

      gl.clearColor(0.0, 2.0, 4.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);

      gl.getError();

      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      // Códigos de shaders (vertex y fragment) aquí o cargados de alguna manera

      if(vertexShader){
        console.log('hola');
        gl.shaderSource(vertexShader, vertexShaderText);
      }

      if(fragmentShader){
        console.log('hola1');
        gl.shaderSource(fragmentShader, fragmentShaderText);
      }

      /* Compila y enlaza el programa de shader
      const shaderProgram = this.createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);*/

      if(vertexShader){
        console.log('hola2');
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
          console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
          return;
        }
      }

      if(fragmentShader){
        console.log('hola3');
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
          console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
          return;
        }
      }

      const program = gl.createProgram();
      if(program && vertexShader){
        console.log('hola4');
        gl.attachShader(program, vertexShader);
      }

      if(program && fragmentShader){
        console.log('hola5');
        gl.attachShader(program, fragmentShader);
      }

      if(program){
        console.log('hola6');
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
          console.log('hola7');
          //console.log(program);
          console.log(gl);
          console.log(recursoMalla.dibujar(gl, program));
        }
      }

      /*
      var triangleVertices = 
      [ // X, Y,       R, G, B
        0.0, 0.5,    1.0, 1.0, 0.0,
        -0.5, -0.5,  0.7, 0.0, 1.0,
        0.5, -0.5,   0.1, 1.0, 0.6
      ];

      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

      if(program){
        var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
        gl.vertexAttribPointer(
          positionAttribLocation, // Attribute location
          2, // Number of elements per attribute
          gl.FLOAT, // Type of elements
          false,
          5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
          0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.vertexAttribPointer(
          colorAttribLocation, // Attribute location
          3, // Number of elements per attribute
          gl.FLOAT, // Type of elements
          false,
          5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
          2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
        );

        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(colorAttribLocation);

        //
        // Main render loop
        //
        gl.useProgram(program);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }*/

    } else {
      console.error('El elemento canvas no está disponible.');
    }
  }
}
