precision mediump float;

attribute vec3 vertNormal;
attribute vec3 vertPosition;
attribute vec4 vertColor;

//Prueba texturas
attribute vec2 vertTextCoord;
varying vec2 fragTextCoord;

uniform mat4 u_ModelViewMatrix;
uniform mat4 u_ProjectionMatrix;

varying vec3 fragNormal;
varying vec4 fragColor;

void main() {
    gl_Position = u_ProjectionMatrix * u_ModelViewMatrix * vec4(vertPosition, 1.0);

    //Pruba texturas
    fragTextCoord = vertTextCoord;

    fragColor = vertColor;
    fragNormal = vertNormal; 
}