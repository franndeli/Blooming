import { TRecursoMalla } from './TRecursoMalla';
//import TRecursoTextura from './TRecursoTextura';
import { TRecursoShader } from './TRecursoShader';
import TRecusroMaterial from './TRecursoMaterial';
import { HttpClient } from '@angular/common/http';
import { TRecurso  } from './recurso'

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
        console.log('Recurso encontrado');
      }
    }

    if (!recurso) {
      switch (tipo) {
        case 'malla':
          console.log('Creando recurso malla');
          recurso = new TRecursoMalla(nombre, await this.getRecurso('fragmentShader.glsl', 'shader'));
          break;
        /*case 'textura':
          recurso = new TRecursoTextura(nombre);
          break;*/
        case 'shader':
          recurso = await TRecursoShader.create(nombre);
          break;
        case 'material':
          recurso = new TRecusroMaterial(nombre);
          break;
        default:
          throw new Error(`Tipo de recurso '${tipo}' no reconocido.`);
      }

      await recurso.cargarRecurso(nombre);

      //recurso.setNombre(nombre);
      
      this.recursos.push(recurso);
    }
    return recurso;
  }
}
