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
  boton: any;

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
    if(this.boton.textContent !== 'Seguir jugando') {
      Swal.fire({
        title: '<span style="font-size: 1.7em; font-weight: 700; color: #68A63C">¿Cómo jugar?</span>',
        width: '60%',
        html: `
            <div style="display: flex; justify-content: space-between; text-align: center; gap: 30px;">
                <div style="width: 50%;">
                    <h3 style="font-weight: bold">Cuando veas el cubo</h3>
                    <img src="./../../assets/images/como_jugar/captura_cubo.PNG" alt="Imagen del cubo" style="width: 70%; border-radius: 20px; margin-bottom: 10px;">
                    <p>Desliza el ratón por la pantalla para rotarlo y ¡elije la cara que más te guste!</p>
                </div>
                <div style="width: 50%;">
                    <h3 style="font-weight: bold">Cuando veas el tablero</h3>
                    <img src="../../../assets/images/como_jugar/captura_tablero.PNG" alt="Imagen del tablero 1" style="width: 70%; margin-bottom: 10px; border-radius: 20px;">
                    <img src="ruta/a/tu/imagen3.jpg" alt="Imagen del tablero 2" style="width: 70%; border-radius: 20px; margin-bottom: 10px;">
                    <p>Pulsa la pieza y deslízala sobre la cara que más te guste</p>
                </div>
            </div>
            <button id="play-button" style="
                margin-top: 20px; 
                background-color: #68A63C; 
                color: white; 
                font-size: 25px; 
                padding: 10px 20px; 
                cursor: pointer; 
                border-radius: 5px; 
                transition: transform 0.4s ease-in-out, background-color 0.4s ease-in-out;">
                EMPEZAR
            </button>
        `,
        showConfirmButton: false,
        didOpen: () => {
            const playButton = document.getElementById('play-button');
            playButton!.addEventListener('click', () => {
                Swal.close();
                this.router.navigate(['alumnos/arbol-escena']); 
            });
        }
    });
    } else {
      this.router.navigate(['alumnos/arbol-escena']); 
    }
    
}


  existeLocalStorage(){
    const sesionId = localStorage.getItem('sesionId');
    this.boton = document.getElementById('comenzarBtn');
    if(sesionId) {
      this.boton!.textContent = 'Seguir jugando';
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
