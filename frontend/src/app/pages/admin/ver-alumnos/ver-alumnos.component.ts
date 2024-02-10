import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { environment } from '../../../../environments/environment.produccion';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alumnos',
  templateUrl: './ver-alumnos.component.html',
  styleUrl: './ver-alumnos.component.css'
})
export class VerAlumnosComponent implements OnInit{
  
  alumnosData: any;
  public totalAlumnos = 0;
  public posActual = 0;
  public regPag = environment.registrosPag;
  private busqueda = '';

  constructor(private alumnoService: AlumnoService, private router: Router){}

  ngOnInit() {
    this.obtenerAlumnos(this.busqueda);
  }

  obtenerAlumnos(buscar: string){
    this.busqueda = buscar;
    this.alumnoService.getAlumnos(this.posActual, buscar).subscribe((res: any) => {
      if(res["alumnos"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.regPag;
          if(this.posActual < 0){
            this.posActual = 0
          }
          this.obtenerAlumnos(this.busqueda);
        }else {
          this.alumnosData = [];
          this.totalAlumnos = 0;
        }
      }else {
        this.alumnosData = res.alumnos;
        this.totalAlumnos = res.page.total;
      }  
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
          this.obtenerAlumnos(this.busqueda);
        })
        Swal.fire({
          title: "Alumno Eliminado",
          icon: "success"
        });
      }
    });
  }

  editarAlumno(alumno: any){
    this.router.navigate(['admin/editar-alumnos'], {state: {alumno}});
  }

  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.regPag >= 0 ? (pagina - 1) * this.regPag : 0);
    this.obtenerAlumnos(this.busqueda);
  }
  
}
