import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ActividadComponent } from "./actividad.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Actividad",
      urls: [{ title: "Actividad", url: "/actividad" }, { title: "Actividad" }],
    },
    component: ActividadComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [

  ],
})
export class ActividadModule {}
