import { Recurso } from './recurso';
import { TRecursoMalla } from './TRecursoMalla';
//import TRecursoTextura from './TRecursoTextura';
import { TRecursoShader } from './TRecursoShader';
import TRecusroMaterial from './TRecursoMaterial';
import { HttpClient } from '@angular/common/http';

export class GestorRecursos {
  private recursos: Map<string, Recurso> = new Map();
  

  async getRecurso(nombre: string, tipo: string, gl: WebGLRenderingContext): Promise<Recurso | undefined> {
    const clave = `${tipo}:${nombre}`;
    let recurso = this.recursos.get(clave);

    if (!recurso) {
      switch (tipo) {
        case 'malla':
          recurso = new TRecursoMalla(nombre);
          break;
        /*case 'textura':
          recurso = new TRecursoTextura(nombre);
          break;*/
        case 'shader':
          recurso = new TRecursoShader(nombre, gl);
          break;
        case 'material':
          recurso = new TRecusroMaterial(nombre);
          break;
        default:
          throw new Error(`Tipo de recurso '${tipo}' no reconocido.`);
      }

      if(!(recurso instanceof TRecursoShader)){
        await recurso.cargarRecurso(nombre);
      }
      this.recursos.set(clave, recurso);
    }
    return this.recursos.get(clave);
  }
}
