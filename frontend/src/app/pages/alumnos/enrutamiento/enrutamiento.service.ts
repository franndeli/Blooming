import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EnrutamientoService {

  private listaComponentes: string[] = ['InterfazComponent', 'Interfaz2Component', 'Interfaz3Component'];
  private indiceComponenteActual: number = 0;
  
  constructor(private router: Router) { }

// Devolvemos el primer componente del arrat
  getComponenteInicial(): string {
    return this.listaComponentes[0]; 
  }
//Siguiente
getComponenteSiguiente(): string {
  if (this.indiceComponenteActual < this.listaComponentes.length - 1) {
    this.indiceComponenteActual++;
    return this.listaComponentes[this.indiceComponenteActual];
  } else {
    // Si ya se han mostrado todos los componentes, redirigir a /alumnos/dashboard
    this.router.navigateByUrl('/alumnos/dashboard');
   return "fin"; // O podrías retornar cualquier otra cosa, dependiendo de tu lógica
  }
}
}