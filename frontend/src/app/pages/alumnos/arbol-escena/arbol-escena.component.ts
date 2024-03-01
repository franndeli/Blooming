import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TNodo, TCamara, TLuz, TMalla } from '../../../graphics';
import { vec3, mat4 } from 'gl-matrix';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})
export class ArbolEscenaComponent implements AfterViewInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngAfterViewInit(): void {
    this.iniciarEscena();
  }

  actualizarInformacion(info: string) {
    const infoDiv = document.getElementById('infoEscena');
    if (infoDiv) {
      infoDiv.innerHTML += `<p>${info}</p>`;
    }
  }

  iniciarEscena(): void {
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
      const malla = new TMalla("mallaEjemplo"); // Supongamos que este es el identificador de la malla
      const nodoMalla = new TNodo(malla);
      raiz.addHijo(nodoMalla);
      this.actualizarInformacion("Se ha añadido una malla, longitud actual del array de hijos: " + raiz.hijos.length);

      // Añadir un nodo hijo a nodoMalla y verificar recorrido
      const hijoDeMalla = new TMalla("hijoDeMalla");
      const nodoHijoDeMalla = new TNodo(hijoDeMalla);
      nodoMalla.addHijo(nodoHijoDeMalla);

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
    }

    else {
      console.error('El elemento canvas no está disponible.');
    }
  }

  imprimirMatrizTransformacion(nodo: TNodo, nombre: string) {
    // Suponiendo que getMatrizTransf devuelve la matriz de transformación actual del nodo
    const matriz = nodo.getMatrizTransf();
    const matrizStr = matriz ? `Matriz de ${nombre}: ${matriz.toString()}` : `No se pudo obtener la matriz de ${nombre}`;
    this.actualizarInformacion(matrizStr);
  }
}
