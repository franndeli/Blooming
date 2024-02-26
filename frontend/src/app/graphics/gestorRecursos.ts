import { Recurso } from './recurso';
import { CreadorRecurso } from './creadorRecursos';

class GestorRecursos {
  private recursos: Map<string, Recurso> = new Map();
  private factories: Map<string, CreadorRecurso> = new Map();

  registrarTipoRecurso(tipo: string, factory: CreadorRecurso): void {
    this.factories.set(tipo, factory);
  }

  getRecurso(nombre: string, tipo: string): Recurso {
    const clave = `${tipo}:${nombre}`;
    let recurso = this.recursos.get(clave);

    if (!recurso) {
      const factory = this.factories.get(tipo);
      if (!factory) {
        throw new Error(`Fábrica para el tipo de recurso '${tipo}' no registrada.`);
      }
      recurso = factory.crearRecurso(nombre);
      recurso.cargarRecurso("hola");
      this.recursos.set(clave, recurso);
    }

    return recurso;
  }
}

export default GestorRecursos;