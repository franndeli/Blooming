import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentroService } from '../../../services/centros.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-centros',
  templateUrl: './editar-centros.component.html',
  styleUrl: './editar-centros.component.css'
})
export class EditarCentrosComponent implements OnInit {

  centrosData: any = [];

  constructor(private fb:FormBuilder, private centroService: CentroService, private router: Router, private activatedRoute: ActivatedRoute){}

  public form = this.fb.group({
    ID_Centro: [''],
    Nombre: [''],
    Email: ['', [Validators.email]],
    Calle: [''],
    CP: [''],
    Localidad: [''],
    Provincia: ['']
  });

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.centrosData = history.state.centro;
      this.form.patchValue({
        ID_Centro: this.centrosData.ID_Centro,
        Nombre: this.centrosData.Nombre,
        Email: this.centrosData.Email,
        Calle: this.centrosData.Calle,
        CP: this.centrosData.CP,
        Localidad: this.centrosData.Localidad,
        Provincia: this.centrosData.Provincia
      });
    });
  }

  actualizarCentro(){
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.centroService.putCentro(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Centro editado con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['admin/ver-centros']);
          });
        },
        (error) => {
          console.error('Error de edición:', error);
          Swal.fire(error.error.message);
        }
      );
    }
  }

}
