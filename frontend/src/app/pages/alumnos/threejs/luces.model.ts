import * as THREE from 'three';

export class Luces {
    ambiental: THREE.AmbientLight;
    hemisphere: THREE.HemisphereLight;
  
    constructor() {
      this.ambiental = new THREE.AmbientLight(0xffffff, 0.4);
      this.hemisphere = new THREE.HemisphereLight(0xffffff, 0.4);
    }
  
    addToScene(scene: THREE.Scene): void {
      scene.add(this.ambiental);
      scene.add(this.hemisphere);
    }
  }