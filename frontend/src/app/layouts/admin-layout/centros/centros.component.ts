import { Component, AfterViewInit  } from '@angular/core';
import { CentroService } from '../../../services/centros.service';

import { Centro } from '../../../interfaces/centros.interface'

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrl: './centros.component.css'
})
export class CentrosComponent implements AfterViewInit  {

  centrosData: any;

  constructor(private centroService: CentroService){
    this.centrosData = [];
  }

  ngAfterViewInit() {
    this.tryLocalStorage();
  }

  tryLocalStorage(){
    this.getCentros();
  }

  getCentros(){
    this.centroService.getCentros().subscribe(res => {
      console.log(res);
      this.centrosData = res;
    })
  }
}
