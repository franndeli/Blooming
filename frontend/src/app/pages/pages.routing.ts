import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { CentrosVistaComponent } from './centros-vista/centros-vista.component';
import { AdminComponent } from './admin/admin.component';
import { AlumnosComponent } from './admin/alumnos/alumnos.component';
import { CentrosComponent } from './admin/centros/centros.component';
import { ClasesComponent } from './admin/clases/clases.component';
import { ProfesoresComponent } from './admin/profesores/profesores.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CrearAlumnosComponent } from './admin/alumnos/crear-alumnos/crear-alumnos.component';
import { CrearCentrosComponent } from './admin/centros/crear-centros/crear-centros.component';
import { CrearClasesComponent } from './admin/clases/crear-clases/crear-clases.component';
import { CrearProfesoresComponent } from './admin/profesores/crear-profesores/crear-profesores.component';

const routes: Routes = [
  { path: 'admindashboard', component: AdminLayoutComponent,
    children: [
      { path: '**', redirectTo: 'admin'},
      { path: 'alumnos', component: AlumnosComponent},
      { path: 'centros', component: CentrosComponent},
      { path: 'clases', component: ClasesComponent},
      { path: 'profesores', component: ProfesoresComponent},
      { path: 'crear-alumnos', component: CrearAlumnosComponent},
      { path: 'crear-centros', component: CrearCentrosComponent},
      { path: 'crear-clases', component: CrearClasesComponent},
      { path: 'crear-profesores', component: CrearProfesoresComponent},
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
