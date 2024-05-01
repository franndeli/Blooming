import { mat4, vec3, mat3 } from 'gl-matrix';
import { ElementRef } from '@angular/core';
import { GestorRecursos, TRecursoMalla, TNodo, TCamara, TLuz, TRecursoTextura } from '../../graphics';

var clickIzq = false;
var old_x = 0;
var old_y = 0;
var dx = 0;
var dy = 0;
var dz = 0;
var theta = 0;
var phi = 0;
var psi = 0;
var escalado = 1;
var clickDcho = false;
var old_xRight = 0;
var old_yRight = 0;
var dxRight = 0;
var dyRight = 0;
var trasX = 0;
var trasY = 0;

export class MotorGrafico {

  private width: number = 0;
  private height: number = 0;
  public rotando:boolean = true;
  public time:number = 0;
  private cuboNecesitaActualizar: boolean = true;

  public escena!: TNodo;
  private camara!: TNodo;
  private avatar!: TNodo;
  public modelos: TNodo[];
  private camActiva!: TNodo;
  
  private camaraActiva: number = 0;
  private registroLuces: TNodo[] = [];
  private lucesActivas: boolean[] = [];
  private registroCamaras: TNodo[] = [];
  private gestorRecursos = new GestorRecursos();
  
  private program: WebGLProgram | null = null;
  private canvas!: HTMLCanvasElement;
  private gl!: WebGL2RenderingContext;

  private cubo!: any;

  constructor(){
    this.modelos = [];
  }

  async iniciarEscena(canvasRef: ElementRef<HTMLCanvasElement>) {

    //Iniciamos el canvas
    if(canvasRef && canvasRef.nativeElement) {
      this.canvas = canvasRef.nativeElement;
      this.canvas.addEventListener("mousedown", this.mouseDown, false);
      this.canvas.addEventListener("mouseup", this.mouseUp, false);
      this.canvas.addEventListener("mouseout", this.mouseUp, false);
      this.canvas.addEventListener("mousemove", this.mouseMove, false);
      this.canvas.addEventListener("wheel", this.zoom, false);
      this.canvas.addEventListener("click", this.rayPicking.bind(this), false);
      
      this.canvas = canvasRef.nativeElement;
      this.resizeCanvasToDisplaySize(this.canvas);

      //console.log('Canvas definido:', this.canvas);
    } else {
      console.error('Referencia de canvas no está definida en iniciarEscena');
      return;
    }

    //Cada vez que se hace resize de la pantalla se llama a la función para redibujar el canvas
    window.addEventListener('resize', () => this.resizeCanvasToDisplaySize(this.canvas));

    //Creamos el nodo escena
    this.escena = this.crearNodo(null, vec3.create(), vec3.create(), [1, 1, 1]);

    //Creamos el nodo camara
    this.camara = this.crearCamara(this.escena, [0, 0, 10], [0, 0, 0], [1, 1, 1]);

    //Para probar si la camara funciona correctamente
    /*var numCam = this.registrarCamara(this.camara);
    this.setCamaraActiva(numCam);
    this.camActiva = this.getCamaraActiva();*/

    //Crear cubo
    this.cubo = await this.crearModelo(this.escena, 'plano.gltf', [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    
    //const textura = new TRecursoTextura('../../../assets/images/profile/user-1.jpg');

    //crear luces

    let render = () => {
      if (this.cuboNecesitaActualizar) {
        this.cubo.setTraslacion([trasX, trasY, 0]);
        this.cubo.setRotacion([phi, theta, psi])
        this.cubo.setEscalado([escalado, escalado, escalado]);
    
        this.dibujarEscena();
      }
      requestAnimationFrame(render);
    }
    
    render();
  }

  resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true; //Tamaño ajustado
    }
    return false; //Tamaño no ajustado
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
    //console.log('Nodo creado: ', nodo)

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
    //console.log('camara creada: ', camara)

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
    //console.log('luz creada: ', luz)

    return luz;
  } 

  async crearModelo(padre: TNodo | null, fichero: string, trasl: vec3, rot: vec3, esc: vec3): Promise<TNodo> {
    const recurso =  await this.gestorRecursos.getRecurso(fichero, 'malla') as TRecursoMalla;
    //recurso.setNombre(fichero);
    
    const modelo = new TNodo(recurso, padre);

    modelo.setTraslacion(trasl);
    modelo.setRotacion(rot);
    modelo.setEscalado(esc);

    modelo.setActualizarMatriz(true);

    if(padre != null){
      padre.addHijo(modelo);
    }

    this.modelos.push(modelo);
    //console.log('modelo creado: ', modelo)

    return modelo;
  }

  async dibujarEscena() {
    this.gl = await this.initWebGL(this.canvas);
    //this.checkWebGLError();
    //console.log(this.escena.getHijos());
    await this.escena.recorrer(mat4.create());
  }

  registrarCamara(nodoCam: TNodo) {
    this.registroCamaras.push(nodoCam);
    //console.log('camara registrada: ', this.registroCamaras)
    return this.registroCamaras.length - 1;
  }

  getCamaraActiva() {
    return this.registroCamaras[this.camaraActiva];
  }

  setCamaraActiva(numCam: number) {
    //console.log('activamos camara: ', numCam)
    this.camaraActiva = numCam;
  }

  registrarLuz(nodoLuz: TNodo) {
    this.registroLuces.push(nodoLuz);
  }

  setLuzActiva(numLuz: number, activa: boolean) {
    this.lucesActivas[numLuz] = activa;
  }

  pasarLuzGL(matrizLuz: mat4) {
    if(this.program && this.gl){
      let u_LuzMatrix = this.gl.getUniformLocation(this.program, 'u_LuzMatrix');

      if (u_LuzMatrix !== null) {
        this.gl.uniformMatrix4fv(u_LuzMatrix, false, new Float32Array(matrizLuz));
      }
    }
  }

  pasarVistaGL(matrizVista: mat4) {
    if(this.program && this.gl){
      let u_ViewMatrix = this.gl.getUniformLocation(this.program, 'u_ViewMatrix');

  if (u_ViewMatrix !== null) {
    this.gl.uniformMatrix4fv(u_ViewMatrix, false, new Float32Array(matrizVista));
  }
    }
  }

  private initWebGL(canvas: HTMLCanvasElement): any{
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

    //console.log('Se ha dibujado el canvas');

    return gl;
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

  mouseDown(event: MouseEvent){
    event.preventDefault();

    if(event.button == 0){
      clickIzq = true;
      this.cuboNecesitaActualizar = true
      old_x = event.pageX;
      old_y = event.pageY;
    }

    // if(event.button == 2){
    //   clickDcho = true;
    //   old_xRight = event.pageX;
    //   old_yRight = event.pageY;
    // }
  }

  mouseUp(event: MouseEvent){
    event.preventDefault();

    if(event.button == 0){
      clickIzq = false;
      this.cuboNecesitaActualizar = false; // Resetear la bandera
    }
    // if(event.button == 2){
    //   clickDcho = false;
    // }
  }

  mouseMove(event: MouseEvent){
    event.preventDefault();
    //Rotar
    let velocidadRotacion = 30;
    if(clickIzq){
      dx = (event.pageX - old_x) * 2 * Math.PI / this.width * velocidadRotacion;
      dy = (event.pageY - old_y) * 2 * Math.PI / this.height * velocidadRotacion;
      theta += dx;
      phi += dy;
      old_x = event.pageX;
      old_y = event.pageY;
    }

    //Mover
    // if(clickDcho){
    //   dxRight = (event.pageX - old_xRight) * 5 / this.width;
    //   dyRight = (event.pageY - old_yRight) * 5 / this.height;
    //   trasX += dxRight;
    //   trasY += -dyRight;
    //   old_xRight = event.pageX;
    //   old_yRight = event.pageY;
    // }
  }

  zoom(event: WheelEvent){
    event.preventDefault();

    if(event.deltaY < 0){
      escalado += 0.25;
    } else {
      escalado -= 0.25;
    }

    escalado = Math.min(Math.max(0.25, escalado), 4);
  }

  rayPicking(event: MouseEvent) {
    let caras = [{ vertices: [vec3.fromValues(-1, -1, 1), vec3.fromValues(-1, 1, 1), vec3.fromValues(1, 1, 1), vec3.fromValues(1, -1, 1)], nombre: "Delantera" },{ vertices: [vec3.fromValues(1, -1, -1), vec3.fromValues(1, 1, -1), vec3.fromValues(-1, 1, -1), vec3.fromValues(-1, -1, -1)], nombre: "Trasera" },{ vertices: [vec3.fromValues(-1, 1, -1), vec3.fromValues(-1, 1, 1), vec3.fromValues(1, 1, 1), vec3.fromValues(1, 1, -1)], nombre: "Superior" },{ vertices: [vec3.fromValues(-1, -1, -1), vec3.fromValues(1, -1, -1), vec3.fromValues(1, -1, 1), vec3.fromValues(-1, -1, 1)], nombre: "Inferior" },{ vertices: [vec3.fromValues(1, -1, -1), vec3.fromValues(1, -1, 1), vec3.fromValues(1, 1, 1), vec3.fromValues(1, 1, -1)], nombre: "Derecha" },{ vertices: [vec3.fromValues(-1, -1, 1), vec3.fromValues(-1, -1, -1), vec3.fromValues(-1, 1, -1), vec3.fromValues(-1, 1, 1)], nombre: "Izquierda" }];
    // Paso 1: Calcular el rayo de picking
    let rect = this.canvas.getBoundingClientRect();
    // Coordenadas normalizadas del click del ratón
    let x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
    let y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    // Rayo disparado desde la cámara hacia la escena
    let rayClip = vec3.fromValues(x, y, -1);
    let rayEye = vec3.transformMat4(vec3.create(), rayClip, mat4.invert(mat4.create(), this.camara.getEntidad().getProjMatrix()));
    rayEye[2] = -1;
    rayEye[3] = 0;

    // Rayo en coordenadas de mundo
    let rayWorld = vec3.transformMat4(vec3.create(), rayEye, mat4.invert(mat4.create(), this.camara.getEntidad().getViewMatrix()));
    rayWorld = vec3.normalize(rayWorld, rayWorld);

    // Paso 2: Iterar sobre todos los objetos en la escena
    let intersecciones = [];
    let caraSeleccionada = null;

    // Paso 3: Transformar el rayo al espacio local del objeto
    let matrizTransfInversa = mat4.invert(mat4.create(), this.cubo.getMatrizTransf());
    let localRayOrigin = vec3.transformMat4(vec3.create(), this.camara.getTraslacion(), matrizTransfInversa); // Origen del rayo en espacio local
    let localRayDirection = vec3.transformMat3(vec3.create(), rayWorld, mat3.normalFromMat4(mat3.create(), matrizTransfInversa)); // Dirección del rayo en espacio local
    
    // Paso 4: Realizar la intersección del rayo con el objeto en su espacio local
    for (let cara of caras) {
      let v0 = cara.vertices[0];
      let v1 = cara.vertices[1];
      let v2 = cara.vertices[2];
      let v3 = cara.vertices[3];

      // Comprobar la intersección con los dos triángulos de la cara
      let t1 = this.intersectRayTriangle(localRayOrigin, localRayDirection, v0, v1, v2);
      let t2 = this.intersectRayTriangle(localRayOrigin, localRayDirection, v0, v2, v3);

      if (t1 !== null || t2 !== null) {
          intersecciones.push({ cara: cara.nombre, t: Math.min(t1 ?? Infinity, t2 ?? Infinity) });
      }
    }

    // Si no se encontró ninguna intersección, devolver un mensaje indicando que el click fue fuera del cubo
    if (intersecciones.length === 0) {
        console.log("Click fuera del cubo");
        return;
    }

    // Ordenar las intersecciones por la distancia desde el origen del rayo y seleccionar la más cercana
    intersecciones.sort((a, b) => a.t - b.t);
    caraSeleccionada = intersecciones[0].cara;
    
    console.log("Cara seleccionada: " + caraSeleccionada);
  }

  intersectRayTriangle(rayOrigin: vec3, rayDirection: vec3, v0: vec3, v1: vec3, v2: vec3): number | null {
    // Compute vectors along two edges of the triangle
    let edge1 = vec3.subtract(vec3.create(), v1, v0);
    let edge2 = vec3.subtract(vec3.create(), v2, v0);

    // Compute the determinant
    let pvec = vec3.cross(vec3.create(), rayDirection, edge2);
    let det = vec3.dot(edge1, pvec);

    // If the determinant is near zero, the ray lies in the plane of the triangle
    if (Math.abs(det) < 1e-8) {
      return null;
    }

    let invDet = 1 / det;

    // Compute the u parameter of the intersection point
    let tvec = vec3.subtract(vec3.create(), rayOrigin, v0);
    let u = vec3.dot(tvec, pvec) * invDet;
    if (u < 0 || u > 1) {
      return null;
    }

    // Compute the v parameter of the intersection point
    let qvec = vec3.cross(vec3.create(), tvec, edge1);
    let v = vec3.dot(rayDirection, qvec) * invDet;
    if (v < 0 || u + v > 1) {
      return null;
    }

    // Compute the distance from the ray origin to the intersection point
    let t = vec3.dot(edge2, qvec) * invDet;

    return t;
  }

}