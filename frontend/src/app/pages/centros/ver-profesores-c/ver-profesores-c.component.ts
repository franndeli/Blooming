import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesorService } from '../../../services/profesores.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ver-profesores-c',
  templateUrl: './ver-profesores-c.component.html',
  styleUrl: './ver-profesores-c.component.css'
})
export class VerProfesoresCComponent implements OnInit {

  profesoresData: any;
  private id: any;

  constructor(private profesorService: ProfesorService, private router: Router){
    this.profesoresData = [];
  }

  ngOnInit() {
    this.getProfesores();
  }

  getProfesores(){
    this.id = localStorage.getItem('id');
    this.profesorService.getProfesoresCentro(this.id).subscribe(res => {
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
          this.getProfesores();
        })
        Swal.fire({
          title: "Profesor Eliminado",
          icon: "success"
        });
      }
    });
  }

  editarProfesor(profesor: any){
    this.router.navigate(['centros/editar-profesores'], {state: {profesor}});
  }

}
