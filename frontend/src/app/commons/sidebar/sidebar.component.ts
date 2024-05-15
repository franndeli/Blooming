import { Component, OnInit } from '@angular/core';
import { sidebarItem } from '../../interfaces/sidebar.interface';
import { SidebarService } from '../../services/sidebar.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  menu: sidebarItem[] = [];
  userRole: string | null = null;
  
  constructor (private sidebar: SidebarService) { }

  ngOnInit(): void {
    this.menu = this.sidebar.getmenu();
    this.userRole = localStorage.getItem('rol');
  }
}
