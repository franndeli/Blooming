import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class ComponentsModule { }
