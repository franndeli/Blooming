import { Component, AfterViewInit  } from '@angular/core';
import { CentroService } from '../../services/centros.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrl: './centros.component.css'
})
export class CentrosComponent implements AfterViewInit {

  centrosData: any;

  constructor(private centroService: CentroService){
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

}
