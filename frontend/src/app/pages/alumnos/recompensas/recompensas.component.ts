import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.component.html',
  styleUrl: './recompensas.component.css'
})
export class RecompensasComponent {
  alumnosData: any;
  id: any;
  puntosActualizados: number = 0;

  constructor(private alumnosService: AlumnoService,  private router: Router){
    this.alumnosData = [];
  }

  ngOnInit(){
    this.id = localStorage.getItem('id');
    this.alumnosService.getAlumnoID(this.id).subscribe((res: any) => {
      this.alumnosData = res.alumnos[0];
    })
  }

  canjearRecompensa(points: number){
    if (this.alumnosData.Puntos >= points) {
      this.puntosActualizados = this.alumnosData.Puntos - points;
      const datosActualizados = {
        ID_Alumno: this.id,
        Puntos: this.puntosActualizados
      }
      this.alumnosService.putAlumno(datosActualizados).subscribe(
        (response: any) => {
          Swal.fire({
            icon: "success",
            title: "¡Recompensa canjeada!",
            text: "Se ha enviado un correo a tu tutor :)",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error de creación:', error);
          Swal.fire(error.error.message);
        }
      )
    } else {
      this.mostrarModal("¡Lo siento! No tienes suficientes puntos para canjear esta recompensa:(");
    } 
  }

  mostrarModal(mensaje: string): void {
    const modal = document.getElementById("myModal");
    const modalMensaje = document.getElementById("modalMensaje");

    if (modal && modalMensaje) {
        modal.style.display = "block";
        modalMensaje.innerText = mensaje;
    }
  }

  cerrarModal() {
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "none";
    }
  }
}
