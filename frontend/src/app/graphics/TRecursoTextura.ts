import Recurso from './recurso';

class TRecursoTextura extends Recurso {
  private id: WebGLTexture | null = null;
  private width: number = 0;
  private height: number = 0;

  constructor(nombre: string) {
    super(nombre);
    this.id = this.crearTextura(); // Puedes crear la textura al instanciar el objeto
  }

  private crearTextura(): WebGLTexture | null {
    // Implementa la lógica para generar la textura con glGenTextures
    console.log(`Creando textura para ${this.getNombre()}`);

    const textura: WebGLTexture | null = /* Lógica para generar la textura */ null;

    return textura;
  }

  cargarFichero(nombre: string): void {
    // Implementa la lógica para cargar el fichero de la textura según tus necesidades
    console.log(`Cargando fichero para la textura ${this.getNombre()}`);
    // Asigna valores a width, height
    this.width = 512;
    this.height = 512;
  }

  cargarRecurso(): void {
    // Implementa la lógica específica para cargar el recurso de la textura
    console.log(`Cargando recurso para la textura ${this.getNombre()}`);
  }
  // Otros métodos específicos de TRecursoTextura, si los necesitas
}

export default TRecursoTextura;
