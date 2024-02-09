import { mat4, vec3 } from 'gl-matrix';

export class TNodo {
    constructor(entidad = null, padre = null) {
        this.entidad = entidad;
        this.hijos = [];
        this.padre = padre;
        this.traslacion = vec3.create();
        this.rotacion = vec3.create();
        this.escalado = vec3.fromValues(1, 1, 1); //Por defecto a 1,1,1
        this.matrizTransf = mat4.create();
    }

    // Añadir un hijo al nodo actual
    addHijo(hijo) {
        hijo.padre = this;
        this.hijos.push(hijo);
        return this.hijos.length;
    }

    // Eliminar un hijo del nodo actual
    removeHijo(hijo) {
        const index = this.hijos.indexOf(hijo);
        if (index !== -1) {
            hijo.padre = null;
            this.hijos.splice(index, 1);
            return true;
        }
        return false;
    }

    setEntidad(entidad) {
        this.entidad = entidad;
    }

    getEntidad() {
        return this.entidad;
    }

    getPadre() {
        return this.padre;
    }

    recorrer(matrizPadre) {
        let matrizLocal = mat4.clone(matrizPadre);
        mat4.translate(matrizLocal, matrizLocal, this.traslacion);
        mat4.rotateX(matrizLocal, matrizLocal, this.rotacion[0]);
        mat4.rotateY(matrizLocal, matrizLocal, this.rotacion[1]);
        mat4.rotateZ(matrizLocal, matrizLocal, this.rotacion[2]);
        mat4.scale(matrizLocal, matrizLocal, this.escalado);

        //Creo que aquí hay que dibujar pero eso ya no sé cómo
        
        this.hijos.forEach(hijo => hijo.recorrer(matrizLocal));
    }

    setTraslacion(traslacion) {
        vec3.copy(this.traslacion, traslacion);
    }

    setRotacion(rotacion) {
        vec3.copy(this.rotacion, rotacion);
    }

    setEscalado(escalado) {
        vec3.copy(this.escalado, escalado);
    }

    trasladar(delta) {
        vec3.add(this.traslacion, this.traslacion, delta);
    }

    rotar(angulo) {
        vec3.add(this.rotacion, this.rotacion, angulo);
    }

    escalar(factor) {
        vec3.multiply(this.escalado, this.escalado, factor);
    }

    getTraslacion() {
        return this.traslacion;
    }

    getRotacion() {
        return this.rotacion;
    }

    getEscalado() {
        return this.escalado;
    }

    setMatrizTransf(matriz) {
        mat4.copy(this.matrizTransf, matriz);
    }

    getMatrizTransf() {
        return this.matrizTransf;
    }

}
