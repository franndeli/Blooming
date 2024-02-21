import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class ComponentsModule { }
