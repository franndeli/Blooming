import { Recurso } from './recurso';
import { TMalla } from '../arbol_escena/malla';
import { mat4, vec3 } from 'gl-matrix';

export class TRecursoMalla extends Recurso {
  private mallas: TMalla[] = [];
  private basePath: string = '../../../../assets/json/';

  constructor(nombre: string) {
    super(nombre);
  }

  async cargarRecurso(nombre: string): Promise<void> {
    try {
      const url = this.basePath + nombre;
      const response = await fetch(url);
      console.log(response)
      const data = await response.json();
      console.log(data)

      data.mallas.forEach((mallaData: any) => {
        console.log('mallaData: ', mallaData)
        const nuevaMalla = new TMalla(
          [].concat(...mallaData.vertices),
          [].concat(...mallaData.normales),
          [].concat(...mallaData.coordTexturas),
          [].concat(...mallaData.colores),
          mallaData.indices
        );
        console.log('nuevaMalla:', nuevaMalla);
        this.mallas.push(nuevaMalla);
      });

      console.log(`Recurso malla ${this.getNombre()} cargado correctamente. Número de mallas: ${this.mallas.length}`);
    
    } catch (error) {
      console.error(`Error al cargar el recurso de malla ${this.getNombre()}:`, error);
    }
  }

  getMallas(): TMalla[] {
    console.log(this.mallas);
    return this.mallas;
  }

  // En TRecursoMalla
  dibujar(gl: WebGLRenderingContext, shaderProgram: WebGLProgram, matrizTransf: mat4): void {
    console.log(`Dibujando la malla ${this.getNombre()}`);
    this.mallas.forEach((malla) => {
      malla.dibujar(gl, shaderProgram, matrizTransf);
    });
  }
}
