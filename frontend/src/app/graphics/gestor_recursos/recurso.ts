export class TRecurso {
  private nombre: string;
  public gl: WebGLRenderingContext

  constructor() {
    this.nombre = '';
    var canvas = <HTMLCanvasElement>document.getElementById('canvasWebGL');
    var context = canvas.getContext('webgl2');
    if (context === null) {
      throw new Error('Unable to get WebGL2 context');
    }
    this.gl = context;
  }

  getNombre(): string {
    return this.nombre;
  }

  setNombre(nombre: string): void {
    console.log(`Nombre: ${nombre}`);
    this.nombre = nombre;
  }

  async cargarRecurso(nombre: string): Promise<void> {
  }
}
