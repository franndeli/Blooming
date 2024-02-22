"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TNodo = void 0;
var gl_matrix_1 = require("gl-matrix");
var TNodo = /** @class */ (function () {
    function TNodo(entidad, padre) {
        if (entidad === void 0) { entidad = null; }
        if (padre === void 0) { padre = null; }
        this.entidad = entidad;
        this.hijos = [];
        this.padre = padre;
        this.traslacion = gl_matrix_1.vec3.create();
        this.rotacion = gl_matrix_1.vec3.create();
        this.escalado = gl_matrix_1.vec3.fromValues(1, 1, 1); // Por defecto a 1,1,1
        this.matrizTransf = gl_matrix_1.mat4.create();
    }
    TNodo.prototype.addHijo = function (hijo) {
        hijo.padre = this;
        this.hijos.push(hijo);
        return this.hijos.length;
    };
    TNodo.prototype.removeHijo = function (hijo) {
        var index = this.hijos.indexOf(hijo);
        if (index !== -1) {
            hijo.padre = null;
            this.hijos.splice(index, 1);
            return true;
        }
        return false;
    };
    TNodo.prototype.setEntidad = function (entidad) {
        this.entidad = entidad;
    };
    TNodo.prototype.getEntidad = function () {
        return this.entidad;
    };
    TNodo.prototype.getPadre = function () {
        return this.padre;
    };
    TNodo.prototype.recorrer = function (matrizPadre) {
        var matrizLocal = gl_matrix_1.mat4.clone(matrizPadre);
        gl_matrix_1.mat4.translate(matrizLocal, matrizLocal, this.traslacion);
        gl_matrix_1.mat4.rotateX(matrizLocal, matrizLocal, this.rotacion[0]);
        gl_matrix_1.mat4.rotateY(matrizLocal, matrizLocal, this.rotacion[1]);
        gl_matrix_1.mat4.rotateZ(matrizLocal, matrizLocal, this.rotacion[2]);
        gl_matrix_1.mat4.scale(matrizLocal, matrizLocal, this.escalado);
        gl_matrix_1.mat4.copy(this.matrizTransf, matrizLocal);
        this.hijos.forEach(function (hijo) { return hijo.recorrer(matrizLocal); });
    };
    TNodo.prototype.setTraslacion = function (traslacion) {
        gl_matrix_1.vec3.copy(this.traslacion, traslacion);
    };
    TNodo.prototype.setRotacion = function (rotacion) {
        gl_matrix_1.vec3.copy(this.rotacion, rotacion);
    };
    TNodo.prototype.setEscalado = function (escalado) {
        gl_matrix_1.vec3.copy(this.escalado, escalado);
    };
    TNodo.prototype.trasladar = function (delta) {
        gl_matrix_1.vec3.add(this.traslacion, this.traslacion, delta);
    };
    TNodo.prototype.rotar = function (angulo) {
        gl_matrix_1.vec3.add(this.rotacion, this.rotacion, angulo);
    };
    TNodo.prototype.escalar = function (factor) {
        gl_matrix_1.vec3.multiply(this.escalado, this.escalado, factor);
    };
    TNodo.prototype.getTraslacion = function () {
        return this.traslacion;
    };
    TNodo.prototype.getRotacion = function () {
        return this.rotacion;
    };
    TNodo.prototype.getEscalado = function () {
        return this.escalado;
    };
    TNodo.prototype.setMatrizTransf = function (matriz) {
        gl_matrix_1.mat4.copy(this.matrizTransf, matriz);
    };
    TNodo.prototype.getMatrizTransf = function () {
        return this.matrizTransf;
    };
    return TNodo;
}());
exports.TNodo = TNodo;
