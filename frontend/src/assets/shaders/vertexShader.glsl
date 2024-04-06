precision mediump float;
attribute vec3 vertPosition;
attribute vec3 vertColor;
varying vec3 fragColor;
void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 1.0);
}
// #version 300 es
// precision mediump float;
// in vec3 vertColor;
// in vec3 vertNormal;
// in vec3 vertPosition;
// in vec2 vertTexCoord;
// uniform mat4 Pmatrix;
// uniform mat4 Vmatrix;
// uniform mat4 Mmatrix;
// out vec3 fragColor;
// out vec3 fragNormal;
// out vec2 fragTexCoord;
// void main() {
//     fragColor = vertColor;
//     fragTexCoord = vertTexCoord;
//     fragNormal = mat3(inverse(transpose(Mmatrix))) * vertNormal;
//     gl_Position = Pmatrix * Vmatrix* Mmatrix * vec4(vertPosition, 1.0);
// }