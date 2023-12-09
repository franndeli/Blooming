import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ClaseComponent } from "./clase.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Clase",
      urls: [{ title: "Clase", url: "/clase" }, { title: "Clase" }],
    },
    component: ClaseComponent,
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
export class ClaseModule {}
