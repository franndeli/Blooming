import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ClaseService } from '../../../services/clases.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clases',
  templateUrl: './ver-clases.component.html',
  styleUrl: './ver-clases.component.css'
})
export class VerClasesComponent {
  
  clasesData: any;

  constructor(private claseService: ClaseService, private router: Router){
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

  editarClase(clase: any){
    this.router.navigate(['admin/editar-clases'], {state: {clase}});
  }

}
