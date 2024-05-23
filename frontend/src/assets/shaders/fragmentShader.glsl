precision mediump float;

varying vec4 fragColor;
varying vec2 fragTexCoord;
varying vec3 fragNormal;
varying vec3 fragPosition;

uniform sampler2D sampler;
uniform bool applyTexture;
uniform bool isSelected;

uniform vec3 ambientLightIntensity;
uniform vec3 diffuseLightIntensity;
uniform vec3 specularLightIntensity;
uniform vec3 lightPosition;

void main(){
    vec4 colorOutput = fragColor;

    if (applyTexture) {
        colorOutput = texture2D(sampler, fragTexCoord);
    } 

    vec3 normal = normalize(fragNormal);
    vec3 lightDir = normalize(lightPosition - fragPosition);

    // Luz ambiental
    vec3 ambient = ambientLightIntensity * colorOutput.rgb;

    // Luz difusa
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * diffuseLightIntensity * colorOutput.rgb;

    // Luz especular
    vec3 viewDir = normalize(-fragPosition); // Asumimos que la cámara está en el origen
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0); // Brillo especular (brillo de 32)
    vec3 specular = spec * specularLightIntensity;

    // Ajustar el color final
    vec3 finalColor = ambient + diffuse + specular; // Con especular
    // vec3 finalColor = ambient + diffuse; // Sin especular

    if (isSelected) {
        // Iluminar el color de salida aumentando la luminosidad
        vec4 greenLight = vec4(0.0, 1.0, 0.0, 1.0); // RGB verde con alfa completo
        // Aumentar la luminosidad con una mezcla hacia el verde
        float blendFactor = 0.3; // Controla cuánto verde se añade
        finalColor = mix(finalColor, greenLight.rgb, blendFactor);
    }

    gl_FragColor = vec4(finalColor, colorOutput.a);
}
