import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalRegistros: number = 0;
  @Input() registroActual: number = 0;
  @Input() registroPag: number = 5;
  @Input() texto: boolean = false;
  
  @Output() cambiarPag:EventEmitter<number> = new EventEmitter();

  public pagActual = 0;
  public ultimaPag = 0;
  public prepost = 1;
  public listaPags: any;
  public registroHasta = 0;
  constructor(){
    this.listaPags = []
  }

  ngOnInit() {
    this.calcularPaginas();
  }

  ngOnChanges() {
    this.calcularPaginas();
  }

  calcularPaginas(){
    if(this.totalRegistros === 0){
      this.pagActual = 0;
      this.ultimaPag = 0;
      this.listaPags = [];
      return;
    }
    this.registroHasta = ( this.registroActual + this.registroPag - 1 <= this.totalRegistros ? this.registroActual + this.registroPag - 1 : this.totalRegistros);
    if(this.registroActual > this.totalRegistros){
      this.registroActual = this.totalRegistros;
    }
    this.pagActual = Math.trunc(this.registroActual/this.registroPag) + 1;
    this.ultimaPag = Math.trunc((this.totalRegistros - 1)/this.registroPag) + 1;
    const desde = (this.pagActual - this.prepost > 0 ? this.pagActual - this.prepost : 1);
    const hasta = (this.pagActual + this.prepost < this.ultimaPag ? this.pagActual + this.prepost : this.ultimaPag);
    this.listaPags = [];
    for(let i = desde; i <= hasta; i++){
      this.listaPags.push(i);
    }
  }

  cambiaPagina( nueva: number){
    this.cambiarPag.emit(nueva);
  }
  
}
