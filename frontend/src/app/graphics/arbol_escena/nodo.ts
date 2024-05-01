import { mat4, vec3 } from 'gl-matrix';

export class TNodo {
    private entidad: any;
    private hijos: TNodo[];
    private rotacion: vec3;
    private escalado: vec3;
    private traslacion: vec3;
    private matrizTransf: mat4;
    private padre: TNodo | null;
    private actualizarMatriz: boolean;

    private static nextId = 1;
    public id: number;

    constructor(entidad: any = null, padre: TNodo | null = null) {
        this.entidad = entidad;
        this.hijos = [];
        this.padre = padre;
        this.traslacion = vec3.create();
        this.rotacion = vec3.create();
        this.escalado = vec3.fromValues(1, 1, 1);
        this.matrizTransf = mat4.create();
        this.actualizarMatriz = false;

        this.id = TNodo.nextId++;
    }

    async recorrer(matrizPadre: mat4): Promise<void> {
        if(this.actualizarMatriz) {
            this.actualizarMatriz = false;
            mat4.multiply(this.matrizTransf, matrizPadre, await this.calcularMatriz());
        }

        if(this.entidad != null) {
            //console.log('Dibujando entidad: ',this.entidad.getNombre());
            this.entidad.dibujar(this.matrizTransf);
        }    

        for (const hijo of this.hijos) {
            await hijo.recorrer(this.matrizTransf);
        }
    }

    async calcularMatriz(){
        let matrizAux = mat4.create();

        mat4.translate(matrizAux, matrizAux, this.traslacion);
        mat4.rotateX(matrizAux, matrizAux, this.radianes(this.rotacion[0]));
        mat4.rotateY(matrizAux, matrizAux, this.radianes(this.rotacion[1]));
        mat4.rotateZ(matrizAux, matrizAux, this.radianes(this.rotacion[2]));
        mat4.scale(matrizAux, matrizAux, this.escalado);

        return matrizAux;
    }

    trasladar(delta: vec3): void {
        this.actualizarMatrizHijos();
        vec3.add(this.traslacion, this.traslacion, delta);
    }

    rotar(angulo: vec3): void {
        this.actualizarMatrizHijos();
        vec3.add(this.rotacion, this.rotacion, angulo);
    }

    escalar(factor: vec3): void {
        this.actualizarMatrizHijos();
        vec3.multiply(this.escalado, this.escalado, factor);
    }

    setTraslacion(traslacion: vec3): void {
        this.actualizarMatrizHijos();
        vec3.copy(this.traslacion, traslacion);
    }

    setRotacion(rotacion: vec3): void {
        this.actualizarMatrizHijos();
        vec3.copy(this.rotacion, rotacion);
    }

    setEscalado(escalado: vec3): void {
        this.actualizarMatrizHijos();
        vec3.copy(this.escalado, escalado);
    }

    getTraslacion(): vec3 {
        return this.traslacion;
    }

    getRotacion(): vec3 {
        return this.rotacion;
    }

    getEscalado(): vec3 {
        return this.escalado;
    }

    setMatrizTransf(matriz: mat4): void {
        mat4.copy(this.matrizTransf, matriz);
    }

    getMatrizTransf(): mat4 {
        return this.matrizTransf;
    }

    setEntidad(entidad: any): void {
        this.entidad = entidad;
    }

    getEntidad(): any {
        return this.entidad;
    }

    getPadre(): TNodo | null {
        return this.padre;
    }

    getHijos(): TNodo[] {
        return this.hijos;
    }

    addHijo(hijo: TNodo) {
        hijo.padre = this;
        this.hijos.push(hijo);
    }

    removeHijo(hijo: TNodo): boolean {
        const index = this.hijos.indexOf(hijo);
        if (index !== -1) {
            hijo.padre = null;
            this.hijos.splice(index, 1);
            return true;
        }
        return false;
    }

    setActualizarMatriz(actualizar: boolean): void {
        this.actualizarMatriz = actualizar;
    }

    private actualizarMatrizHijos(){
        this.actualizarMatriz = true;
        this.hijos.forEach(hijo => hijo.actualizarMatriz = true);
    }

    private radianes(grados: number): number {
        return grados * Math.PI / 180;
    }
}
