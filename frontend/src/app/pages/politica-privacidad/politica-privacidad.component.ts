import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-politica-privacidad',
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.css'
})
export class PoliticaPrivacidadComponent {
  constructor(private router: Router) {}
  ngOnInit() {
    if (!localStorage.getItem('rol')) {
      this.router.navigate(['/login']);
    }
  }
}
