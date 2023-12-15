import { Component } from '@angular/core';
import { ProfesorService } from '../../../services/profesores.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ver-profesores-c',
  templateUrl: './ver-profesores-c.component.html',
  styleUrl: './ver-profesores-c.component.css'
})
export class VerProfesoresCComponent {

  profesoresData: any;

  constructor(private profesorService: ProfesorService){
    this.profesoresData = [];
  }

  ngAfterViewInit() {
    this.tryLocalStorage();
  }

  tryLocalStorage(){
    this.getProfesores();
  }

  getProfesores(){
    this.profesorService.getProfesores().subscribe(res => {
      this.profesoresData = res;
    })
  }

  eliminarProfesor(id: number){
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
        this.profesorService.deleteProfesor(id).subscribe(res => {
          console.log(res);
          this.getProfesores();
        })
        Swal.fire({
          title: "Profesor Eliminado",
          icon: "success"
        });
      }
    });
  }

}
