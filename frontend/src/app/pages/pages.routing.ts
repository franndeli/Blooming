import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { CentrosVistaComponent } from './centros-vista/centros-vista.component';
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
  /*{ 
    path: 'dashboard', component: DashboardComponent,
    children: [
    { path: '', component: DashboardComponent},
    { path: '**', redirectTo: ''}
  ]},*/
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'centrosvista', component: CentrosVistaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
