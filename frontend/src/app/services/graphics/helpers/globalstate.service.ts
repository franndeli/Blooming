import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  public isTimeToShow: boolean = true;
  public countdownTime: number = 0; // Inicializar con 0
  public parao: boolean = false;

  constructor() { 
    this.calculateTimeUntilNextPeriod();
  }

  public calculateTimeUntilNextPeriod(): { hours: number, minutes: number, seconds: number } {
    if(this.parao === false){
        const now = new Date();
        const resetHour = 15;
        const resetTime = new Date(now);
        resetTime.setHours(resetHour, 0, 0, 0);

        if (now >= resetTime) {
        resetTime.setDate(resetTime.getDate() + 1);
        }

        const timeDifference = resetTime.getTime() - now.getTime();

        this.countdownTime = timeDifference;
        if(this.countdownTime > 0){
            this.isTimeToShow = false;
            this.parao = true;
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
}
