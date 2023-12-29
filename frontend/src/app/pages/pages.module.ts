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

//CENTROS
import { VerProfesoresCComponent } from './centros/ver-profesores-c/ver-profesores-c.component';
import { VerClasesCComponent } from './centros/ver-clases-c/ver-clases-c.component';
import { VerAlumnosCComponent } from './centros/ver-alumnos-c/ver-alumnos-c.component';
import { CrearAlumnosCComponent } from './centros/crear-alumnos-c/crear-alumnos-c.component';
import { CrearClasesCComponent } from './centros/crear-clases-c/crear-clases-c.component';
import { CrearProfesoresCComponent } from './centros/crear-profesores-c/crear-profesores-c.component';

//ADMIN
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { VerProfesoresComponent } from './admin/ver-profesores/ver-profesores.component';
import { CrearProfesoresComponent } from './admin/crear-profesores/crear-profesores.component';
import { EditarProfesoresComponent } from './admin/editar-profesores/editar-profesores.component';
import { VerAlumnosComponent } from './admin/ver-alumnos/ver-alumnos.component';
import { CrearAlumnosComponent } from './admin/crear-alumnos/crear-alumnos.component';
import { EditarAlumnosComponent } from './admin/editar-alumnos/editar-alumnos.component';
import { VerClasesComponent } from './admin/ver-clases/ver-clases.component';
import { CrearClasesComponent } from './admin/crear-clases/crear-clases.component';
import { EditarClasesComponent } from './admin/editar-clases/editar-clases.component';
import { VerCentrosComponent } from './admin/ver-centros/ver-centros.component';
import { CrearCentrosComponent } from './admin/crear-centros/crear-centros.component';
import { EditarCentrosComponent } from './admin/editar-centros/editar-centros.component';

//PROFESORES
import { ProfesoresComponent } from './profesores/profesores.component';
import { VerClasesPComponent } from './profesores/ver-clases-p/ver-clases-p.component';
import { VerAlumnosPComponent } from './profesores/ver-alumnos-p/ver-alumnos-p.component';
import { VerPerfilAlumnoComponent } from './profesores/ver-perfil-alumno/ver-perfil-alumno.component';
import { ActividadRecienteComponent } from './profesores/actividad-reciente/actividad-reciente.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarAlumnosCComponent } from './centros/editar-alumnos-c/editar-alumnos-c.component';
import { EditarProfesoresCComponent } from './centros/editar-profesores-c/editar-profesores-c.component';
import { EditarClasesCComponent } from './centros/editar-clases-c/editar-clases-c.component';
import { AlumnoLayoutComponent } from '../layouts/alumno-layout/alumno-layout.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ThreejsComponent } from './alumnos/threejs/threejs.component';
import { ConversacionComponent } from './alumnos/conversacion/conversacion.component';




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
    AlumnoLayoutComponent,
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
      ActividadRecienteComponent,
      CrearProfesoresComponent,
      CrearClasesComponent,
      CrearAlumnosComponent,
      CrearCentrosComponent,
      VerProfesoresComponent,
      VerAlumnosComponent,
      VerClasesComponent,
      VerCentrosComponent,
      EditarAlumnosCComponent,
      EditarProfesoresCComponent,
      EditarClasesCComponent,
      AlumnosComponent,
      ThreejsComponent,
      ConversacionComponent,

  ],
  exports: [
    AdminLayoutComponent,
    AlumnoLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommonsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
