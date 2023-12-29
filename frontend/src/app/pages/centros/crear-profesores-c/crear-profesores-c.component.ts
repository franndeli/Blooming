import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfesorService } from '../../../services/profesores.service';
import { ClaseService } from '../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-profesores-c',
  templateUrl: './crear-profesores-c.component.html',
  styleUrl: './crear-profesores-c.component.css'
})
export class CrearProfesoresCComponent implements OnInit {

  sendForm: boolean=false;
  clasesData: any;
  private id: any;

  constructor(private fb:FormBuilder, private profesorService: ProfesorService, private router: Router, private claseService: ClaseService){
    this.clasesData = [];
  }

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    Apellidos: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    Contraseña: ['', [Validators.required]],
    ID_Centro: [localStorage.getItem('id'), [Validators.required]],
    ID_Clase: ['', [Validators.required]]
  });

  ngOnInit() {
    this.cargarClases();
  }

  cargarClases(){
    this.id = localStorage.getItem('id');
    this.claseService.getClasesCentro(this.id).subscribe(res => {
      this.clasesData = res;
    })
  }

  crearProfesor(){
    this.sendForm=true;
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.profesorService.postProfesor(this.form.value).subscribe(
        (response:any) => {
          this.router.navigate(['centros/ver-profesores']);
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
