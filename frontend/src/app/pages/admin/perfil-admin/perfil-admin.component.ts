import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admins.service';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent implements OnInit {
  adminsData: any;
  id: any;

  constructor(private adminService: AdminService, private router: Router){
    this.adminsData = []
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.adminService.getAdmin(this.id).subscribe((res: any) => {
      this.adminsData = res.admins[0];
    })
  }
  
}
