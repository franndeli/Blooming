// Modelo.model.ts
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { AnimationMixer, AnimationAction, Group } from 'three';

export class Modelo {
  avatar: Group;
  mixer: AnimationMixer | undefined;
  action: AnimationAction | undefined;

  constructor() {
    this.avatar = new THREE.Group();
    this.mixer = undefined;
    this.action = undefined;
    this.loadAvatar();
  }

  private loadAvatar() {
    const loader = new FBXLoader();

    // Ajusta la ruta según tu estructura de directorios
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
