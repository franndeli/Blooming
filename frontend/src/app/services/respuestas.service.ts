import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RespuestaService {
    private basePath=`${environment.base_url}/resultados/`;
    constructor(private http: HttpClient) {}

    private httpOptions = {
        headers: new HttpHeaders ({
          'Content-Type': 'application/json'
        })
    }

    //LLAMADAS API
    getRespuesta(){
        return this.http.get(this.basePath);
    }

    getRespuestasAlumno(id: any){
        return this.http.get(this.basePath+'?ID_Alumno='+id);
    }

    postRespuesta(resultadoData: any){
        return this.http.post(this.basePath, resultadoData, this.httpOptions);
    }

}