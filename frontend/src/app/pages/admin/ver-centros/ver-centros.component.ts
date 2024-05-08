import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CentroService } from '../../../services/centros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centros',
  templateUrl: './ver-centros.component.html',
  styleUrl: './ver-centros.component.css'
})
export class VerCentrosComponent implements OnInit{

  centrosData: any;
  public totalCentros = 0;
  public posActual = 0;
  public filPag = 5;
  private busqueda = '';

  private contar = 0;

  filtroNombre: string = ''; 

  constructor(private centroService: CentroService, private router: Router){}

  ngOnInit() {
    this.obtenerCentros(this.busqueda);
  }

  filtrarAlumnos() {
    this.obtenerCentros(this.filtroNombre);
  }

  obtenerCentros(buscar: string){
    this.busqueda = buscar;
    this.centroService.getCentros(this.posActual, this.filPag, this.contar, this.busqueda).subscribe((res: any) => {
      if(res["centros"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.filPag;
          if(this.posActual < 0){
            this.posActual = 0
          }
          this.obtenerCentros(this.busqueda);
        }else {
          this.centrosData = [];
          this.totalCentros = 0;
        }
      }else {
        this.centrosData = res.centros;
        this.totalCentros = res.page.total;
      }
    })
  }

  eliminarCentro(id: number){
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
        this.centroService.deleteCentro(id).subscribe(res => {
          this.obtenerCentros(this.busqueda);
        })
        Swal.fire({
          title: "Centro Eliminado",
          icon: "success"
        });
      }
    });
  }

  editarCentro(centro: any){
    this.router.navigate(['admin/editar-centros'], {state: {centro}});
  }

  cambiarPagina(pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.obtenerCentros(this.busqueda);
  }

  cambiarFilasPagina(filas: any){
    this.filPag = filas;
    this.cambiarPagina(1);
  }

  onClickContar(num: number){
    if(num == 1){
      this.contar = 1;
      this.obtenerCentros(this.busqueda);
    } else if(num == 2){
      this.contar = 2;
      this.obtenerCentros(this.busqueda);
    } else if(num == 3){
      this.contar = 3;
      this.obtenerCentros(this.busqueda);
    } else if(num == 4){
      this.contar = 4;
      this.obtenerCentros(this.busqueda);
    } else if(num == 5){
      this.contar = 5;
      this.obtenerCentros(this.busqueda);
    } else if(num == 6){
      this.contar = 6;
      this.obtenerCentros(this.busqueda);
    }
  }

}
