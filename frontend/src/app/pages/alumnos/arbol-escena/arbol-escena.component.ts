import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TNodo, TCamara, TLuz, TMalla, GestorRecursos, TRecursoMalla } from '../../../graphics';
import { vec3, mat4 } from 'gl-matrix';

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
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw new Error('Shader compilation failed');
    }
    return shader;
  }

  // Método auxiliar para crear y enlazar un programa de shader
  private createShaderProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram {
    const vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Shader program linking failed:', gl.getProgramInfoLog(shaderProgram));
      throw new Error('Shader program linking failed');
    }

    return shaderProgram;
  }*/

  actualizarInformacion(info: string) {
    const infoDiv = document.getElementById('infoEscena');
    if (infoDiv) {
      infoDiv.innerHTML += `<p>${info}</p>`;
    }
  }

  async  iniciarEscena(): Promise<void> {
    if (this.canvasRef && this.canvasRef.nativeElement) {
      const canvas = this.canvasRef.nativeElement;
      const gl = canvas.getContext('webgl');
  
      if (!gl) {
        console.error('No se puede inicializar WebGL. Tu navegador o máquina puede no soportarlo.');
        return;
      }
    
      // Configuración inicial de WebGL
      gl.clearColor(0.0, 0.0, 0.0, 1.0); // Fondo negro, opaco
      gl.clear(gl.COLOR_BUFFER_BIT);

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
  }

  /*async iniciarEscena(): Promise<void> {
    if (this.canvasRef && this.canvasRef.nativeElement) {
      const canvas = this.canvasRef.nativeElement;
      const gl = canvas.getContext('webgl');
  
      if (!gl) {
        console.error('No se puede inicializar WebGL. Tu navegador o máquina puede no soportarlo.');
        return;
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0); // Fondo negro, opaco
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST); // Habilita el test de profundidad

      // Códigos de shaders (vertex y fragment) aquí o cargados de alguna manera
      const vertexShaderSource = `...`; // Tu shader de vértices aquí
      const fragmentShaderSource = `...`; // Tu shader de fragmentos aquí

      // Compila y enlaza el programa de shader
      const shaderProgram = this.createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);

      // Configura el programa de shader para usar
      gl.useProgram(shaderProgram);

      // Carga los recursos necesarios para la malla
      await this.gestorRecursos.cargarRecurso('mallaEjemplo', 'malla', 'ruta/a/tu/malla.json');
      
      // Asigna el recurso malla a la variable
      const recursoMalla = this.gestorRecursos.getRecurso('mallaEjemplo') as TRecursoMalla;

      if (recursoMalla) {
        // Llama al método dibujar de recursoMalla
        recursoMalla.dibujar(gl, shaderProgram);
      }
    } else {
      console.error('El elemento canvas no está disponible.');
    }
  }*/

  imprimirMatrizTransformacion(nodo: TNodo, nombre: string) {
    // Suponiendo que getMatrizTransf devuelve la matriz de transformación actual del nodo
    const matriz = nodo.getMatrizTransf();
    const matrizStr = matriz ? `Matriz de ${nombre}: ${matriz.toString()}` : `No se pudo obtener la matriz de ${nombre}`;
    this.actualizarInformacion(matrizStr);
  }
}
