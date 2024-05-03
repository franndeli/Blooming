import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CentroService } from '../../../services/centros.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-centros',
  templateUrl: './crear-centros.component.html',
  styleUrl: './crear-centros.component.css'
})
export class CrearCentrosComponent {
  sendForm: boolean=false;

  constructor(private fb:FormBuilder, private centroService: CentroService, private router: Router){}

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    Contraseña: ['', [Validators.required]],
    Calle: ['', [Validators.required]],
    CP: ['', [Validators.required]],
    Localidad: ['', [Validators.required]],
    Provincia: ['', [Validators.required]]
  });

  crearCentro(){
    this.sendForm=true;
    if(!this.form.valid){
      //console.log('Errores en el formulario');
    }else{
      this.centroService.postCentro(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Centro creado con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['admin/ver-centros']);
          });
        },
        (error) => {
          console.error('Error de creación:', error);
          Swal.fire(error.error.message);
        }
      );
    }
  }

  validarForm(campo: string){
    return this.form.get(campo)?.valid || !this.sendForm
  }
}
