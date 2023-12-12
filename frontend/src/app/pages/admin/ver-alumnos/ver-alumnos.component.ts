import { Component, AfterViewInit  } from '@angular/core';
import { AlumnoService } from '../../../services/alumnos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-alumnos',
  templateUrl: './ver-alumnos.component.html',
  styleUrl: './ver-alumnos.component.css'
})
export class VerAlumnosComponent implements AfterViewInit{
  
  alumnosData: any;

  constructor(private alumnoService: AlumnoService){
    this.alumnosData = [];
  }

  ngAfterViewInit() {
    this.tryLocalStorage();
  }

  tryLocalStorage(){
    this.getAlumnos();
  }

  getAlumnos(){
    this.alumnoService.getAlumnos().subscribe(res => {
      console.log(res);
      this.alumnosData = res;
    })
  }

  eliminarAlumno(id: number){
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
        this.alumnoService.deleteAlumno(id).subscribe(res => {
          this.getAlumnos();
        })
        Swal.fire({
          title: "Alumno Eliminado",
          icon: "success"
        });
      }
    });
  }
}
