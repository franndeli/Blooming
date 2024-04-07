import { mat4 } from 'gl-matrix';
import { TEntidad } from './entidad';

export class TCamara extends TEntidad {
    
    private lejano!: number;
    private cercano!: number;
    private projMatrix: mat4;
    private viewMatrix: mat4;
    private esPerspectiva: boolean;
    public actualizarCamara: boolean = true;
    public gl: WebGL2RenderingContext;

    constructor() {
        super();
        console.log('Creando cámara...');
        var canvas = <HTMLCanvasElement>document.getElementById('canvasWebGL');
        var context = canvas.getContext('webgl2');
        if (context === null) {
            throw new Error('Unable to get WebGL2 context');
        }
        this.gl = context;
        this.projMatrix = mat4.create();
        this.viewMatrix = mat4.create();
        this.esPerspectiva = true;
        this.setPerspectiva(1, 100, this.gl.canvas.width / this.gl.canvas.height);
    }

    setPerspectiva(cercano: number, lejano: number, aspecto: number): void {
        this.lejano = lejano;
        this.cercano = cercano;
        this.esPerspectiva = true;
        this.actualizarCamara = true;
        mat4.perspective(this.projMatrix, this.radianes(60), aspecto, this.cercano, this.lejano);
    }

    setParalela(cercano: number, lejano: number, aspecto: number): void {
        this.lejano = lejano;
        this.cercano = cercano;
        this.esPerspectiva = false;
        this.actualizarCamara = true;
        mat4.perspective(this.projMatrix, this.radianes(120), aspecto, this.cercano, this.lejano);
    }

    setProjMatrix(angulo: number, aspecto: number, zMin: number, zMax: number): void {
        var angle = Math.tan((angulo*.5)*Math.PI/180);
        this.projMatrix=[
        0.5/angle, 0, 0, 0,
        0, 0.5*aspecto/angle, 0, 0,
        0, 0, -(zMax+zMin)/(zMax-zMin), -1,
        0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
        ];
    }

    setViewMatrix(vista: mat4){
        this.viewMatrix = vista;
    }

    getViewMatrix(): mat4{
        return this.viewMatrix;
    }
    
    getProjMatrix():mat4{
        return this.projMatrix;
    }

    override dibujar(matrizTransf: mat4): void {
        console.log(`Configurando cámara ${this.esPerspectiva ? 'perspectiva' : 'paralela'} con planos ${this.cercano} - ${this.lejano}`);
        
        this.gl.useProgram(this.gl.getParameter(this.gl.CURRENT_PROGRAM));
        console.log(this.gl.getParameter(this.gl.CURRENT_PROGRAM))

        if(this.actualizarCamara){
            if(this.esPerspectiva){
                let viewMatrix = mat4.create();
                mat4.invert(viewMatrix, matrizTransf);
                mat4.mul(this.projMatrix, this.projMatrix, viewMatrix);
            }else{
                mat4.mul(this.projMatrix, this.projMatrix, matrizTransf);
            }
            this.actualizarCamara = false;
        }

        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.gl.getParameter(this.gl.CURRENT_PROGRAM), 'u_ProjectionMatrix'), false, this.projMatrix);
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.gl.getParameter(this.gl.CURRENT_PROGRAM), 'u_ModelViewMatrix'), false, matrizTransf);
    
        this.gl.useProgram(this.gl.getParameter(this.gl.CURRENT_PROGRAM));
    }

    private radianes(grados: number): number {
        return grados * Math.PI / 180;
    }
}
