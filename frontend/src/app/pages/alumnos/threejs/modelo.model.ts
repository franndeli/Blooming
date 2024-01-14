// Modelo.model.ts
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { AnimationMixer, AnimationAction, Group } from 'three';
import { EventDispatcher } from 'three';
export class Modelo {
  avatar: Group;
  mixer: AnimationMixer | undefined;
  action: AnimationAction | undefined;
  //dispatcher: EventDispatcher;

  constructor() {
    this.avatar = new THREE.Group();
    this.mixer = undefined;
    this.action = undefined;
    //this.dispatcher = new EventDispatcher();
    this.loadAvatar();
  }

  private loadAvatar() {
    const loader = new FBXLoader();

    // ruta archivos
    loader.setPath('../assets/images/threejs/');

    loader.load('avatar.fbx', (fbx: Group) => {
      console.log('Modelo cargado:', fbx);

      if (fbx instanceof Group) {
        fbx.scale.setScalar(0.03);
                        //x y z
        fbx.position.set(0, -3.3, 0);

        this.avatar.add(fbx);

        this.loadAnimation('saludo.fbx', fbx);
      } else {
        console.error('El modelo cargado no es una instancia de THREE.Group.');
      }
    });
  }

  private loadAnimation(animationFile: string, model: Group) {
    const loader = new FBXLoader();
  
    // Ajusta la ruta según tu estructura de directorios
    loader.setPath('../assets/images/threejs/');
  
    loader.load(animationFile, (fbx) => {
      const clip = fbx.animations[0];
  
      this.mixer = new AnimationMixer(model);
      this.action = this.mixer.clipAction(clip);
  
      // Configuración especial para 'saludo.fbx'
      if (animationFile === 'saludo.fbx') {
        // Configuración adicional para 'saludo.fbx'
        this.action.setLoop(THREE.LoopOnce, 1); // Establece el bucle como una vez
        this.action.clampWhenFinished = true; // Asegura que la animación no se repita automáticamente
  
        // Configuración para 'reposo.fbx'
        const reposoClip = THREE.AnimationClip.findByName(fbx.animations, 'reposo');
        if (reposoClip) {
          const reposoAction = this.mixer.clipAction(reposoClip);
          reposoAction.setLoop(THREE.LoopRepeat, Infinity); // Establece el bucle como infinito
          this.action.stop(); // Detiene la acción actual ('saludo.fbx') antes de asignar la nueva
          this.action = reposoAction; // Asigna la nueva acción como la acción actual
          this.action.play(); // Reproduce la animación 'reposo.fbx'
        }
      }
  
      // Reproducción de la animación
      this.action.play();
    });
  }
  
  
  
  
  
  // Método para actualizar la animación en cada fotograma
  update(delta: number) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }
}
