precision mediump float;

attribute vec3 vertNormal;
attribute vec3 vertPosition;

uniform vec4 u_Color;

//Prueba texturas
attribute vec2 vertTexCoord;
varying vec2 fragTexCoord;


uniform mat4 u_ModelViewMatrix;
uniform mat4 u_ProjectionMatrix;

varying vec3 fragNormal;
varying vec4 fragColor;
varying vec3 fragPosition;

void main() {
    gl_Position = u_ProjectionMatrix * u_ModelViewMatrix * vec4(vertPosition, 1.0);

    // Pruebas texturas
    fragTexCoord = vertTexCoord;
    
    fragColor = u_Color;

    fragNormal = vertNormal; 
    fragPosition = vec3(u_ModelViewMatrix * vec4(vertPosition, 1.0));
}