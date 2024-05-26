import { mat4, vec3 } from 'gl-matrix';
import { TEntidad } from './entidad';

export class TLuz extends TEntidad {
    private intensidadAmbiental: vec3;
    private intensidadDifusa: vec3;
    private intensidadEspecular: vec3;
    private posicion: vec3;
    private gl: WebGL2RenderingContext;

    constructor(intensidadAmbiental: vec3 = vec3.fromValues(0.65, 0.65, 0.65), 
                intensidadDifusa: vec3 = vec3.fromValues(0.7, 0.7, 0.7), 
                intensidadEspecular: vec3 = vec3.fromValues(0.4, 0.4, 0.4),
                posicion: vec3 = vec3.fromValues(0, 10, -15)) {
        super(); // Llama al constructor de la clase base TEntidad
        this.intensidadAmbiental = intensidadAmbiental;
        this.intensidadDifusa = intensidadDifusa;
        this.intensidadEspecular = intensidadEspecular;
        this.posicion = posicion;
        //console.log('Intensidad de la luz:', this.intensidadAmbiental, this.intensidadDifusa, this.intensidadEspecular);
        var canvas = <HTMLCanvasElement>document.getElementById('canvasWebGL');
        var context = canvas.getContext('webgl2');
        if (context === null) {
            throw new Error('Unable to get WebGL2 context');
        }
        this.gl = context;
    }

    setIntensidadAmbiental(intensidad: vec3): void {
        this.intensidadAmbiental = intensidad;
    }

    setIntensidadDifusa(intensidad: vec3): void {
        this.intensidadDifusa = intensidad;
    }

    setIntensidadEspecular(intensidad: vec3): void {
        this.intensidadEspecular = intensidad;
    }

    getIntensidadAmbiental(): vec3 {
        return this.intensidadAmbiental;
    }

    getIntensidadDifusa(): vec3 {
        return this.intensidadDifusa;
    }

    getIntensidadEspecular(): vec3 {
        return this.intensidadEspecular;
    }

    setPosicion(posicion: vec3): void {
        this.posicion = posicion;
    }

    getPosicion(): vec3 {
        return this.posicion;
    }

    override dibujar(matrizTransf: mat4): void {
        // console.log('Dibujando luz con intensidad', this.intensidadAmbiental, this.intensidadDifusa, this.intensidadEspecular);
        
        // Obtén el programa actual (deberías tener una referencia a él desde antes)
        let currentProgram = this.gl.getParameter(this.gl.CURRENT_PROGRAM);
        
        // Asegúrate de que el programa es válido
        if (!currentProgram) {
            console.error("No hay un programa WebGL válido.");
            return;
        }

        this.gl.useProgram(currentProgram);
        
        const ambientLightUniformLocation = this.gl.getUniformLocation(currentProgram, 'ambientLightIntensity');
        const diffuseLightUniformLocation = this.gl.getUniformLocation(currentProgram, 'diffuseLightIntensity');
        const specularLightUniformLocation = this.gl.getUniformLocation(currentProgram, 'specularLightIntensity');
        const lightPositionUniformLocation = this.gl.getUniformLocation(currentProgram, 'lightPosition');
        
        this.gl.uniform3fv(ambientLightUniformLocation, this.intensidadAmbiental);
        this.gl.uniform3fv(diffuseLightUniformLocation, this.intensidadDifusa);
        this.gl.uniform3fv(specularLightUniformLocation, this.intensidadEspecular);
        this.gl.uniform3fv(lightPositionUniformLocation, this.posicion);

        // console.log('Luz dibujada con intensidad', this.intensidadAmbiental, this.intensidadDifusa, this.intensidadEspecular);
    }
}
