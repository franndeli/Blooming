import { mat4 } from 'gl-matrix';
import { TRecurso } from './recurso';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class TRecursoShader extends TRecurso {
  private vertexShaderCode: string = '';
  private fragmentShaderCode: string = '';
  private id: WebGLProgram | null = null;

  private basePath: string = '../../../../assets/shaders/';

  private constructor(nombre: string) {
    super();
  }

  static async create(nombre: string): Promise<TRecursoShader> {
    const recurso = new TRecursoShader(nombre);
    await recurso.crearShader();
    return recurso;
  }

  private async crearShader(){
    let vertexShaderId, fragmentShaderId;
    vertexShaderId = this.gl.createShader(this.gl.VERTEX_SHADER);
    fragmentShaderId = this.gl.createShader(this.gl.FRAGMENT_SHADER);

    [this.vertexShaderCode, this.fragmentShaderCode] = await Promise.all([
      this.leerShader('vertexShader.glsl'),
      this.leerShader('fragmentShader.glsl')
    ])
    
    if(vertexShaderId && fragmentShaderId){
      this.gl.shaderSource(vertexShaderId, this.vertexShaderCode);
      this.gl.shaderSource(fragmentShaderId, this.fragmentShaderCode);

      this.gl.compileShader(vertexShaderId);
      this.gl.compileShader(fragmentShaderId);

      this.id = this.gl.createProgram();
      console.log(`Creando: ${this.id}`);
      if (this.id) {
        console.log('holaaaaaaaaaaa')
        this.gl.attachShader(this.id, vertexShaderId);
        this.gl.attachShader(this.id, fragmentShaderId);
        this.gl.linkProgram(this.id);

        if (!this.gl.getProgramParameter(this.id, this.gl.LINK_STATUS)) {
          console.error(`Error al crear el programa GLSL para el shader ${this.gl.getProgramInfoLog(this.id)}`);
        } else {
          console.log(`Programa GLSL para el shader ${this.gl.getProgramInfoLog(this.id)} creado correctamente`);
        }

        this.gl.deleteShader(vertexShaderId);
        this.gl.deleteShader(fragmentShaderId);

        this.gl.useProgram(this.id);
      }
    }
    
    console.log(`Creando programa GLSL para el shader ${this.getNombre()}`);
  }

  async leerShader(nombreArchivo: string): Promise<string> {
    try{
      const url = this.basePath + nombreArchivo;
      const response = await fetch(url);
      const data = await response.text();
      console.log(`Shader ${nombreArchivo} cargado correctamente.`)
      console.log(data)
      return data;
    } catch (error) {
      console.error(`Error al cargar el recurso de shader ${nombreArchivo}:`, error);
      return '';
    }
  }

  getProgramId(): WebGLProgram{
    if (this.id === null) {
      throw new Error('Program ID is null');
    }
    return this.id;
  }

  // Métodos para asignar valores a uniforms
  setInt(gl: WebGLRenderingContext, uniformNombre: string, valor: number): void {
    if(!this.id) return;
    const uniformLocation = gl.getUniformLocation(this.id, uniformNombre);
    console.log(`Asignando entero a uniform en shader ${this.getNombre()}`);
  }

  setFloat(gl: WebGLRenderingContext, uniformNombre: string, valor: number): void {
    if(!this.id) return;
    const uniformLocation = gl.getUniformLocation(this.id, uniformNombre);
    console.log(`Asignando número de punto flotante a uniform en shader ${this.getNombre()}`);
  }

  setMat4(gl: WebGLRenderingContext, uniformNombre: string, matriz: number[]): void {
    if(!this.id) return;
    const uniformLocation = gl.getUniformLocation(this.id, uniformNombre);
    console.log(`Asignando matriz 4x4 a uniform en shader ${this.getNombre()}`);
  }
}
