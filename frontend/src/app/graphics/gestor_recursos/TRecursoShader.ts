/*import {Recurso} from './recurso';

class TRecursoShader extends Recurso {
  private id: WebGLProgram | null = null;

  constructor(nombre: string) {
    super(nombre);
    this.id = this.crearPrograma(); // Puedes crear el programa GLSL al instanciar el objeto
  }

  private crearPrograma(): WebGLProgram | null {
    // Implementa la lógica para crear y compilar el programa GLSL
    console.log(`Creando programa GLSL para el shader ${this.getNombre()}`);

    const programa: WebGLProgram | null = /* Lógica para crear el programa GLSL null;

    return programa;
  }

  async cargarRecurso(url: string): Promise<void> {
    // Puedes proporcionar una implementación específica para cargar el shader si es necesario
    console.log(`Cargando recurso para el shader ${this.getNombre()}`);
  }

  // Métodos para asignar valores a uniforms
  setInt(uniformNombre: string, valor: number): void {
    // Implementa la lógica para asignar un entero a un uniform
    console.log(`Asignando entero a uniform en shader ${this.getNombre()}`);
  }

  setFloat(uniformNombre: string, valor: number): void {
    // Implementa la lógica para asignar un número de punto flotante a un uniform
    console.log(`Asignando número de punto flotante a uniform en shader ${this.getNombre()}`);
  }

  setMat4(uniformNombre: string, matriz: number[]): void {
    // Implementa la lógica para asignar una matriz 4x4 a un uniform
    console.log(`Asignando matriz 4x4 a uniform en shader ${this.getNombre()}`);
  }

  // Otros métodos específicos de TRecursoShader, si los necesitas
}

export default TRecursoShader;*/
