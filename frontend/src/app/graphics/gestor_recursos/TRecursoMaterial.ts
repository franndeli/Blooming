// TRecursoMaterial.ts
import { TRecurso } from './recurso';

export default class TRecursoMaterial extends TRecurso {
  private coeficientesLuz: number[] = [];
  private texturas: string[] = [];

  constructor(nombre: string) {
    super();
  }

  override async cargarRecurso(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.coeficientesLuz = data.coeficientesLuz;
      this.texturas = data.texturas;
      console.log(`Material ${this.getNombre()} cargado correctamente con coeficientes de luz: ${this.coeficientesLuz} y texturas: ${this.texturas}`);
    } catch (error) {
      console.error(`Error al cargar el material ${this.getNombre()}:`, error);
    }
  }
}
