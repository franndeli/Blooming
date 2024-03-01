import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesorService } from '../../../services/profesores.service';
import { environment } from '../../../../environments/environment.produccion';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-profesores',
  templateUrl: './ver-profesores.component.html',
  styleUrl: './ver-profesores.component.css'
})
export class VerProfesoresComponent implements OnInit{

  profesoresData: any;
  public totalProfesores = 0;
  public posActual = 0;
  public filPag = 5;
  private busqueda = '';

  constructor(private profesorService: ProfesorService, private router: Router){}

  ngOnInit() {
    this.obtenerProfesores(this.busqueda);
  }

  obtenerProfesores(buscar: string){
    this.busqueda = buscar;
    this.profesorService.getProfesores(this.posActual, this.filPag, buscar).subscribe((res: any) => {
      if(res["profesores"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.filPag;
          if(this.posActual < 0){
            this.posActual = 0
          }
          this.obtenerProfesores(this.busqueda);
        }else {
          this.profesoresData = [];
          this.totalProfesores = 0;
        }
      }else {
        this.profesoresData = res.profesores;
        this.totalProfesores = res.page.total;
      }
    })
  }

  eliminarProfesor(id: number){
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
        this.profesorService.deleteProfesor(id).subscribe(res => {
          this.obtenerProfesores(this.busqueda);
        })
        Swal.fire({
          title: "Profesor Eliminado",
          icon: "success"
        });
      }
    });
  }

  editarProfesor(profesor: any){
    this.router.navigate(['admin/editar-profesores'], {state: {profesor}});
  }

  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.obtenerProfesores(this.busqueda);
  }

  cambiarFilasPagina(filas: any){
    this.filPag = filas;
    this.cambiarPagina(1);
  }

}
