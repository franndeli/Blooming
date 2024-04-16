import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ClaseService } from '../../../services/clases.service';
import { CentroService } from '../../../services/centros.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-clases',
  templateUrl: './crear-clases.component.html',
  styleUrl: './crear-clases.component.css'
})
export class CrearClasesComponent implements OnInit {
  
  sendForm: boolean=false;
  centrosData: any;

  constructor(private fb:FormBuilder, private claseService: ClaseService, private router: Router, private centroService: CentroService){
    this.centrosData = [];
  }

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    ID_Centro: ['', [Validators.required]],
    NumAlumnos: ['', [Validators.required]]
  });

  ngOnInit() {
    this.cargarCentros();
  }

  cargarCentros(){
    this.centroService.getCentros().subscribe(res => {
      this.centrosData = res;
    })
  }

  crearClase(){
    this.sendForm=true;
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.claseService.postClase(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Clase creada con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['admin/ver-clases']);
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
