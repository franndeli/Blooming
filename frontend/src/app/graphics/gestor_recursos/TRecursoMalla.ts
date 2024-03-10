import { Recurso } from './recurso';
import { TMalla } from '../arbol_escena/malla';
export class TRecursoMalla extends Recurso {
  private mallas: TMalla[] = [];

  constructor(nombre: string) {
    super(nombre);
  }

  async cargarRecurso(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const data = await response.json();

      data.mallas.forEach((mallaData: any) => {
        // Crear una nueva instancia de TMalla para cada conjunto de datos
        const nuevaMalla = new TMalla(
          mallaData.vertices,
          mallaData.normales,
          mallaData.coordTexturas,
          mallaData.indices
        );

        // Guardar la nueva malla en el array
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
  dibujar(gl: WebGLRenderingContext, shaderProgram: WebGLProgram): void {
    console.log(`Dibujando la malla ${this.getNombre()}`);
    this.mallas.forEach((malla) => {
      malla.dibujar(gl, shaderProgram);
    });
  }
}
