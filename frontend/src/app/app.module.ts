import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './commons/footer/footer.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CentrosComponent } from './pages/admin/centros/centros.component';
import { CrearCentrosComponent } from './pages/admin/centros/crear-centros/crear-centros.component';
import { ProfesoresComponent } from './pages/admin/profesores/profesores.component';
import { AlumnosComponent } from './pages/admin/alumnos/alumnos.component';
import { ClasesComponent } from './pages/admin/clases/clases.component';
import { CrearAlumnosComponent } from './pages/admin/alumnos/crear-alumnos/crear-alumnos.component';
import { CrearClasesComponent } from './pages/admin/clases/crear-clases/crear-clases.component';
import { CrearProfesoresComponent } from './pages/admin/profesores/crear-profesores/crear-profesores.component';

import { CommonModule } from '@angular/common';
import { CommonsModule } from './commons/commons.module';

@NgModule({
  declarations: [
    AppComponent,
    /*FooterComponent,
    CentrosComponent,
    CrearCentrosComponent,
    ProfesoresComponent,
    AlumnosComponent,
    ClasesComponent,
    CrearAlumnosComponent,
    CrearClasesComponent,
    CrearProfesoresComponent*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule,
    CommonModule,
    CommonsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
