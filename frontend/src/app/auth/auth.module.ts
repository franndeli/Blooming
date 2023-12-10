import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { RegistroComponent } from './registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
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
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ]
  })
  export class AuthModule { }
  
