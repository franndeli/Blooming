import { Recurso } from './recurso';
import TRecursoMalla from './TRecursoMalla';
//import TRecursoTextura from './TRecursoTextura';
//import TRecursoShader from './TRecursoShader';
import TRecusroMaterial from './TRecursoMaterial';

export class GestorRecursos {
  private recursos: Map<string, Recurso> = new Map();

  async cargarRecurso(nombre: string, tipo: string, url: string): Promise<Recurso> {
    const clave = `${tipo}:${nombre}`;
    let recurso = this.recursos.get(clave);

    if (!recurso) {
      switch (tipo) {
        case 'malla':
          recurso = new TRecursoMalla(nombre);
          break;
        /*case 'textura':
          recurso = new TRecursoTextura(nombre);
          break;
        case 'shader':
          recurso = new TRecursoShader(nombre);
          break;*/
        case 'material':
          recurso = new TRecusroMaterial(nombre);
          break;
        default:
          throw new Error(`Tipo de recurso '${tipo}' no reconocido.`);
      }

      await recurso.cargarRecurso(url);
      console.log("Recurso cogido del disco y metido en memoria");
      this.recursos.set(clave, recurso);
    }

    return recurso;
  }
}
