import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { MatSidenavModule } from '@angular/material/sidenav';
import { CentrosComponent } from './layouts/admin-layout/centros/centros.component';
import { CrearCentrosComponent } from './layouts/admin-layout/centros/crear-centros/crear-centros.component';
import { ProfesoresComponent } from './layouts/admin-layout/profesores/profesores.component';
import { AlumnosComponent } from './layouts/admin-layout/alumnos/alumnos.component';
import { ClasesComponent } from './layouts/admin-layout/clases/clases.component';
import { CrearProfesoresComponent } from './layouts/admin-layout/profesores/crear-profesores/crear-profesores.component';
import { CrearAlumnosComponent } from './layouts/admin-layout/alumnos/crear-alumnos/crear-alumnos.component';
import { CrearClasesComponent } from './layouts/admin-layout/clases/crear-clases/crear-clases.component';
import { InicioComponent } from './auth/inicio/inicio.component';

const routes: Routes = [
  // login y recovery authroutingmodules
  // dashboard pagesroutingmodules
  //{ path: '**', redirectTo: 'login'},
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },  
  { path: 'inicio', component: InicioComponent },    
  { path: 'admin', component: AdminLayoutComponent,
  children: [
    { path: '', component: AdminLayoutComponent},
    { path: '**', redirectTo: ''}                  
  ]},
  { path: 'centros', component: CentrosComponent,
  children: [
    { path: '', component: CentrosComponent},
    { path: '**', redirectTo: ''}                  
  ]},
  { path: 'crear-centros', component: CrearCentrosComponent,
  children: [
    { path: '', component: CrearCentrosComponent},
    { path: '**', redirectTo: ''}                  
  ]},
  { path: 'profesores', component: ProfesoresComponent,
  children: [
    { path: '', component: ProfesoresComponent},
    { path: '**', redirectTo: ''}                  
  ]},
  { path: 'crear-profesores', component: CrearProfesoresComponent,
  children: [
    { path: '', component: CrearProfesoresComponent},
    { path: '**', redirectTo: ''}                  
  ]},
  { path: 'alumnos', component: AlumnosComponent,
  children: [
    { path: '', component: AlumnosComponent},
    { path: '**', redirectTo: ''}                  
  ]},
  { path: 'crear-alumnos', component: CrearAlumnosComponent,
  children: [
    { path: '', component: CrearAlumnosComponent},
    { path: '**', redirectTo: ''}                  
  ]},
  { path: 'clases', component: ClasesComponent,
  children: [
    { path: '', component: ClasesComponent},
    { path: '**', redirectTo: ''}                  
  ]},
  { path: 'crear-clases', component: CrearClasesComponent,
  children: [
    { path: '', component: CrearClasesComponent},
    { path: '**', redirectTo: ''}                  
  ]},
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: 
  [RouterModule.forRoot(routes),
  AuthRoutingModule,
  PagesRoutingModule,
  MatSidenavModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
