import { TRecurso  } from './recurso'
import { TRecursoMalla } from './TRecursoMalla';
import { TRecursoShader } from './TRecursoShader';
import { TRecursoTextura } from './TRecursoTextura';

export class GestorRecursos {
  private recursos: TRecurso[];
  
  constructor(){
    this.recursos = [];
  }

  async getRecurso(nombre: string, tipo: string): Promise<any> {
    let recurso = null;

    for(let i = 0; i < this.recursos.length; i++){
      if(this.recursos[i].getNombre() == nombre){
        recurso = this.recursos[i];
      }
    }

    if (!recurso) {
      switch (tipo) {
        case 'malla':
          recurso = new TRecursoMalla(nombre, await this.getRecurso('fragmentShader.glsl', 'shader'));
          break;
        case 'textura':
          recurso = await new TRecursoTextura(nombre);
          await recurso.setNombre(recurso.url);
          break;
        case 'shader':
          recurso = await TRecursoShader.create(nombre);
          break;
        // case 'material':
        //   recurso = new TRecusroMaterial(nombre);
        //   break;
        default:
          throw new Error(`Tipo de recurso '${tipo}' no reconocido.`);
      }

      await recurso.cargarRecurso(nombre);

      //recurso.setNombre(nombre);
      
      this.recursos.push(recurso);
      console.log(this.recursos)
    }
    return recurso;
  }
}
