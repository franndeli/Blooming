import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ResultadoService {
    private basePath=`${environment.base_url}/resultados/`;
    constructor(private http: HttpClient) {}

    private httpOptions = {
        headers: new HttpHeaders ({
          'Content-Type': 'application/json'
        })
    }

    //LLAMADAS API
    getResultados(){
        return this.http.get(this.basePath);
    }

    getResultadoAlumno(id: any){
        return this.http.get(this.basePath+'?ID_Alumno='+id);
    }

    postResultado(resultadoData: any){
        return this.http.post(this.basePath, resultadoData, this.httpOptions);
    }

}