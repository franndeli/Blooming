import { Recurso } from './recurso';
import { TRecursoMalla } from './TRecursoMalla';
//import TRecursoTextura from './TRecursoTextura';
//import TRecursoShader from './TRecursoShader';
import TRecusroMaterial from './TRecursoMaterial';
import { HttpClient } from '@angular/common/http';

export class GestorRecursos {
  private recursos: Map<string, Recurso> = new Map();
  private basePath: string = '../../../../assets/json/';

  async getRecurso(nombre: string, tipo: string): Promise<Recurso | undefined> {
    const clave = `${tipo}:${nombre}`;
    let recurso = this.recursos.get(clave);
    const url = this.basePath + nombre;

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
      this.recursos.set(clave, recurso);
    }
    return this.recursos.get(clave);
  }
}
