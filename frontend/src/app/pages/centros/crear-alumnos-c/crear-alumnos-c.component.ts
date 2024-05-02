import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
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
  private numero: number = 0;

  constructor(private fb:FormBuilder, private alumnoService: AlumnoService, private router: Router, private claseService: ClaseService){
    this.clasesData = [];
  }

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    Apellidos: ['', [Validators.required]],
    EmailTutor: ['', [Validators.required, Validators.email]],
    Contraseña: ['', [Validators.required]],
    FechaNacimiento: ['', [Validators.required,  this.validateFechaNacimiento]],
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
      console.log(this.clasesData);
    })
  }

  crearAlumno(){
    this.sendForm=true;
    if(!this.form.valid){
      //console.log('Errores en el formulario');
    }else{
      this.alumnoService.postAlumno(this.form.value).subscribe(
        (response:any) => {
          this.contarAlumno(this.form.value.ID_Clase);
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

  contarAlumno(id: any){
    id = parseInt(id,10);
    for(let i=0; i < this.clasesData.clases.length; i++){
      if(this.clasesData.clases[i].ID_Clase === id){
        this.numero = this.clasesData.clases[i].NumAlumnos + 1;
        const datosActualizados = {
          ID_Clase: id,
          NumAlumnos: this.numero
        }
        
        this.claseService.putClase(datosActualizados).subscribe(
          (response: any) => {
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
        )
      }
    }
  }

  validarForm(campo: string){
    return this.form.get(campo)?.valid || !this.sendForm
  }

  validateFechaNacimiento(control: FormControl): { [s: string]: boolean } | null {
    const fechaNacimientoString = control.value as string | null; // Asegurar que pueda ser null
    if (!fechaNacimientoString) {
      return null; // Retornar null si el valor es null o undefined
    }
  
    const fechaNacimiento = new Date(fechaNacimientoString);
    if (isNaN(fechaNacimiento.getTime())) {
      return { 'invalidDate': true }; // Si la fecha no es válida, retornar error
    }
  
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  
    if (edad < 3 || edad > 15) {
      return { 'invalidEdad': true };
    }
    return null; // La fecha es válida y está dentro del rango
  }
  

}
