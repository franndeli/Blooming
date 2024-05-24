import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css'
})
export class CookiesComponent {
  constructor(private router: Router) {}
  ngOnInit() {
    if (!localStorage.getItem('rol')) {
      this.router.navigate(['/login']);
    }
  }
}
