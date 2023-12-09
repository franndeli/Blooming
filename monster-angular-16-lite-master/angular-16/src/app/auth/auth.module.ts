import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { AuthLayoutComponent } from '../layouts/full/auth-layout/auth-layout.component';


@NgModule({
    declarations: [
      LoginComponent,
      RecoveryComponent,
      AuthLayoutComponent,
    ],
    exports: [
        AuthLayoutComponent,
        LoginComponent,
        RecoveryComponent
    ],
    imports: [
      CommonModule,
      RouterModule
    ]
  })
  export class AuthModule { }
  
