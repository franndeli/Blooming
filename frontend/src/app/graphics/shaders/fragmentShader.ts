export default `precision mediump float;

varying vec3 fragColor;

void main(){
    gl_FragColor = vec4(fragColor, 1.0);
}`

// export default `
// precision mediump float;

// uniform mat4 u_TransformMatrix;
// varying vec3 fragColor;

// void main(){
//     gl_FragColor = vec4(fragColor, 1.0);
// }
// `;