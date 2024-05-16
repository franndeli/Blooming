import { mat4 } from 'gl-matrix';
import { TRecurso } from './recurso';
import { TCamara } from '../arbol_escena/camara';

export class TRecursoShader extends TRecurso {
  private camara: TCamara;
  private viewMatrix: mat4;
  private projMatrix: mat4;
  private modelMatrix: mat4;
  private vertexShaderCode: string = '';
  private id: WebGLProgram | null = null;
  private fragmentShaderCode: string = '';
  private basePath: string = '../../../../assets/shaders/';

  private constructor(nombre: string) {
    super();
    this.camara = new TCamara();
    this.camara.setProjMatrix(90, this.gl.canvas.width / this.gl.canvas.height, 1, 100);
    this.projMatrix = this.camara.getProjMatrix();
    this.modelMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    this.setNombre(nombre);
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
      if (!this.gl.getShaderParameter(vertexShaderId, this.gl.COMPILE_STATUS)) {
        console.error('Error al compilar el vertex shader: ', this.gl.getShaderInfoLog(vertexShaderId));
        return;
      }
      this.gl.compileShader(fragmentShaderId);
      if (!this.gl.getShaderParameter(fragmentShaderId, this.gl.COMPILE_STATUS)) {
        console.error('Error al compilar el fragment shader: ', this.gl.getShaderInfoLog(fragmentShaderId));
        return;
      }

      this.id = this.gl.createProgram();
      if (this.id) {
        this.gl.attachShader(this.id, vertexShaderId);
        this.gl.attachShader(this.id, fragmentShaderId);
        this.gl.linkProgram(this.id);

        if (!this.gl.getProgramParameter(this.id, this.gl.LINK_STATUS)) {
          console.error(`Error al crear el programa GLSL para el shader ${this.gl.getProgramInfoLog(this.id)}`);
        } else {}

        this.gl.deleteShader(vertexShaderId);
        this.gl.deleteShader(fragmentShaderId);

        this.gl.useProgram(this.id);
      }
    }
  }

  async leerShader(nombreArchivo: string): Promise<string> {
    try{
      const url = this.basePath + nombreArchivo;
      const response = await fetch(url);
      const data = await response.text();
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

  setProjMatrix(matriz: mat4){
    this.projMatrix = matriz;
  }

  setViewMatrix(matriz: mat4){
    this.viewMatrix = matriz;
  }

  setModelMatrix(matriz: mat4){
    this.modelMatrix = matriz;
  }

  getProjMatrix(){
    return this.projMatrix;
  }

  getModelMatrix(){
    return this.modelMatrix;
  }

  getViewMatrix(){
    return this.viewMatrix;
  }

  // Métodos para asignar valores a uniforms
  setInt(gl: WebGL2RenderingContext, uniformNombre: string, valor: number): void {
    if(!this.id) return;
    const uniformLocation = gl.getUniformLocation(this.id, uniformNombre);
    console.log(`Asignando entero a uniform en shader ${this.getNombre()}`);
  }

  setFloat(gl: WebGL2RenderingContext, uniformNombre: string, valor: number): void {
    if(!this.id) return;
    const uniformLocation = gl.getUniformLocation(this.id, uniformNombre);
    console.log(`Asignando número de punto flotante a uniform en shader ${this.getNombre()}`);
  }

  setMat4(gl: WebGL2RenderingContext, uniformNombre: string, matriz: number[]): void {
    if(!this.id) return;
    const uniformLocation = gl.getUniformLocation(this.id, uniformNombre);
    console.log(`Asignando matriz 4x4 a uniform en shader ${this.getNombre()}`);
  }
}
