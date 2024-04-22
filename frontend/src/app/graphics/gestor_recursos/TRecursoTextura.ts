import { TRecurso } from './recurso';

export class TRecursoTextura extends TRecurso {
  texture: WebGLTexture | null = null;
  public override gl: WebGL2RenderingContext;
  private url: string;

  constructor(url: string) {
      super();

      var canvas = <HTMLCanvasElement>document.getElementById('canvasWebGL');
      var context = canvas.getContext('webgl2');
      if (context === null) {
        throw new Error('Unable to get WebGL2 context');
      }
      this.gl = context;

      this.url = url;
      this.cargarTextura().then(() => {
        console.log("Textura cargada correctamente");
      }).catch(error => {
          console.error("Error al cargar la textura:", error);
      });
  }

  cargarTextura(): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
          this.texture = this.gl.createTexture();
          console.log(this.texture);
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
          this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
          resolve();
      };
      image.onerror = () => {
          reject(new Error("Failed to load image"));
      };
      image.src = this.url;
    });
  }

  getTexture() {
    if (this.texture === null) {
        throw new Error("Texture not loaded or failed to load");
    }
    return this.texture;
  }
}
