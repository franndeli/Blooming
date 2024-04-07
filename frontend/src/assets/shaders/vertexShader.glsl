precision mediump float;

attribute vec3 vertNormal;
attribute vec3 vertPosition;

uniform mat4 u_NormalMatrix;
uniform mat4 u_ModelViewMatrix;
uniform mat4 u_ProjectionMatrix;

varying vec3 fragNormal;

void main() {
    fragNormal = normalize(vec3(u_NormalMatrix * vec4(vertNormal, 0.0)));
    gl_Position = vec4(vertPosition, 1.0);
}