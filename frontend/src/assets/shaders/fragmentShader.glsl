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
        // Iluminar el color de salida aumentando la luminosidad
        vec4 greenLight = vec4(0.0, 1.0, 0.0, 1.0); // RGB verde con alfa completo
        // Aumentar la luminosidad con una mezcla hacia el verde
        float blendFactor = 0.3; // Controla cuánto verde se añade
        colorOutput = mix(colorOutput, greenLight, blendFactor);
    }
    gl_FragColor = colorOutput;
}