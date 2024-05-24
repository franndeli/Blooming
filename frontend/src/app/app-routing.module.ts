import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { MatSidenavModule } from '@angular/material/sidenav';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { CondicionesUsoComponent } from './pages/condiciones-uso/condiciones-uso.component';
import { InformacionLegalComponent } from './pages/informacion-legal/informacion-legal.component';

const routes: Routes = [
  // login y recovery authroutingmodules
  // dashboard pagesroutingmodules
  { path: '**', redirectTo: 'inicio'},/*
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
  { path: 'cookies', component: CookiesComponent },
  { path: 'condiciones-uso', component: CondicionesUsoComponent },
  { path: 'informacion-legal', component: InformacionLegalComponent },*/

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