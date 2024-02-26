import {Recurso} from './recurso';
import RMalla from './TRecursoMalla';
import RTextura from './TRecursoTextura';

class GestorRecursos {
  private recursos: Recurso[] = [];

  getRecurso(nombre: string, tipo: string): Recurso {
    let rec: Recurso | undefined = this.recursos.find(r => r.getNombre() === nombre);

    if (!rec) {
      switch (tipo) {
        case 'malla':
          rec = new RMalla(nombre);
          break;
        case 'textura':
          rec = new RTextura(nombre);
          break;
        default:
          throw new Error(`Tipo de recurso no válido: ${tipo}`);
      }

      rec.cargarRecurso();
      this.recursos.push(rec);
    }

    return rec;
  }
}

export default GestorRecursos;
