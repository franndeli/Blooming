import { TCamara } from '../arbol_escena/camara';
import { TNodo } from '../arbol_escena/nodo';

export class OrbitControls {
    private cameraNode: TNodo;
    private element: HTMLElement;
    private phi: number = 0; // vertical angle
    private theta: number = 0; // horizontal angle

    constructor(cameraNode: TNodo, element: HTMLElement) {
        this.cameraNode = cameraNode;
        this.element = element;

        // Attach event listeners
        this.element.addEventListener('mousedown', this.onMouseDown);
        this.element.addEventListener('mousemove', this.onMouseMove);
        this.element.addEventListener('mouseup', this.onMouseUp);
    }

    private onMouseDown = (event: MouseEvent) => {
        // Handle mouse down event, e.g. start tracking mouse movement
    }

    private onMouseMove = (event: MouseEvent) => {
        // Update angles based on mouse movement
        this.theta += event.movementX;
        this.phi += event.movementY;

        // Update camera position
        const radius = 10; // distance from the target
        this.cameraNode.setTraslacion([
            radius * Math.sin(this.theta) * Math.cos(this.phi),
            radius * Math.sin(this.phi),
            radius * Math.cos(this.theta) * Math.cos(this.phi)
        ]);
    }

    private onMouseUp = (event: MouseEvent) => {
        // Handle mouse up event, e.g. stop tracking mouse movement
    }

    public update = () => {
        // Update camera position
        const radius = 10; // distance from the target
        this.cameraNode.setTraslacion([
            radius * Math.sin(this.theta) * Math.cos(this.phi),
            radius * Math.sin(this.phi),
            radius * Math.cos(this.theta) * Math.cos(this.phi)
        ]);
    }
}