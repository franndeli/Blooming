import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ver-alumnos-c',
  templateUrl: './ver-alumnos-c.component.html',
  styleUrl: './ver-alumnos-c.component.css'
})
export class VerAlumnosCComponent implements OnInit{

  alumnosData: any;
  private id: any;

  constructor(private alumnoService: AlumnoService, private router: Router){
    this.alumnosData = [];
  }

  ngOnInit() {
    this.getAlumnos();;
  }

  getAlumnos(){
    this.id = localStorage.getItem('id');
    this.alumnoService.getAlumnosCentro(this.id).subscribe(res => {
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

  editarAlumno(alumno: any){
    this.router.navigate(['centros/editar-alumnos'], {state: {alumno}});
  }

}
