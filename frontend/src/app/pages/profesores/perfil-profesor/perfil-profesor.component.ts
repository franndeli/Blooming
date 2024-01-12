import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesorService } from '../../../services/profesores.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrl: './perfil-profesor.component.css'
})
export class PerfilProfesorComponent implements OnInit {
  profesoresData: any;
  id: any;

  constructor(private profesorService: ProfesorService, private router: Router){
    this.profesoresData = []
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.profesorService.getProfesorID(this.id).subscribe((res: any) => {
      this.profesoresData = res.profesores[0];
    })
  }
}
