import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';

import { LoginComponent } from '../auth/login/login.component';
import { RecoveryComponent } from '../auth/recovery/recovery.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: 'login', component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent},
      { path: '**', redirectTo: ''}                  
    ]
  },
  { path: 'recovery', component: AuthLayoutComponent,
    children: [
      { path: '', component: RecoveryComponent},
      { path: '**', redirectTo: ''}                  
    ]
  },
  { path: 'registro', component: AuthLayoutComponent,
    children: [
      { path: '', component: RegistroComponent},
      { path: '**', redirectTo: ''}                  
    ]
  },
  { path: 'inicio', component: AuthLayoutComponent,
    children: [
      { path: '', component: InicioComponent},
      { path: '**', redirectTo: ''}                  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
