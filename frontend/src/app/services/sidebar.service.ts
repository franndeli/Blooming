import { Injectable } from '@angular/core';
import { sidebarItem } from '../interfaces/sidebar.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuAdmin: sidebarItem[] = [
    { titulo: 'Centros', icono: 'ti ti-home', url: '/admin/ver-centros'},
    { titulo: 'Profesores', icono: 'ti ti-users', url: '/admin/ver-profesores'},
    { titulo: 'Alumnos', icono: 'ti ti-friends', url: '/admin/ver-alumnos'},
    { titulo: 'Clases', icono: 'ti ti-school', url: '/admin/ver-clases'}
  ];
  menuAlumno: sidebarItem[] = [];
  menuProfesor: sidebarItem[] = [
    { titulo: 'Clases', icono: 'ti ti-friends', url: '/profesores/dashboard'},
    { titulo: 'Actividad reciente', icono: 'ti ti-users', url: '/profesores/actividad-reciente'}
  ];
  menuCentro: sidebarItem[] = [
    { titulo: 'Profesores', icono: 'ti ti-users', url: '/centros/ver-profesores'},
    { titulo: 'Alumnos', icono: 'ti ti-friends', url: '/centros/ver-alumnos'},
    { titulo: 'Clases', icono: 'ti ti-school', url: '/centros/ver-clases'}
  ];


  constructor() { }

  getmenu(){
    const rol = localStorage.getItem('rol');

    switch(rol) {
      case 'Admin':
        return this.menuAdmin;
      case 'Profesor':
        return this.menuProfesor;
      case 'Alumno':
        return this.menuAlumno;
      case 'Centro':
        return this.menuCentro;
    }
    return [];
  }
}
