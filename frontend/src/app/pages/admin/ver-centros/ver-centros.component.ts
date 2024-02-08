import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CentroService } from '../../../services/centros.service';

import Swal from 'sweetalert2';
import { pairwise } from 'rxjs';

@Component({
  selector: 'app-centros',
  templateUrl: './ver-centros.component.html',
  styleUrl: './ver-centros.component.css'
})
export class VerCentrosComponent implements OnInit{

  centrosData: any;
  public totalReg = 25;
  public posActual = 0;
  public regPag = 5;

  constructor(private centroService: CentroService, private router: Router){
    this.centrosData = [];
  }

  ngOnInit() {
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

  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.regPag >= 0 ? (pagina - 1) * this.regPag : 0);
  }

}
