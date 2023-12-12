import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../commons/sidebar/sidebar.component';
import { NavbarComponent } from '../commons/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { SidebarCentroComponent } from '../commons/sidebar-centro/sidebar-centro.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

import { CommonsModule } from '../commons/commons.module';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { VerProfesoresCComponent } from './centros/ver-profesores-c/ver-profesores-c.component';
import { VerClasesCComponent } from './centros/ver-clases-c/ver-clases-c.component';
import { VerAlumnosCComponent } from './centros/ver-alumnos-c/ver-alumnos-c.component';
import { CrearAlumnosCComponent } from './centros/crear-alumnos-c/crear-alumnos-c.component';
import { CrearClasesCComponent } from './centros/crear-clases-c/crear-clases-c.component';
import { CrearProfesoresCComponent } from './centros/crear-profesores-c/crear-profesores-c.component';
import { EditarAlumnosComponent } from './admin/editar-alumnos/editar-alumnos.component';
import { EditarClasesComponent } from './admin/editar-clases/editar-clases.component';
import { EditarProfesoresComponent } from './admin/editar-profesores/editar-profesores.component';
import { EditarCentrosComponent } from './admin/editar-centros/editar-centros.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { VerClasesPComponent } from './profesores/ver-clases-p/ver-clases-p.component';
import { VerAlumnosPComponent } from './profesores/ver-alumnos-p/ver-alumnos-p.component';
import { VerPerfilAlumnoComponent } from './profesores/ver-perfil-alumno/ver-perfil-alumno.component';
import { ActividadRecienteComponent } from './profesores/actividad-reciente/actividad-reciente.component';


@NgModule({
  declarations: [
    /*SidebarComponent,
    SidebarCentroComponent,
    NavbarComponent,
    DashboardComponent,
    UsuariosComponent,
    CentrosVistaComponent,
    AdminComponent*/
    AdminLayoutComponent,

    AdmindashboardComponent,
      VerProfesoresCComponent,
      VerClasesCComponent,
      VerAlumnosCComponent,
      CrearAlumnosCComponent,
      CrearClasesCComponent,
      CrearProfesoresCComponent,
      EditarAlumnosComponent,
      EditarClasesComponent,
      EditarProfesoresComponent,
      EditarCentrosComponent,
      ProfesoresComponent,
      VerClasesPComponent,
      VerAlumnosPComponent,
      VerPerfilAlumnoComponent,
      ActividadRecienteComponent
  ],
  exports: [
    AdminLayoutComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    CommonsModule
  ]
})
export class PagesModule { }
