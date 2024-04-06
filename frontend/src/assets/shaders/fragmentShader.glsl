precision mediump float;
varying vec3 fragColor;
void main(){
    gl_FragColor = vec4(fragColor, 1.0);
}
// #version 300 es
// precision mediump float;
// in vec3 fragColor;
// in vec3 fragNormal;
// in vec2 fragTexCoord;
// out vec4 outputColor;
// void main(){
//     vec3 normal = normalize(fragNormal);
//     outputColor = vec4(fragColor, 1.0);
// }