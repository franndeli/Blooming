import { Recurso } from './recurso';

export default class TRecursoMalla extends Recurso {
  private vertices: Float32Array | null = null;
  private normales: Float32Array | null = null;
  private coordTexturas: Float32Array | null = null;
  private indices: Int32Array | null = null;

  constructor(nombre: string) {
    super(nombre);
  }

  async cargarRecurso(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.vertices = new Float32Array(data.vertices);
      this.normales = new Float32Array(data.normales);
      this.coordTexturas = new Float32Array(data.coordTexturas);
      this.indices = new Int32Array(data.indices);
      console.log(`Malla ${this.getNombre()} cargada correctamente.`);
    } catch (error) {
      console.error(`Error al cargar la malla ${this.getNombre()}:`, error);
    }
  }

  draw(): void {
    // Implementa la lógica para dibujar la malla
    console.log(`Dibujando la malla ${this.getNombre()}`);
    // Utiliza this.vertices, this.normales, this.coordTexturas, this.indices
  }
}
