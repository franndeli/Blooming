import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { CentrosComponent } from './centros/centros.component';
import { AdminComponent } from './admin/admin.component';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CrearAlumnosComponent } from './admin/crear-alumnos/crear-alumnos.component';
import { CrearCentrosComponent } from './admin/crear-centros/crear-centros.component';
import { CrearClasesComponent } from './admin/crear-clases/crear-clases.component';
import { CrearProfesoresComponent } from './admin/crear-profesores/crear-profesores.component';
import { VerAlumnosComponent } from './admin/ver-alumnos/ver-alumnos.component';
import { VerCentrosComponent } from './admin/ver-centros/ver-centros.component';
import { VerClasesComponent } from './admin/ver-clases/ver-clases.component';
import { VerProfesoresComponent } from './admin/ver-profesores/ver-profesores.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { VerAlumnosCComponent } from './centros/ver-alumnos-c/ver-alumnos-c.component';
import { VerProfesoresCComponent } from './centros/ver-profesores-c/ver-profesores-c.component';
import { VerClasesCComponent } from './centros/ver-clases-c/ver-clases-c.component';
import { CrearAlumnosCComponent } from './centros/crear-alumnos-c/crear-alumnos-c.component';
import { CrearProfesoresCComponent } from './centros/crear-profesores-c/crear-profesores-c.component';
import { CrearClasesCComponent } from './centros/crear-clases-c/crear-clases-c.component';
import { EditarAlumnosComponent } from './admin/editar-alumnos/editar-alumnos.component';
import { EditarCentrosComponent } from './admin/editar-centros/editar-centros.component';
import { EditarClasesComponent } from './admin/editar-clases/editar-clases.component';
import { EditarProfesoresComponent } from './admin/editar-profesores/editar-profesores.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { VerClasesPComponent } from './profesores/ver-clases-p/ver-clases-p.component';
import { VerPerfilAlumnoComponent } from './profesores/ver-perfil-alumno/ver-perfil-alumno.component';
import { ActividadRecienteComponent } from './profesores/actividad-reciente/actividad-reciente.component';
import { VerAlumnosPComponent } from './profesores/ver-alumnos-p/ver-alumnos-p.component';
import { EditarAlumnosCComponent } from './centros/editar-alumnos-c/editar-alumnos-c.component';
import { EditarProfesoresCComponent } from './centros/editar-profesores-c/editar-profesores-c.component';
import { EditarClasesCComponent } from './centros/editar-clases-c/editar-clases-c.component';
import { AlumnoLayoutComponent } from '../layouts/alumno-layout/alumno-layout.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { SidebarComponent } from '../commons/sidebar/sidebar.component';
import { PerfilAdminComponent } from './admin/perfil-admin/perfil-admin.component';
import { EditarAdminComponent } from './admin/editar-admin/editar-admin.component';
import { PerfilCentroComponent } from './centros/perfil-centro/perfil-centro.component';
import { EditarCentroComponent } from './centros/editar-centro/editar-centro.component';
import { PerfilProfesorComponent } from './profesores/perfil-profesor/perfil-profesor.component';
import { EditarProfesorComponent } from './profesores/editar-profesor/editar-profesor.component';

import {ThreejsComponent } from './alumnos/threejs/threejs.component';
import { ConversacionComponent } from './alumnos/conversacion/conversacion.component';
const routes: Routes = [
  { path: 'admin', component: AdminLayoutComponent, canActivate: [ AuthGuard ],
    children: [
      { path: 'dashboard', component: AdmindashboardComponent},
      { path: 'ver-alumnos', component: VerAlumnosComponent},
      { path: 'ver-centros', component: VerCentrosComponent},
      { path: 'ver-clases', component: VerClasesComponent},
      { path: 'ver-profesores', component: VerProfesoresComponent},
      { path: 'crear-alumnos', component: CrearAlumnosComponent},
      { path: 'crear-centros', component: CrearCentrosComponent},
      { path: 'crear-clases', component: CrearClasesComponent},
      { path: 'crear-profesores', component: CrearProfesoresComponent},
      { path: 'editar-alumnos', component: EditarAlumnosComponent},
      { path: 'editar-centros', component: EditarCentrosComponent},
      { path: 'editar-clases', component: EditarClasesComponent},
      { path: 'editar-profesores', component: EditarProfesoresComponent},
      { path: 'perfil', component: PerfilAdminComponent},
      { path: 'editar-admin', component: EditarAdminComponent},
      { path: '**', redirectTo: 'dashboard'},
  ]},
  {
    path: 'centros', component: AdminLayoutComponent, canActivate: [ AuthGuard ],
    children: [
      { path: 'dashboard', component: CentrosComponent},
      { path: 'ver-alumnos', component: VerAlumnosCComponent},
      { path: 'ver-profesores', component: VerProfesoresCComponent},
      { path: 'ver-clases', component: VerClasesCComponent},
      { path: 'crear-alumnos', component: CrearAlumnosCComponent},
      { path: 'crear-profesores', component: CrearProfesoresCComponent},
      { path: 'crear-clases', component: CrearClasesCComponent},
      { path: 'editar-alumnos', component: EditarAlumnosCComponent},
      { path: 'editar-profesores', component: EditarProfesoresCComponent},
      { path: 'editar-clases', component: EditarClasesCComponent},
      { path: 'perfil', component: PerfilCentroComponent},
      { path: 'editar-centro', component: EditarCentroComponent},
  ]},
  {
    path: 'profesores', component: AdminLayoutComponent, canActivate: [ AuthGuard ],
    children: [
      { path: 'dashboard', component: ProfesoresComponent},
      { path: 'ver-clases', component: VerClasesPComponent},
      { path: 'ver-perfil-alumno', component: VerPerfilAlumnoComponent},
      { path: 'actividad-reciente', component: ActividadRecienteComponent},
      { path: 'ver-alumnos', component: VerAlumnosPComponent},
      { path: 'perfil', component: PerfilProfesorComponent},
      { path: 'editar-profesor', component: EditarProfesorComponent},
    ]
  },
  { 
    path: 'alumnos', component: AlumnoLayoutComponent, canActivate: [ AuthGuard ],
    children: [
      { path: 'dashboard', component: AlumnosComponent},
      { path: 'sidebar', component: SidebarComponent },
      { path: 'threejs', component: ThreejsComponent},
      { path: 'conversacion', component: ConversacionComponent}
  ]}
  /*{ 
    path: 'dashboard', component: DashboardComponent,
    children: [
    { path: '', component: DashboardComponent},
    { path: '**', redirectTo: ''}
  ]},*/
  /*{ path: 'usuarios', component: UsuariosComponent}*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
