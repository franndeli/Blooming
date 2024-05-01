import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
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
  public filPag = 5;
  private busqueda = '';
  private contar = 0;

  constructor(private alumnoService: AlumnoService, private router: Router){}

  ngOnInit() {
    this.obtenerAlumnos(this.busqueda);
  }

  obtenerAlumnos(buscar: string){
    this.busqueda = buscar;
    this.alumnoService.getAlumnos(this.posActual, this.filPag, this.contar).subscribe((res: any) => {
      if(res["alumnos"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.filPag;
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
      //console.log(this.alumnosData);
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
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.obtenerAlumnos(this.busqueda);
  }

  cambiarFilasPagina(filas: any){
    this.filPag = filas;
    this.cambiarPagina(1);
  }

  onClickContar(num: number){
    if(num == 1){
      this.contar = 1;
      this.obtenerAlumnos(this.busqueda);
    } else if (num == 2){
      this.contar = 2;
      this.obtenerAlumnos(this.busqueda);
    }else if (num == 3){
      this.contar = 3;
      this.obtenerAlumnos(this.busqueda);
    }else if (num == 4){
      this.contar = 4;
      this.obtenerAlumnos(this.busqueda);
    }else if (num == 5){
      this.contar = 5;
      this.obtenerAlumnos(this.busqueda);
    }else if (num == 6){
      this.contar = 6;
      this.obtenerAlumnos(this.busqueda);
    }else if (num == 7){
      this.contar = 7;
      this.obtenerAlumnos(this.busqueda);
    }else if (num == 8){
      this.contar = 8;
      this.obtenerAlumnos(this.busqueda);
    }else if (num == 9){
      this.contar = 9;
      this.obtenerAlumnos(this.busqueda);
    }else if (num == 10){
      this.contar = 10;
      this.obtenerAlumnos(this.busqueda);
    }
  }
}
