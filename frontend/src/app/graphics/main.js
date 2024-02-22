"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodo_1 = require("./nodo");
var camara_1 = require("./camara");
var luz_1 = require("./luz");
var malla_1 = require("./malla");
var gl_matrix_1 = require("gl-matrix");
// Función para imprimir la matriz de transformación
function imprimirMatrizTransformacion(nodo, nombre) {
    console.log("Matriz de transformaci\u00F3n de ".concat(nombre, ":"), nodo.getMatrizTransf());
}
// Crear el nodo raíz del árbol de la escena
var raiz = new nodo_1.TNodo();
// 1. Prueba de Profundidad del Árbol
// Crear una cámara y añadirla a la escena
var camara = new camara_1.TCamara();
var nodoCamara = new nodo_1.TNodo(camara);
console.log("Se ha añadido una camara, longitud actual del array de hijos: ", raiz.addHijo(nodoCamara));
// Crear una luz y añadirla a la escena
var luz = new luz_1.TLuz(gl_matrix_1.vec3.fromValues(1, 1, 1)); // Luz blanca
var nodoLuz = new nodo_1.TNodo(luz);
console.log("Se ha añadido una luz, longitud actual del array de hijos: ", raiz.addHijo(nodoLuz));
// Crear una malla y añadirla a la escena
var malla = new malla_1.TMalla("mallaEjemplo"); // Supongamos que este es el identificador de la malla
var nodoMalla = new nodo_1.TNodo(malla);
console.log("Se ha añadido una malla, longitud actual del array de hijos: ", raiz.addHijo(nodoMalla));
// Añadir un nodo hijo a nodoMalla y verificar recorrido
var hijoDeMalla = new malla_1.TMalla("hijoDeMalla");
var nodoHijoDeMalla = new nodo_1.TNodo(hijoDeMalla);
nodoMalla.addHijo(nodoHijoDeMalla);
console.log("El padre de nodoHijoDeMalla es: ", nodoHijoDeMalla.getPadre());
console.log("El nodo malla es: ", nodoMalla.getEntidad());
console.log("El nodo luz es: ", nodoLuz.getEntidad());
console.log("El nodo Camara es: ", nodoCamara.getEntidad());
// 2. Prueba de Transformaciones Compuestas
// Aplicar transformaciones a la cámara
nodoCamara.setTraslacion(gl_matrix_1.vec3.fromValues(0, 0, 5));
nodoCamara.setRotacion(gl_matrix_1.vec3.fromValues(0, 0, 0));
nodoCamara.setEscalado(gl_matrix_1.vec3.fromValues(1, 1, 1));
// Aplicar transformaciones a la luz
nodoLuz.setTraslacion(gl_matrix_1.vec3.fromValues(2, 2, 0));
nodoLuz.setRotacion(gl_matrix_1.vec3.fromValues(0, 0, 0));
nodoLuz.setEscalado(gl_matrix_1.vec3.fromValues(1, 1, 1));
// Aplicar transformaciones a la malla
nodoMalla.setTraslacion(gl_matrix_1.vec3.fromValues(-2, 0, 0));
nodoMalla.setRotacion(gl_matrix_1.vec3.fromValues(0, 0, 0));
nodoMalla.setEscalado(gl_matrix_1.vec3.fromValues(1, 1, 1));
nodoHijoDeMalla.setTraslacion(gl_matrix_1.vec3.fromValues(1, 0, 0));
nodoLuz.setEscalado(gl_matrix_1.vec3.fromValues(1, 2, 1));
nodoCamara.setRotacion(gl_matrix_1.vec3.fromValues(Math.PI / 4, Math.PI / 4, 0)); // Rotación en X y Y
// Recorrer el árbol y dibujar cada nodo
var matrizInicial = gl_matrix_1.mat4.create(); // Matriz identidad
raiz.recorrer(matrizInicial);
// Verificar la matriz de transformación de cada nodo
// Imprimir matrices de transformación después del primer recorrido
imprimirMatrizTransformacion(nodoCamara, "cámara");
imprimirMatrizTransformacion(nodoLuz, "luz");
imprimirMatrizTransformacion(nodoMalla, "malla");
imprimirMatrizTransformacion(nodoHijoDeMalla, "hijo de malla");
nodoCamara.setTraslacion(gl_matrix_1.vec3.fromValues(0, 2, 5));
raiz.recorrer(matrizInicial);
console.log("Después de actualizar transformaciones:");
imprimirMatrizTransformacion(nodoCamara, "cámara actualizada");
