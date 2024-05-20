import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AlumnoService } from '../../../services/alumnos.service';
import { CentroService } from '../../../services/centros.service';
import { ClaseService } from '../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-alumnos',
  templateUrl: './crear-alumnos.component.html',
  styleUrl: './crear-alumnos.component.css'
})
export class CrearAlumnosComponent implements OnInit, OnChanges {

  sendForm: boolean=false;
  centrosData: any;
  clasesData: any;
  centroID: any;
  private numero: number = 0;

  constructor(private fb:FormBuilder, private alumnoService: AlumnoService, private router: Router, private centroService: CentroService, private claseService: ClaseService){
    this.centrosData = [];
    this.clasesData = [];
  }

  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    Apellidos: ['', [Validators.required]],
    EmailTutor: ['', [Validators.required, Validators.email]],
    Contraseña: ['', [Validators.required]],
    FechaNacimiento: ['', [Validators.required]],
    ID_Centro: ['', [Validators.required]],
    ID_Clase: ['', [Validators.required]]
  });

  ngOnInit() {
    this.cargarCentros();
  }

  ngOnChanges(event: any) {
    this.centroID = event.target.value;
    this.cargarClases(this.centroID);
  }

  cargarCentros(){
    this.centroService.getCentros().subscribe(res => {
      this.centrosData = res;
    })
  }

  cargarClases(centroID: any){
    this.claseService.getClasesCentro(centroID).subscribe(res => {
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
          this.contarAlumno(this.form.value.ID_Clase);
          Swal.fire({
            icon: "success",
            title: "Alumno creado con éxito",
            text: "Se han enviado los datos de acceso al tutor por correo electrónico",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['admin/ver-alumnos']);
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
    this.claseService.getClase(id).subscribe((res: any) => {
      this.numero = res.clases[0].NumAlumnos + 1;
      const datosActualizados = {
        ID_Clase: id,
        NumAlumnos: this.numero
      }
      this.claseService.putClase(datosActualizados).subscribe(
        (response: any) => {
          //console.log('Clase actualizada exitosamente');
        },
        (error) => {
          console.error('Error de creación');
        }
      )
    });
  }

  validarForm(campo: string){
    return this.form.get(campo)?.valid || !this.sendForm
  }

}
