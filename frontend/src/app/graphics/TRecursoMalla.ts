import Recurso from './recurso';

class TRecursoMalla extends Recurso {
  private vertices: Float32Array | null = null;
  private normales: Float32Array | null = null;
  private coordTexturas: Float32Array | null = null;
  private indices: Int32Array | null = null;

  constructor(nombre: string) {
    super(nombre);
  }

  cargarRecurso(): void {
    // Implementa la lógica para cargar el fichero según tus necesidades
    console.log(`Cargando fichero para la malla ${this.getNombre()}`);
    // Asigna valores a vertices, normales, coordTexturas, indices
    this.vertices = new Float32Array(/* ... */);
    this.normales = new Float32Array(/* ... */);
    this.coordTexturas = new Float32Array(/* ... */);
    this.indices = new Int32Array(/* ... */);
  }

  draw(): void {
    // Implementa la lógica para dibujar la malla
    console.log(`Dibujando la malla ${this.getNombre()}`);
    // Utiliza this.vertices, this.normales, this.coordTexturas, this.indices
  }
}

export default TRecursoMalla;
