import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './commons/footer/footer.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CentrosComponent } from './layouts/admin-layout/centros/centros.component';
import { CrearCentrosComponent } from './layouts/admin-layout/centros/crear-centros/crear-centros.component';
import { ProfesoresComponent } from './layouts/admin-layout/profesores/profesores.component';
import { AlumnosComponent } from './layouts/admin-layout/alumnos/alumnos.component';
import { ClasesComponent } from './layouts/admin-layout/clases/clases.component';
import { CrearAlumnosComponent } from './layouts/admin-layout/alumnos/crear-alumnos/crear-alumnos.component';
import { CrearClasesComponent } from './layouts/admin-layout/clases/crear-clases/crear-clases.component';
import { CrearProfesoresComponent } from './layouts/admin-layout/profesores/crear-profesores/crear-profesores.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CentrosComponent,
    CrearCentrosComponent,
    ProfesoresComponent,
    AlumnosComponent,
    ClasesComponent,
    CrearAlumnosComponent,
    CrearClasesComponent,
    CrearProfesoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
