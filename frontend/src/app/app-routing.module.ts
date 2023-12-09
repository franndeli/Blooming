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

const routes: Routes = [
  // login y recovery authroutingmodules
  // dashboard pagesroutingmodules
  //{ path: '**', redirectTo: 'login'},
  { path: 'admin', component: AdminLayoutComponent,
  children: [
    { path: '', component: AdminLayoutComponent},
    { path: '**', redirectTo: ''}                  
  ]},
  { path: 'centros', component: CentrosComponent,
  children: [
    { path: '', component: CentrosComponent},
    { path: '**', redirectTo: ''}                  
  ]}
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
