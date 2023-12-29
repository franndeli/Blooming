import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaseService } from '../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ver-clases-c',
  templateUrl: './ver-clases-c.component.html',
  styleUrl: './ver-clases-c.component.css'
})
export class VerClasesCComponent implements OnInit {

  clasesData: any;
  private id: any;

  constructor(private claseService: ClaseService, private router: Router){
    this.clasesData = [];
  }

  ngOnInit() {
    this.getClases();
  }

  getClases(){
    this.id = localStorage.getItem('id');
    this.claseService.getClasesCentro(this.id).subscribe(res => {
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
    this.router.navigate(['centros/editar-clases'], {state: {clase}});
  }

}
