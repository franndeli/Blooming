import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
    declarations: [
      LoginComponent,
      RecoveryComponent,
      AuthLayoutComponent,
      RegistroComponent,
      InicioComponent
    ],
    exports: [
        AuthLayoutComponent,
        LoginComponent,
        RecoveryComponent,
        RegistroComponent
    ],
    imports: [
      CommonModule,
      RouterModule, 
    ]
  })
  export class AuthModule { }
  
