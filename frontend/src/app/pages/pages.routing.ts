import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
    children: [
    { path: '', component: DashboardComponent},
    { path: 'usuarios', component: UsuariosComponent},
    { path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
