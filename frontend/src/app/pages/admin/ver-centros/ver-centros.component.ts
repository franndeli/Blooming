import { Component, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';

import { CentroService } from '../../../services/centros.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-centros',
  templateUrl: './ver-centros.component.html',
  styleUrl: './ver-centros.component.css'
})
export class VerCentrosComponent {

  centrosData: any;

  constructor(private centroService: CentroService, private router: Router){
    this.centrosData = [];
  }

  ngAfterViewInit() {
    this.tryLocalStorage();
  }

  tryLocalStorage(){
    this.getCentros();
  }

  getCentros(){
    this.centroService.getCentros().subscribe(res => {
      this.centrosData = res;
    })
  }

  eliminarCentro(id: number){
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se podrá deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.centroService.deleteCentro(id).subscribe(res => {
          this.getCentros();
        })
        Swal.fire({
          title: "Centro Eliminado",
          icon: "success"
        });
      }
    });
  }

  editarCentro(centro: any){
    this.router.navigate(['admin/editar-centros'], {state: {centro}});
  }

}
