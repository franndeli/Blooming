precision mediump float;

attribute vec3 vertColor;
attribute vec3 vertNormal;
attribute vec3 vertPosition;

uniform mat4 u_NormalMatrix;
uniform mat4 u_ModelViewMatrix;
uniform mat4 u_ProjectionMatrix;

varying vec3 fragColor;
varying vec3 fragNormal;
varying vec3 fragPosition;

void main() {
    fragColor = vertColor;
    fragPosition = vec3(u_ModelViewMatrix * vec4(vertPosition, 1.0));
    fragNormal = normalize(vec3(u_NormalMatrix * vec4(vertNormal, 0.0)));
    gl_Position = u_ProjectionMatrix * u_ModelViewMatrix * vec4(vertPosition, 1.0);
}