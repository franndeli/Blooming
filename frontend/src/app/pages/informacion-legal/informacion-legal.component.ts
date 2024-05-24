import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-legal',
  templateUrl: './informacion-legal.component.html',
  styleUrl: './informacion-legal.component.css'
})
export class InformacionLegalComponent {
  constructor(private router: Router) {}
  
  ngOnInit() {
    if (!localStorage.getItem('rol')) {
      this.router.navigate(['/login']);
    }
  }
}
