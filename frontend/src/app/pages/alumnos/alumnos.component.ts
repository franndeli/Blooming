import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../services/alumnos.service'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit {

  aux: any;
  alumnoData: any;
  fecha: any;

  constructor(private activatedRoute: ActivatedRoute, private alumnoService: AlumnoService, private router: Router, private authService: AuthService){
    this.alumnoData = [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.aux = history.state.aux;
    })

    this.obtenerAlumno();
    this.existeLocalStorage();
  }

  obtenerAlumno(){
    let id = localStorage.getItem('id');
    this.alumnoService.getAlumnoID(id).subscribe((res: any) => {
      this.alumnoData = res.alumnos[0];
    })
  }

  obtenerFechaFormato(){
    const fechaHora = new Date();
    const formatoFecha: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    };
    return fechaHora.toLocaleDateString(undefined, formatoFecha);
  }

  empezarCuestionario(){
    this.router.navigate(['alumnos/arbol-escena']);
  }

  existeLocalStorage(){
    const sesionId = localStorage.getItem('sesionId');
    let boton = document.getElementById('comenzarBtn');
    if(sesionId) {
      boton!.textContent = 'Seguir jugando';
    }
  }

  adios(){
    Swal.fire({
      title: "¿Estás seguro de que quieres salir de la aplicación?",
      icon: "warning",
      iconColor: "#68A63C",
      showCancelButton: true,
      confirmButtonColor: "#68A63C",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }

}
