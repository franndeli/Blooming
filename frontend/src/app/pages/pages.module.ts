import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../commons/sidebar/sidebar.component';
import { NavbarComponent } from '../commons/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CentrosVistaComponent } from './centros-vista/centros-vista.component';
import { SidebarCentroComponent } from '../commons/sidebar-centro/sidebar-centro.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { AlumnosComponent } from './admin/alumnos/alumnos.component';
import { CommonsModule } from '../commons/commons.module';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';


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

    AdmindashboardComponent
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
