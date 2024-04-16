precision mediump float;

varying vec4 fragColor; // Añade esta línea

void main(){
    gl_FragColor = fragColor; // Cambia esta línea
}