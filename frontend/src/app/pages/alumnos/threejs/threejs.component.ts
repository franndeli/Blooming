// threejs.component.ts
import { Component, NgZone, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ThreeService } from "./threee.service";
import { Modelo } from './modelo.model';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.css']
})
export class ThreejsComponent implements OnInit, OnDestroy {
  constructor(private threeService: ThreeService) {}

  ngOnInit(): void {
    let lastTime = performance.now();
    const animate = () => {
    const currentTime = performance.now();
    const delta = (currentTime - lastTime) / 1000; 
    
    requestAnimationFrame(animate);

      this.threeService.avatar.update(delta);
      
  
      

      // Puedes agregar lógica adicional aquí si es necesario

      this.threeService.renderer.render(this.threeService.scene, this.threeService.camera);
      lastTime = currentTime;
    };

    animate();
  }

  ngOnDestroy(): void {
    // Aquí puedes realizar limpieza cuando el componente se destruye
    // Por ejemplo, detener animaciones, liberar recursos, etc.
  }
}
