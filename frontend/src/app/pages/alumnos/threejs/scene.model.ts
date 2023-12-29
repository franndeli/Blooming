
// scene.model.ts
import { WebGLRenderer, Scene as SceneThree } from 'three';
import { Camara } from './camara.model';
import { Luces } from './luces.model';
import { Skybox } from './skybox.model';

export class Scene extends SceneThree {
    camara: Camara;

    constructor(private renderer: WebGLRenderer) {
        super();
        this.camara = new Camara();

        new Luces().addToScene(this);
        
        new Skybox(this);

        this.update();
    }

    private update(): void {
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this, this.camara);
        };

        animate();
    }
}
