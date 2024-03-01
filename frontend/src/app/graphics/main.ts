import { TNodo } from './arbol_escena/nodo';
import { TCamara } from './arbol_escena/camara';
import { TLuz } from './arbol_escena/luz';
import { TMalla } from './arbol_escena/malla';
import { vec3, mat4 } from 'gl-matrix';

// Función para imprimir la matriz de transformación
function imprimirMatrizTransformacion(nodo: TNodo, nombre: string) {
    console.log(`Matriz de transformación de ${nombre}:`, nodo.getMatrizTransf());
}

// Crear el nodo raíz del árbol de la escena
const raiz = new TNodo();

// 1. Prueba de Profundidad del Árbol
// Crear una cámara y añadirla a la escena
const camara = new TCamara();
const nodoCamara = new TNodo(camara);
console.log("Se ha añadido una camara, longitud actual del array de hijos: ", raiz.addHijo(nodoCamara));

// Crear una luz y añadirla a la escena
const luz = new TLuz(vec3.fromValues(1, 1, 1)); // Luz blanca
const nodoLuz = new TNodo(luz);
console.log("Se ha añadido una luz, longitud actual del array de hijos: ", raiz.addHijo(nodoLuz));

// Crear una malla y añadirla a la escena
const malla = new TMalla("mallaEjemplo"); // Supongamos que este es el identificador de la malla
const nodoMalla = new TNodo(malla);
console.log("Se ha añadido una malla, longitud actual del array de hijos: ", raiz.addHijo(nodoMalla));

// Añadir un nodo hijo a nodoMalla y verificar recorrido
const hijoDeMalla = new TMalla("hijoDeMalla");
const nodoHijoDeMalla = new TNodo(hijoDeMalla);
nodoMalla.addHijo(nodoHijoDeMalla);

console.log("El padre de nodoHijoDeMalla es: ", nodoHijoDeMalla.getPadre());
console.log("El nodo malla es: ", nodoMalla.getEntidad());
console.log("El nodo luz es: ", nodoLuz.getEntidad());
console.log("El nodo Camara es: ", nodoCamara.getEntidad());

// 2. Prueba de Transformaciones Compuestas
// Aplicar transformaciones a la cámara
nodoCamara.setTraslacion(vec3.fromValues(0, 0, 5));
nodoCamara.setRotacion(vec3.fromValues(0, 0, 0));
nodoCamara.setEscalado(vec3.fromValues(1, 1, 1));

// Aplicar transformaciones a la luz
nodoLuz.setTraslacion(vec3.fromValues(2, 2, 0));
nodoLuz.setRotacion(vec3.fromValues(0, 0, 0));
nodoLuz.setEscalado(vec3.fromValues(1, 1, 1));

// Aplicar transformaciones a la malla
nodoMalla.setTraslacion(vec3.fromValues(-2, 0, 0));
nodoMalla.setRotacion(vec3.fromValues(0, 0, 0));
nodoMalla.setEscalado(vec3.fromValues(1, 1, 1));

nodoHijoDeMalla.setTraslacion(vec3.fromValues(1, 0, 0));
nodoLuz.setEscalado(vec3.fromValues(1, 2, 1));
nodoCamara.setRotacion(vec3.fromValues(Math.PI / 4, Math.PI / 4, 0)); // Rotación en X y Y

// Recorrer el árbol y dibujar cada nodo
const matrizInicial = mat4.create(); // Matriz identidad
raiz.recorrer(matrizInicial);

// Verificar la matriz de transformación de cada nodo
// Imprimir matrices de transformación después del primer recorrido
imprimirMatrizTransformacion(nodoCamara, "cámara");
imprimirMatrizTransformacion(nodoLuz, "luz");
imprimirMatrizTransformacion(nodoMalla, "malla");
imprimirMatrizTransformacion(nodoHijoDeMalla, "hijo de malla");

nodoCamara.setTraslacion(vec3.fromValues(0, 2, 5));
raiz.recorrer(matrizInicial);

console.log("Después de actualizar transformaciones:");
imprimirMatrizTransformacion(nodoCamara, "cámara actualizada");