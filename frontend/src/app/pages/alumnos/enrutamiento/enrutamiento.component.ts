import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnrutamientoService } from './enrutamiento.service';
@Component({
  selector: 'app-enrutamiento',
  templateUrl: './enrutamiento.component.html',
  styleUrl: './enrutamiento.component.css'
})
export class EnrutamientoComponent {
  componenteActual: any; //almacena el componente que se está mostrando
  constructor(private enrutamientoService: EnrutamientoService) { }

  ngOnInit(): void {
    this.componenteActual = this.enrutamientoService.getComponenteInicial();
  }

  cargarComponenteSiguiente() {
    this.componenteActual = this.enrutamientoService.getComponenteSiguiente();
  }
  
}
