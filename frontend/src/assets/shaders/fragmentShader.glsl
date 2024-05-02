precision mediump float;

varying vec4 fragColor;
varying vec2 fragTexCoord;

uniform sampler2D sampler;

uniform bool applyTexture;

//uniform int applyTexture[6];

void main(){
    if (applyTexture) {
        gl_FragColor = texture2D(sampler, fragTexCoord); // Usa la textura si applyTexture es true
    } else {
        gl_FragColor = fragColor; // De lo contrario, usa el color de vértice
    }
}