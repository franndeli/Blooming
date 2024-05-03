import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AlumnoService } from '../../../services/alumnos.service';
import { ClaseService } from '../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-alumnos-c',
  templateUrl: './crear-alumnos-c.component.html',
  styleUrl: './crear-alumnos-c.component.css'
})
export class CrearAlumnosCComponent implements OnInit {

  sendForm: boolean=false;
  clasesData: any;
  private id: any;

  constructor(private fb:FormBuilder, private alumnoService: AlumnoService, private router: Router, private claseService: ClaseService){
    this.clasesData = [];
  }

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    Apellidos: ['', [Validators.required]],
    EmailTutor: ['', [Validators.required, Validators.email]],
    Contraseña: ['', [Validators.required]],
    FechaNacimiento: ['', [Validators.required]],
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

  crearAlumno(){
    this.sendForm=true;
    if(!this.form.valid){
      //console.log('Errores en el formulario');
    }else{
      this.alumnoService.postAlumno(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Alumno creado con éxito",
            text: "Se han enviado los datos de acceso al tutor por correo electrónico",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['centros/ver-alumnos']);
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
