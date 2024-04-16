import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfesorService } from '../../../services/profesores.service';

@Component({
  selector: 'app-ver-profesores-c',
  templateUrl: './ver-profesores-c.component.html',
  styleUrl: './ver-profesores-c.component.css'
})
export class VerProfesoresCComponent implements OnInit {

  profesoresData: any = 0;
  private id: any;
  public totalProfesores = 0;
  public posActual = 0;
  public filPag = 5;
  private busqueda = '';
  public login: string = '';
  public password: string = '';

  @ViewChild('modalDialog') modalDialog!: ElementRef;

  constructor(private profesorService: ProfesorService, private router: Router){}

  ngOnInit() {
    this.obtenerProfesores(this.busqueda);
  }

  obtenerProfesores(buscar: string){
    this.busqueda = buscar;
    this.id = localStorage.getItem('id');
    this.profesorService.getProfesoresCentro(this.id, this.posActual, this.filPag, buscar).subscribe((res: any) => {
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
        //console.log(this.profesoresData)
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

  verDatos(id: number){
    this.profesorService.getProfesorID(id, true).subscribe((res: any) => {
      //console.log(res.profesores);
      this.login = res.profesores[0].Email;
      this.password = res.profesores[0].Contraseña;
      
      this.modalDialog.nativeElement.classList.add('show');
      this.modalDialog.nativeElement.setAttribute('aria-modal', 'true');
      this.modalDialog.nativeElement.style.display = 'block';
      document.body.classList.add('modal-open');

      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    });
  }

  cerrar(): void {
    this.modalDialog.nativeElement.classList.remove('show');
    this.modalDialog.nativeElement.setAttribute('aria-modal', 'false');
    this.modalDialog.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      document.body.removeChild(backdrop);
    }
  }

  editarProfesor(profesor: any){
    this.router.navigate(['centros/editar-profesores'], {state: {profesor}});
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
