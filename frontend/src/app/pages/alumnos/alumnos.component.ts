import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../services/alumnos.service'

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit {

  aux: any;
  alumnoData: any;
  fecha: any;

  constructor(private activatedRoute: ActivatedRoute, private alumnoService: AlumnoService){
    this.alumnoData = [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.aux = history.state.aux;
    })

    this.obtenerAlumno();
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

}
