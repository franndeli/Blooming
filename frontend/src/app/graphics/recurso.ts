abstract class Recurso {
    protected nombre: string;
  
    constructor(nombre: string) {
      this.nombre = nombre;
    }
  
    abstract cargarRecurso(): void;
  
    getNombre(): string {
      return this.nombre;
    }
  
    setNombre(nuevoNombre: string): void {
      this.nombre = nuevoNombre;
    }
}
  
export default Recurso;
