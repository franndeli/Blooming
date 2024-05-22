import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { MatSidenavModule } from '@angular/material/sidenav';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';

const routes: Routes = [
  // login y recovery authroutingmodules
  // dashboard pagesroutingmodules
  { path: '**', redirectTo: 'inicio'},
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },

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