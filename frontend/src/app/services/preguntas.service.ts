import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PreguntaService {
    private basePath=`${environment.base_url}/preguntas/`;
    constructor(private http: HttpClient) {}

    private httpOptions = {
        headers: new HttpHeaders ({
          'Content-Type': 'application/json'
        })
    }

    //LLAMADAS API
    getPreguntas(){
        return this.http.get(this.basePath);
    }

    getPreguntaID(id: any){
        return this.http.get(this.basePath+'?ID_Pregunta='+id);
    }
}