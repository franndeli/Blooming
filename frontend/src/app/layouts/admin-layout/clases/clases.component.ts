import { Component } from '@angular/core';
import { ClaseService } from '../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.css'
})
export class ClasesComponent {

  clasesData: any;

  constructor(private claseService: ClaseService){
    this.clasesData = [];
  }

  ngAfterViewInit() {
    this.tryLocalStorage();
  }

  tryLocalStorage(){
    this.getClases();
  }

  getClases(){
    this.claseService.getClases().subscribe(res => {
      this.clasesData = res;
    })
  }

  eliminarClase(id: number){
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
        this.claseService.deleteClase(id).subscribe(res => {
          this.getClases();
        })
        Swal.fire({
          title: "Clase Eliminada",
          icon: "success"
        });
      }
    });
  }

}
