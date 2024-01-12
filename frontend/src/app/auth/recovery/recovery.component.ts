import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css'
})
export class RecoveryComponent {
  constructor() { }

  ngOnInit(): void {
  }

  recover() {
    Swal.fire( {
      title:'Recuperar desactivado', 
      text: 'Para recuperar tu contraseña ponte en contacto con blooming.abp@gmail.com', 
      icon: 'warning', 
      allowOutsideClick: false});
  }
}
