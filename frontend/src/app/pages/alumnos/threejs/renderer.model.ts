
// renderer.model.ts
import { WebGLRenderer } from 'three';

export default class Renderer {
    private renderer: WebGLRenderer;

    constructor(div: HTMLDivElement) {
        this.renderer = new WebGLRenderer();
        div.appendChild(this.renderer.domElement);
    }
}