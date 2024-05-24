import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})


export class AdminLayoutComponent {
  constructor(private router: Router) {
    // suscríbete a los eventos del router
    this.router.events.subscribe((evt) => {
      // verifica si el evento es NavigationEnd
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      // usa el método scrollTo de window para desplazarte a la parte superior
      window.scrollTo(0, 0);
    });
  }
  ngOnInit() {
  }
}
