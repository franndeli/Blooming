import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AdminService } from '../../../services/admins.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-admin',
  templateUrl: './editar-admin.component.html',
  styleUrl: './editar-admin.component.css'
})
export class EditarAdminComponent {
  
  constructor(private fb:FormBuilder, private adminService: AdminService, private router: Router){}

  public form = this.fb.group({
    ID_Admin: [localStorage.getItem('id')],
    Contraseña: [''],
    newPassword: [''],
    newPassword2: ['']
  });

  cambiarPwd(){
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.adminService.updateAdminPwd(this.form.value).subscribe(
        (response: any) => {
          this.router.navigate(['admin/perfil']);
        },
        (error) => {
          console.error('Error: ', error.error);
          Swal.fire(error.error.message);
        }
      );
    }
  }

}
