import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Simular una carga de 2 segundos antes de redirigir al componente principal.
    setTimeout(() => {
      this.router.navigate(['/alumnos/conversacion']);
    }, 2000);
  }
}
