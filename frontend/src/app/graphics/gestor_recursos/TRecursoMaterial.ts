import {Recurso} from './recurso';

class TRecusroMaterial extends Recurso {
  private coeficientesLuz: number[] = [];
  private texturas: string[] = [];

  constructor(nombre: string) {
    super(nombre);
  }

  cargarFichero(nombre: string): void {
    // Lógica para cargar el fichero de coeficientes de luz y texturas
    console.log(`Cargando fichero para el material ${this.getNombre()}`);

    // Asignar valores a coeficientesLuz y texturas
    this.coeficientesLuz = [/* ... */];
    this.texturas = [/* ... */];
  }

  // una implementación específica para la carga de recursos de material
  cargarRecurso(): void {
    this.cargarFichero("nombre_por_defecto"); // Puedes llamar a cargarFichero aquí o proporcionar otra lógica
  }
}

export default TRecusroMaterial;
