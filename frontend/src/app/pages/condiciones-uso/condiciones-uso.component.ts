import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-condiciones-uso',
  templateUrl: './condiciones-uso.component.html',
  styleUrls: ['./condiciones-uso.component.css']
})
export class CondicionesUsoComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('rol')) {
      this.router.navigate(['/login']);
    }
  }
}