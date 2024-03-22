import { mat4, vec3 } from 'gl-matrix';

export class TNodo {
    public entidad: any; // Considera definir un tipo más específico si es posible
    public hijos: TNodo[];
    public padre: TNodo | null;
    public traslacion: vec3;
    public rotacion: vec3;
    public escalado: vec3;
    public matrizTransf: mat4;
    public actualizarMatriz: boolean = false;

    constructor(entidad: any = null, padre: TNodo | null = null) {
        this.entidad = entidad;
        this.hijos = [];
        this.padre = padre;
        this.traslacion = vec3.create();
        this.rotacion = vec3.create();
        this.escalado = vec3.fromValues(1, 1, 1); // Por defecto a 1,1,1
        this.matrizTransf = mat4.create();
    }

    addHijo(hijo: TNodo): number {
        hijo.padre = this;
        this.hijos.push(hijo);
        return this.hijos.length;
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

    getEntidad(): any { // Considera definir un tipo más específico
        return this.entidad;
    }

    getPadre(): TNodo | null {
        return this.padre;
    }

    recorrer(matrizPadre: mat4): void {
        console.log('entramosss')
        let matrizLocal = mat4.clone(matrizPadre);
        console.log(this.actualizarMatriz)
        if(this.actualizarMatriz) {
            console.log('actualizamos matriz')
            let matrizTrans = mat4.create();
            let matrizRot = mat4.create();
            let matrizEsc = mat4.create();

            mat4.translate(matrizTrans, matrizTrans, this.traslacion);
            mat4.rotateX(matrizRot, matrizRot, this.rotacion[0]);
            mat4.rotateY(matrizRot, matrizRot, this.rotacion[1]);
            mat4.rotateZ(matrizRot, matrizRot, this.rotacion[2]);
            mat4.scale(matrizEsc, matrizEsc, this.escalado);

            mat4.multiply(matrizLocal, matrizLocal, matrizTrans);
            mat4.multiply(matrizLocal, matrizLocal, matrizRot);
            mat4.multiply(matrizLocal, matrizLocal, matrizEsc);

            this.setMatrizTransf(matrizLocal);
        }

        // if(this.entidad && typeof this.entidad.dibujar === 'function') {
        //     this.entidad.dibujar(this.matrizTransf);
        //     console.log('Dibujando entidad');
        // }

        this.hijos.forEach(hijo => hijo.recorrer(matrizLocal));
        // let matrizLocal = mat4.clone(matrizPadre);
        // mat4.translate(matrizLocal, matrizLocal, this.traslacion);
        // mat4.rotateX(matrizLocal, matrizLocal, this.rotacion[0]);
        // mat4.rotateY(matrizLocal, matrizLocal, this.rotacion[1]);
        // mat4.rotateZ(matrizLocal, matrizLocal, this.rotacion[2]);
        // mat4.scale(matrizLocal, matrizLocal, this.escalado);

        // // mat4.copy(this.matrizTransf, matrizLocal);
        // if(this.actualizarMatriz) {
        //     this.setMatrizTransf(matrizLocal);
        // }

        // this.hijos.forEach(hijo => hijo.recorrer(matrizLocal));
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

    setMatrizTransf(matriz: mat4): void {
        mat4.copy(this.matrizTransf, matriz);
    }

    getMatrizTransf(): mat4 {
        return this.matrizTransf;
    }
}
