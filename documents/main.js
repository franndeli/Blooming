import { mat4, vec3 } from 'gl-matrix';
import { TNodo } from './nodo';
import { TLuz } from './luz';
import { TCamara } from './camara.';
import { TMalla } from './malla';

function main() {
    // Crear la estructura del árbol
    let nEscena = new TNodo();
    let nLuz = new TNodo();
    let nCam = new TNodo();
    let nGrupoCoche = new TNodo();
    let nChasis = new TNodo();
    let nRueda1 = new TNodo();
    let nRueda2 = new TNodo();
    let nRueda3 = new TNodo();
    let nRueda4 = new TNodo();

    // Añadir nodos hijos
    nEscena.addHijo(nLuz);
    nEscena.addHijo(nCam);
    nEscena.addHijo(nGrupoCoche);
    nGrupoCoche.addHijo(nChasis);
    nGrupoCoche.addHijo(nRueda1);
    nGrupoCoche.addHijo(nRueda2);
    nGrupoCoche.addHijo(nRueda3);
    nGrupoCoche.addHijo(nRueda4);

    // Añadir entidades a los nodos
    let eLuz = new TLuz();
    let eCam = new TCamara();
    let eMallaChasis = new TMalla("RecursoMallaChasis");
    let eMallaRueda1 = new TMalla("RecursoMallaRueda1");
    let eMallaRueda2 = new TMalla("RecursoMallaRueda2");
    let eMallaRueda3 = new TMalla("RecursoMallaRueda3");
    let eMallaRueda4 = new TMalla("RecursoMallaRueda4");

    nLuz.setEntidad(eLuz);
    nCam.setEntidad(eCam);
    nChasis.setEntidad(eMallaChasis);
    nRueda1.setEntidad(eMallaRueda1);
    nRueda1.setEntidad(eMallaRueda2);
    nRueda1.setEntidad(eMallaRueda3);
    nRueda4.setEntidad(eMallaRueda4);

    // Aplicar transformaciones a nodos
    nLuz.setTraslacion(vec3.fromValues(0, 100, 0));
    nCam.setRotacion(vec3.fromValues(10, 0, 0));
    nCam.trasladar(vec3.fromValues(0, 0, 200));
    nGrupoCoche.setEscalado(vec3.fromValues(2, 2, 2));

    // Recorrer el árbol (dibujarlo)
    nEscena.recorrer(mat4.create());
}

main();