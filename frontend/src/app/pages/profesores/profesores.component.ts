import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesorService } from '../../services/profesores.service';
import { ClaseService } from '../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent implements OnInit{

  clasesData: any;
  private id: any;
  private centroID: any;

  constructor(private claseService: ClaseService, private profesorService: ProfesorService, private router: Router){
    this.clasesData = [];
  }

  ngOnInit() {
    this.getClases();
  }

  getClases(){
    this.id = localStorage.getItem('id');
    this.profesorService.getProfesorID(this.id).subscribe((res: any) => {
      this.centroID = res.profesores[0].ID_Centro;

      this.claseService.getClasesCentro(this.centroID).subscribe(res => {
        this.clasesData = res;
      })
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

  verClase(claseID: any){
    this.router.navigate(['profesores/ver-alumnos'], {state: {claseID}});
  }
  
}
