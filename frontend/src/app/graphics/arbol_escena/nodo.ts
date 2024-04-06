import { mat4, vec3 } from 'gl-matrix';

export class TNodo {
    private entidad: any;
    public hijos: TNodo[];
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

    setEntidad(entidad: any): void {
        this.entidad = entidad;
    }

    getEntidad(): any {
        return this.entidad;
    }

    getPadre(): TNodo | null {
        return this.padre;
    }

    recorrer(matrizPadre: mat4): void {
        console.log('Recorriendo nodo con id: ', this.id);
        let matrizLocal = mat4.clone(matrizPadre);
        console.log('Matriz padre/local: ', matrizPadre);
        console.log('Matriz sin actualizar: ', this.matrizTransf);
        if(this.actualizarMatriz) {
            //this.actualizarMatriz = false;
            console.log('Actualizando matriz');
            let matrizTrans = mat4.create();
            let matrizRot = mat4.create();
            let matrizEsc = mat4.create();

            mat4.translate(matrizTrans, matrizTrans, this.traslacion);
            mat4.rotateX(matrizRot, matrizRot, this.radianes(this.rotacion[0]));
            mat4.rotateY(matrizRot, matrizRot, this.radianes(this.rotacion[1]));
            mat4.rotateZ(matrizRot, matrizRot, this.radianes(this.rotacion[2]));
            mat4.scale(matrizEsc, matrizEsc, this.escalado);

            mat4.multiply(matrizLocal, matrizLocal, matrizTrans);
            mat4.multiply(matrizLocal, matrizLocal, matrizRot);
            mat4.multiply(matrizLocal, matrizLocal, matrizEsc);
            
            this.setMatrizTransf(matrizLocal);
            console.log('Matriz actualizada: ', this.matrizTransf);

            if(this.entidad != null) {
                console.log('Dibujando entidad: ',this.entidad.constructor.name);
                this.entidad.dibujar(this.matrizTransf);
            }
        }

        this.hijos.forEach(hijo => hijo.recorrer(matrizLocal));
    }

    setTraslacion(traslacion: vec3): void {
        vec3.copy(this.traslacion, traslacion);
    }

    setRotacion(rotacion: vec3): void {
        vec3.copy(this.rotacion, rotacion);
    }

    setEscalado(escalado: vec3): void {
        vec3.copy(this.escalado, escalado);
    }

    trasladar(delta: vec3): void {
        vec3.add(this.traslacion, this.traslacion, delta);
    }

    rotar(angulo: vec3): void {
        vec3.add(this.rotacion, this.rotacion, angulo);
    }

    escalar(factor: vec3): void {
        vec3.multiply(this.escalado, this.escalado, factor);
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

    getMatrizTransf(): mat4 {
        return this.matrizTransf;
    }

    setMatrizTransf(matriz: mat4): void {
        mat4.copy(this.matrizTransf, matriz);
    }

    setActualizarMatriz(actualizar: boolean): void {
        console.log('Actualizar matriz? ', actualizar);
        console.log(this)
        this.actualizarMatriz = actualizar;
    }

    private radianes(grados: number): number {
        return grados * Math.PI / 180;
    }
}
