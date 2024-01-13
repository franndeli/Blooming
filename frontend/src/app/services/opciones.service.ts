import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OpcionService {
    private basePath=`${environment.base_url}/opciones/`;
    constructor(private http: HttpClient) {}

    private httpOptions = {
        headers: new HttpHeaders ({
          'Content-Type': 'application/json'
        })
    }

    //LLAMADAS API
    getOpciones(){
        return this.http.get(this.basePath);
    }

    getOpcionesPregunta(id: any){
        return this.http.get(this.basePath+'?ID_Pregunta='+id);
    }
}