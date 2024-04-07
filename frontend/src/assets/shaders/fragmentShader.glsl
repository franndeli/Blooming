precision mediump float;

varying vec3 fragColor;
varying vec3 fragNormal;

void main(){
    gl_FragColor = vec4(fragColor, 1.0);
}