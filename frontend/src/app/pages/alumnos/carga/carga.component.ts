import { Component, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { ConversacionComponent } from '../conversacion/conversacion.component';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements AfterViewInit {
  @ViewChild('conversacionContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.loadConversacionComponentInBackground();
  }

  private loadConversacionComponentInBackground() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConversacionComponent);
    const componentRef = this.container.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();

    // Simular una carga de 2 segundos antes de redirigir al componente principal.
    setTimeout(() => {
      this.router.navigate(['/alumnos/conversacion']);
    }, 2000);
  }
}
