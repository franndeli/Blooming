precision mediump float;
attribute vec3 vertPosition;
attribute vec3 vertColor;
varying vec3 fragColor;
void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 1.0);
}