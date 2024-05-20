import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaseService } from '../../../services/clases.service';
import { environment } from '../../../../environments/environment.produccion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clases',
  templateUrl: './ver-clases.component.html',
  styleUrl: './ver-clases.component.css'
})
export class VerClasesComponent implements OnInit {
  
  clasesData: any;
  public totalClases = 0;
  public posActual = 0;
  public filPag = 5;
  private busqueda = '';

  private contar = 0;

  filtroNombre: string = ''; 

  constructor(private claseService: ClaseService, private router: Router){}

  ngOnInit() {
    this.obtenerClases(this.busqueda);
  }

  filtrarAlumnos() {
    this.obtenerClases(this.filtroNombre);
  }

  obtenerClases(buscar: string){
    this.busqueda = buscar;
    this.claseService.getClases(this.posActual, this.filPag, this.contar, this.busqueda).subscribe((res: any) => {
      if(res["clases"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.filPag;
          if(this.posActual < 0){
            this.posActual = 0
          }
          this.obtenerClases(this.busqueda);
        }else {
          this.clasesData = [];
          this.totalClases = 0;
        }
      }else{
        this.clasesData = res.clases;
        this.totalClases = res.page.total;
      }
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
          this.obtenerClases(this.busqueda);
        })
        Swal.fire({
          title: "Clase Eliminada",
          icon: "success"
        });
      }
    });
  }

  editarClase(clase: any){
    this.router.navigate(['admin/editar-clases'], {state: {clase}});
  }

  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.obtenerClases(this.busqueda);
  }

  cambiarFilasPagina(filas: any){
    this.filPag = filas;
    this.cambiarPagina(1);
  }

  onClickContar(num: number){
    if(num == 1){
      this.contar = 1;
      this.obtenerClases(this.busqueda);
    } else if (num == 2){
      this.contar = 2;
      this.obtenerClases(this.busqueda);
    }else if (num == 3){
      this.contar = 3;
      this.obtenerClases(this.busqueda);
    }else if (num == 4){
      this.contar = 4;
      this.obtenerClases(this.busqueda);
    }else if (num == 5){
      this.contar = 5;
      this.obtenerClases(this.busqueda);
    }else if (num == 6){
      this.contar = 6;
      this.obtenerClases(this.busqueda);
    }
  }

}
