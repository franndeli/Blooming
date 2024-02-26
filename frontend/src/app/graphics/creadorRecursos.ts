import {Recurso} from './recurso';

export interface CreadorRecurso {
  crearRecurso(nombre: string): Recurso;
}