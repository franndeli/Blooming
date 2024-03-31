precision mediump float;

attribute vec2 vertPosition;
attribute vec3 vertColor;

varying vec3 fragColor;

void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}

//precision mediump float;

// attribute vec3 aVertexPosition;
// attribute vec3 aVertexNormal;

// uniform mat4 uModelViewMatrix;
// uniform mat4 uProjectionMatrix;
// uniform mat3 uNormalMatrix;
// uniform vec3 uLightPosition;

// varying vec3 vNormal;
// varying vec3 vLightDirection;
// varying vec3 vEyeVec;

// void main(void) {
//   vec4 vertexPositionEye4 = uModelViewMatrix * vec4(aVertexPosition, 1.0);
//   vec3 vertexPositionEye3 = vertexPositionEye4.xyz / vertexPositionEye4.w;
//   vNormal = normalize(uNormalMatrix * aVertexNormal);
//   vLightDirection = normalize(uLightPosition - vertexPositionEye3);
//   vEyeVec = -vertexPositionEye3;

//   gl_Position = uProjectionMatrix * vertexPositionEye4;
// }