import { Injectable } from '@angular/core';
import { SesionService } from '../../sesiones.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  public mostrarContador: boolean = true;
  public countdownTime: number = 0;

  constructor(private sesionService: SesionService) {
  }

  async initializeState(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const alumnoID = localStorage.getItem('id');
      if (alumnoID) {
        this.sesionService.getSesionesAlumnoID(alumnoID).subscribe({
          next: (response: any) => {
            if (response.ok && response.sesiones.length > 0) {
              console.log("Existen sesiones, vamos a calcularlas");
              this.handleSesiones(response.sesiones);
              resolve();  // Resuelve la promesa cuando la operación es exitosa
            } else {
              this.setMostrarContador(false);
              resolve();  // También resolvemos aquí porque se completó la lógica, aunque no había sesiones
            }
          },
          error: (error) => {
            console.error("Error al obtener sesiones:", error);
            reject(error);  // Rechaza la promesa si hay un error
          }
        });
      } else {
        // Si no hay alumnoID, rechazamos la promesa
        reject('No alumnoID found in localStorage');
      }
    });
  }

  private handleSesiones(sesiones: any[]) {
    const latestSession = sesiones[sesiones.length - 1];
    console.log(latestSession);
    const now = new Date();

    // Fecha y hora de la última sesión
    const fechaParts = latestSession.FechaFin.Fecha.split('-'); // Dividir la fecha 'DD-MM-YYYY'
    const fechaReformateada = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`; // Reformatear a 'YYYY-MM-DD'
    const lastSessionDate = new Date(`${fechaReformateada}T${latestSession.FechaFin.Hora}`);

    // Fecha de reinicio basada en la hora actual
    const resetHour = 15; // El cuestionario se reinicia a las 15:00
    const lastReset = new Date(now); // Última fecha de reinicio
    lastReset.setHours(resetHour, 0, 0, 0);

    // Ajuste si ya pasó la hora de reinicio hoy
    if (now.getHours() < resetHour) {
        lastReset.setDate(lastReset.getDate() - 1);
    }

    console.log("Ultimo reseteo", lastReset);

    // Calcular el próximo reinicio
    const nextReset = new Date(lastReset);
    nextReset.setDate(nextReset.getDate() + 1);

    console.log("Próximo reseteo", nextReset);

    console.log("Última sesión hecha", lastSessionDate );

    // Verificar si la última sesión fue después del último reinicio y antes del próximo
    if (lastSessionDate >= lastReset && lastSessionDate < nextReset) {
        // El usuario ya hizo el cuestionario después del último reinicio
        this.setMostrarContador(true)
    } else {
        // La última sesión fue antes del último reinicio
        this.setMostrarContador(false)
    }
  }

  public setMostrarContador(value: boolean): void {
    this.mostrarContador = value;
    localStorage.setItem('mostrarContador', value.toString());
    if (!value) {
      this.calculateTimeUntilNextPeriod();
    }
  }

  public calculateTimeUntilNextPeriod(): { hours: number, minutes: number, seconds: number } {
    //this.mostrarContador = false;
    if(this.mostrarContador === true){
      const now = new Date();
      //console.log(now);
      const resetHour = 15;
      const resetTime = new Date(now);
      resetTime.setHours(resetHour, 0, 0, 0);

      if (now >= resetTime) {
      resetTime.setDate(resetTime.getDate() + 1);
      }

      const timeDifference = resetTime.getTime() - now.getTime();

      this.countdownTime = timeDifference;

      if(this.countdownTime > 0){
        this.mostrarContador = true;
        localStorage.setItem('mostrarContador', 'true');
      }
      
      if (this.countdownTime < 150) {
        this.mostrarContador = false;
        localStorage.setItem('mostrarContador', 'false');
      }

      return {
          hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((timeDifference / (1000 * 60)) % 60),
          seconds: Math.floor((timeDifference / 1000) % 60),
      };
    } else {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0,
        }; 
    } 
  }

  /*public calculateTimeUntilNextPeriod(): void {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(15, 0, 0, 0); // Next reset at 15:00 tomorrow

    const msUntilReset = tomorrow.getTime() - now.getTime();
    this.countdownTime = msUntilReset;

    if (msUntilReset < 150) {
      this.setMostrarContador(false);
    }
  }*/

  public clearCache(): void {
    this.countdownTime = 0;
  }
}
