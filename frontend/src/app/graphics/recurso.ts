export abstract class Recurso {
  protected nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  abstract cargarRecurso(url: string): Promise<void>;

  getNombre(): string {
    return this.nombre;
  }

  setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }
}
