import { mat4, vec3, mat3 } from 'gl-matrix';
import { CuboService } from '../../services/cubo.service';
import { PlanoService } from '../../services/plano.service';
import { GestorRecursos, TRecursoMalla, TNodo, TCamara, TLuz, TRecursoTextura } from '../../graphics';
import { event } from 'jquery';

export class MotorGrafico {
  public escena!: TNodo;
  public modelos: TNodo[];
  private camActiva!: TNodo;
  private camaraActiva: number = 0;
  private canvas!: HTMLCanvasElement;
  private gl!: WebGL2RenderingContext;
  private registroCamaras: TNodo[] = [];
  private gestorRecursos = new GestorRecursos();
 

  constructor(private cuboService: CuboService, private planoService: PlanoService){
    this.modelos = [];
  }

  mouseMove = (event: any) => {
    this.planoService.mouseMove(event, this.canvas.width, this.canvas.height);
    this.planoService.raycast();
  }

  rayPicking = (event: any) => this.cuboService.rayPicking(event, this.canvas);

  async iniciarEscena(canvas: HTMLCanvasElement, interfaz: number) {
    if(canvas) {
      this.canvas = canvas;
      this.clearEvents();
      if(interfaz == 1){
        this.canvas.addEventListener("mousedown", this.cuboService.mouseDown, false);
        this.canvas.addEventListener("mouseup", this.cuboService.mouseUp, false);
        this.canvas.addEventListener("mouseout", this.cuboService.mouseUp, false);
        this.canvas.addEventListener("mousemove", this.cuboService.mouseMove, false);
        this.canvas.addEventListener("wheel", this.cuboService.zoom, false);
        this.canvas.addEventListener("click", this.rayPicking, false);
      }

      if(interfaz == 2){
        this.canvas.addEventListener("mousedown", this.planoService.mouseDown, false);
        this.canvas.addEventListener("mouseup", this.planoService.mouseUp, false);
        this.canvas.addEventListener("mouseout", this.planoService.mouseUp, false);
        this.canvas.addEventListener("mousemove", this.mouseMove, false);
      }
      
      this.resizeCanvasToDisplaySize(this.canvas);

    } else {
      console.error('Canvas no definido en iniciarEscena');
      return;
    }

    window.addEventListener('resize', () => this.resizeCanvasToDisplaySize(this.canvas));
  }

    clearEvents() {
      this.canvas.removeEventListener("mousedown", this.cuboService.mouseDown, false);
      this.canvas.removeEventListener("mouseup", this.cuboService.mouseUp, false);
      this.canvas.removeEventListener("mouseout", this.cuboService.mouseUp, false);
      this.canvas.removeEventListener("mousemove", this.cuboService.mouseMove, false);
      this.canvas.removeEventListener("wheel", this.cuboService.zoom, false);
      this.canvas.removeEventListener("click", this.rayPicking, false);
      this.canvas.removeEventListener("mousedown", this.planoService.mouseDown, false);
      this.canvas.removeEventListener("mouseup", this.planoService.mouseUp, false);
      this.canvas.removeEventListener("mouseout", this.planoService.mouseUp, false);
      this.canvas.removeEventListener("mousemove", this.mouseMove, false);
    }

    resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          return true;
      }
      return false;
    }

  crearNodo(padre:TNodo | null, trasl: vec3, rot: vec3, esc: vec3): TNodo {
    const nodo = new TNodo(null, padre);

    nodo.setTraslacion(trasl);
    nodo.setRotacion(rot);
    nodo.setEscalado(esc);
    nodo.setActualizarMatriz(true);

    if(padre !== null){
      padre.addHijo(nodo);
    }
    console.log('Nodo creado: ', nodo)

    return nodo;
  }

  crearCamara(padre: TNodo | null, trasl: vec3, rot: vec3, esc: vec3): TNodo {
    const eCamara = new TCamara();
    const camara = new TNodo(eCamara, padre);

    camara.setTraslacion(trasl);
    camara.setRotacion(rot);
    camara.setEscalado(esc);
    camara.setActualizarMatriz(true);

    if(padre != null){
      padre.addHijo(camara);
    }

    var numCam = this.registrarCamara(camara);
    this.setCamaraActiva(numCam);
    this.camActiva = this.getCamaraActiva();

    console.log('camara activada: ', this.camActiva)

    return camara;
  }

  crearLuz(padre: TNodo | null, trasl: vec3, rot: vec3, esc: vec3, intensidad: vec3 /*, tipoLuz: EnumType*/): TNodo {
    const luz = new TNodo(null, padre);
    luz.setEntidad(new TLuz(intensidad));
    luz.setTraslacion(trasl);
    luz.setRotacion(rot);
    luz.setEscalado(esc);
    luz.setActualizarMatriz(true);

    if(padre != null){
      padre.addHijo(luz);
    }

    return luz;
  } 

  async crearModelo(padre: TNodo | null, fichero: string, trasl: vec3, rot: vec3, esc: vec3, texturas: any): Promise<TNodo> {
    const recurso =  await this.gestorRecursos.getRecurso(fichero, 'malla', texturas) as TRecursoMalla;
    const modelo = new TNodo(recurso, padre);

    modelo.setTraslacion(trasl);
    modelo.setRotacion(rot);
    modelo.setEscalado(esc);
    modelo.setActualizarMatriz(true);

    if(padre != null){
      padre.addHijo(modelo);
    }

    this.modelos.push(modelo);

    return modelo;
  }

  async cargarTextura(fichero: string){
    const textura = await this.gestorRecursos.getRecurso(fichero, 'textura', null) as TRecursoTextura;
    return textura;
  }

  registrarCamara(nodoCam: TNodo) {
    this.registroCamaras.push(nodoCam);
    return this.registroCamaras.length - 1;
  }

  getCamaraActiva() {
    return this.registroCamaras[this.camaraActiva];
  }

  setCamaraActiva(numCam: number) {
    this.camaraActiva = numCam;
  }

  getCanvas(){
    return this.canvas;
  }

  async dibujarEscena(escena: TNodo) {
    this.gl = await this.initWebGL(this.canvas);
    this.checkWebGLError();
    await escena.recorrer(mat4.create());
  }
  
  public initWebGL(canvas: HTMLCanvasElement): any{
    let gl = null;

    gl = canvas.getContext('webgl2', { antialias: true, depth: true, stencil: true });

    if (!gl) {
      console.error('No se puede inicializar WebGL. Tu navegador o máquina puede no soportarlo.');
      return null;
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.6, 1.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    return gl;
  }
  
  limpiarEscena(escena: TNodo) {
    for(let i = escena.getHijos().length - 1; i >= 0; i--) {
      let objeto = escena.getHijos()[i];
      escena.removeHijo(objeto);
    }
  }

  checkWebGLError() {
    if (!this.gl) {
      console.error('WebGL no está inicializado');
      return;
    }

    let error = this.gl.getError();
    if (error != this.gl.NO_ERROR) {
      console.error('Se produjo un error de WebGL: ', error);
    }
  }

}