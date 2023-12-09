import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  templateUrl: './clase.component.html'
})
export class ClaseComponent{
    claseTitle: string = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        // Accede a los parámetros de la ruta
        this.route.params.subscribe(params => {
            // Recupera el valor del parámetro 'title'
            this.claseTitle = params['title'];
        });
    }

}
