import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { CentrosComponent } from './centros/centros.component';
import { AdminComponent } from './admin/admin.component';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CrearAlumnosComponent } from './admin/ver-alumnos/crear-alumnos/crear-alumnos.component';
import { CrearCentrosComponent } from './admin/ver-centros/crear-centros/crear-centros.component';
import { CrearClasesComponent } from './admin/ver-clases/crear-clases/crear-clases.component';
import { CrearProfesoresComponent } from './admin/ver-profesores/crear-profesores/crear-profesores.component';
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

const routes: Routes = [
  { path: 'admin', component: AdminLayoutComponent,
    children: [
      { path: 'admindashboard', component: AdmindashboardComponent},
      { path: 'ver-alumnos', component: VerAlumnosComponent},
      { path: 'ver-centros', component: VerCentrosComponent},
      { path: 'ver-clases', component: VerClasesComponent},
      { path: 'ver-profesores', component: VerProfesoresComponent},
      { path: 'crear-alumnos', component: CrearAlumnosComponent},
      { path: 'crear-centros', component: CrearCentrosComponent},
      { path: 'crear-clases', component: CrearClasesComponent},
      { path: 'crear-profesores', component: CrearProfesoresComponent},
      { path: '**', redirectTo: 'admindashboard'},
  ]},
  {
    path: 'centros', component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: CentrosComponent},
      { path: 'ver-alumnos', component: VerAlumnosCComponent},
      { path: 'ver-profesores', component: VerProfesoresCComponent},
      { path: 'ver-clases', component: VerClasesCComponent},
      { path: 'crear-alumnos', component: CrearAlumnosCComponent},
      { path: 'crear-profesores', component: CrearProfesoresCComponent},
      { path: 'crear-clases', component: CrearClasesCComponent},
  ]},
  /*{ 
    path: 'dashboard', component: DashboardComponent,
    children: [
    { path: '', component: DashboardComponent},
    { path: '**', redirectTo: ''}
  ]},*/
  { path: 'usuarios', component: UsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
