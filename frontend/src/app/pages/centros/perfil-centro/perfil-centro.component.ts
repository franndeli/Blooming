import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CentroService } from '../../../services/centros.service';

@Component({
  selector: 'app-perfil-centro',
  templateUrl: './perfil-centro.component.html',
  styleUrl: './perfil-centro.component.css'
})
export class PerfilCentroComponent {
  centrosData: any;
  id: any;

  constructor(private centroService: CentroService, private router: Router){
    this.centrosData = []
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.centroService.getCentro(this.id).subscribe((res: any) => {
      this.centrosData = res.centros[0];
    })
  }
}
