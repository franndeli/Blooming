import { Component } from '@angular/core';
import { navbarItem } from '../../interfaces/navbar.interface';
import { NavbarService } from '../../services/navbar.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menu1: navbarItem[] = [];
  constructor (private navbar: NavbarService,
                private authService: AuthService ) {}

  ngOnInit(): void {
    this.menu1 = this.navbar.getnavbar();
  }

  logout(){
    this.authService.logout();
  }
}
