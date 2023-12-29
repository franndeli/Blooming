import { Injectable } from '@angular/core';
import { navbarItem } from '../interfaces/navbar.interface';


@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  navbarAdmin: navbarItem[] = [{url: '/admin/perfil'}];
  navbarCentro: navbarItem[] = [{url: '/centros/perfil'}];
  navbarProfesor: navbarItem[] = [{url: '/profesores/perfil'}];
  navbarAlumno: navbarItem[] = [{url: '/alumnos/perfil'}];

  constructor() { }

  getnavbar(){
    const rol = localStorage.getItem('rol');

    switch(rol) {
      case 'Admin':
        return this.navbarAdmin;
      case 'Profesor':
        return this.navbarProfesor;
      case 'Alumno':
        return this.navbarAlumno;
      case 'Centro':
        return this.navbarCentro;
    }
    return [];
  }
}
