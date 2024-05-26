import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda-ambitos',
  templateUrl: './ayuda-ambitos.component.html',
  styleUrl: './ayuda-ambitos.component.css'
})
export class AyudaAmbitosComponent implements OnInit {
  ngOnInit(): void {
    if(localStorage.getItem('ID_Clase')){
      localStorage.removeItem('ID_Clase');
    }

    if(localStorage.getItem('ID_Alumno')){
      localStorage.removeItem('ID_Alumno');
    }
  }
}
