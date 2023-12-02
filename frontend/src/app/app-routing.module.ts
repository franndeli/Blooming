import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
const routes: Routes = [
  { path: 'auth', component: AuthLayoutComponent, // /auth
    children:[
      {path: 'login', component:LoginComponent },// /auth/login
      {path: 'recovery', component: RecoveryComponent } // /auth/recovery
    ]

  },
  {path: 'admin', component: AdminLayoutComponent}// /admin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
