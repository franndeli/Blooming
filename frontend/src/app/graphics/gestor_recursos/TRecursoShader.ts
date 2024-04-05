import { mat4 } from 'gl-matrix';
import {Recurso} from './recurso';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class TRecursoShader extends Recurso {
  private vertexShaderCode: string = '';
  private fragmentShaderCode: string = '';
  private id: WebGLProgram | null = null;

  private basePath: string = '../../../../assets/shaders/';

  constructor(nombre: string, gl: WebGLRenderingContext) {
    super(nombre);
    this.crearShader(gl);
  }

  private async crearShader(gl: WebGLRenderingContext){
    let vertexShaderId, fragmentShaderId;
    vertexShaderId = gl.createShader(gl.VERTEX_SHADER);
    fragmentShaderId = gl.createShader(gl.FRAGMENT_SHADER);

    [this.vertexShaderCode, this.fragmentShaderCode] = await Promise.all([
      this.leerShader('vertexShader.glsl'),
      this.leerShader('fragmentShader.glsl')
    ])
    
    if(vertexShaderId && fragmentShaderId){
      gl.shaderSource(vertexShaderId, this.vertexShaderCode);
      gl.shaderSource(fragmentShaderId, this.fragmentShaderCode);

      gl.compileShader(vertexShaderId);
      gl.compileShader(fragmentShaderId);

      this.id = gl.createProgram();
      if (this.id) {
        gl.attachShader(this.id, vertexShaderId);
        gl.attachShader(this.id, fragmentShaderId);
        gl.linkProgram(this.id);

        if (!gl.getProgramParameter(this.id, gl.LINK_STATUS)) {
          console.error(`Error al crear el programa GLSL para el shader ${this.getNombre()}`);
        } else {
          console.log(`Programa GLSL para el shader ${this.getNombre()} creado correctamente`);
        }

        gl.deleteShader(vertexShaderId);
        gl.deleteShader(fragmentShaderId);

        gl.useProgram(this.id);
      }
    }
    
    console.log(`Creando programa GLSL para el shader ${this.getNombre()}`);
  }

  async cargarRecurso(nombre: string): Promise<void> {}

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
