import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfesorService } from '../../../services/profesores.service';
import { CentroService } from '../../../services/centros.service';
import { ClaseService } from '../../../services/clases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-profesores',
  templateUrl: './crear-profesores.component.html',
  styleUrl: './crear-profesores.component.css'
})
export class CrearProfesoresComponent implements OnInit, OnChanges {

  sendForm: boolean=false;
  centrosData: any;
  clasesData: any;
  centroID: any;

  constructor(private fb:FormBuilder, private profesorService: ProfesorService, private router: Router, private centroService: CentroService, private claseService: ClaseService){
    this.centrosData = [];
    this.clasesData = [];
  }
  
  public form = this.fb.group({
    Nombre: ['', [Validators.required]],
    Apellidos: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    Contraseña: ['', [Validators.required]],
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

  crearProfesor(){
    this.sendForm=true;
    if(!this.form.valid){
      console.log('Errores en el formulario');
    }else{
      this.profesorService.postProfesor(this.form.value).subscribe(
        (response:any) => {
          Swal.fire({
            icon: "success",
            title: "Profesor creado con éxito",
            text: "El profesor recibirá los datos de acceso por correo electrónico",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['admin/ver-profesores']);
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
