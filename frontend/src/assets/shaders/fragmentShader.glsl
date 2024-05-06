precision mediump float;

varying vec4 fragColor;
varying vec2 fragTexCoord;

uniform sampler2D sampler;

uniform bool applyTexture;

uniform bool isSelected;

//uniform int applyTexture[6];

void main(){
    vec4 colorOutput = fragColor;

    if (applyTexture) {
        colorOutput = texture2D(sampler, fragTexCoord);
    } 
    if (isSelected) {
        colorOutput *= vec4(1.2, 1.2, 1.2, 1.0); // Aumentar brillo por ejemplo
    }
    gl_FragColor = colorOutput;
}