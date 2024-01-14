import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { MatSidenavModule } from '@angular/material/sidenav';

const routes: Routes = [
  // login y recovery authroutingmodules
  // dashboard pagesroutingmodules
  { path: '**', redirectTo: 'inicio'},
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