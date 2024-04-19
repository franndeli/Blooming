precision mediump float;

attribute vec3 vertNormal;
attribute vec3 vertPosition;
attribute vec4 vertColor; // Añade esta línea

uniform mat4 u_ModelViewMatrix;
uniform mat4 u_ProjectionMatrix;

varying vec3 fragNormal;
varying vec4 fragColor; // Añade esta línea

void main() {
    gl_Position = u_ProjectionMatrix * u_ModelViewMatrix * vec4(vertPosition, 1.0);
    fragColor = vertColor; // Añade esta línea
    fragNormal = vertNormal; // Añade esta línea
}