import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { CentroService } from '../../../services/centros.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-centro',
  templateUrl: './editar-centro.component.html',
  styleUrl: './editar-centro.component.css'
})
export class EditarCentroComponent {

  constructor(private fb:FormBuilder, private centroService: CentroService, private router: Router){}

  public form = this.fb.group({
    ID_Centro: [localStorage.getItem('id')],
    Contraseña: [''],
    newPassword: [''],
    newPassword2: ['']
  });

  cambiarPwd(){
    if(!this.form.valid){
      //console.log('Errores en el formulario');
    }else{
      this.centroService.updateCentroPwd(this.form.value).subscribe(
        (response: any) => {
          Swal.fire({
            icon: "success",
            title: "Contraseña cambiada con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['centros/perfil']);
          });
        },
        (error) => {
          console.error('Error: ', error.error);
          Swal.fire(error.error.message);
        }
      );
    }
  }
}
