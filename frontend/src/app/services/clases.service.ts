import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ClaseService {

  private claseID: any;

    private basePath=`${environment.base_url}/clases/`;
    private httpOptions: any;
    constructor(private http: HttpClient) { 
    }
    
    // Opciones Http
    private getHeader(){
      this.httpOptions = {
        headers: this.addToken(),
      };
    }
  
      private getToken(){
        let token;
        if (typeof localStorage !== 'undefined') {
          token = localStorage.getItem('token');
        } 
        return token;
      }
  
      private addToken(): HttpHeaders {
        const token = this.getToken();
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'x-token': `${token}`,
        });
      }
  
    //LLAMADAS API

    getClase(id: any){
      this.getHeader();
      return this.http.get(this.basePath+'?ID_Clase='+id, this.httpOptions);
    }

    getClases(desde?: number, filas?: number, textoBusqueda?: string){
      this.getHeader();
      if(!desde){
        desde = 0;
      }
      if(!filas){
        filas = 0;
      }
      if(!textoBusqueda){
        textoBusqueda = '';
      }
      return this.http.get(this.basePath+'?numFilas='+filas+'&desde='+desde, this.httpOptions);
    }

    getClasesCentro(id: any, desde?: number, filas?: number, textoBusqueda?: string){
      this.getHeader();
      if(!desde){
        desde = 0;
      }
      if(!filas){
        filas = 0;
      }
      if(!textoBusqueda){
        textoBusqueda = '';
      }
      return this.http.get(this.basePath+'?ID_Centro='+id+'&numFilas='+filas+'&desde='+desde, this.httpOptions);
    }

    // getClasesCentroEstado(id: any, estado: any, desde?: number, filas?: number){
    //   this.getHeader();
    //   if(!desde){
    //     desde = 0;
    //   }
    //   if(!filas){
    //     filas = 0;
    //   }
    //   return this.http.get(this.basePath+'?ID_Centro='+id+'&estado='+estado+'&numFilas='+filas+'&desde='+desde, this.httpOptions);
    // }
    
    deleteClase(id:number){
      this.getHeader();
      return this.http.delete(this.basePath+id, this.httpOptions);
    }
  
    postClase(formData: any){
      this.getHeader();
      return this.http.post(this.basePath, formData, this.httpOptions);
    }

    putClase(formData: any){
      this.getHeader();
      return this.http.put(this.basePath+formData.ID_Clase, formData, this.httpOptions);
    }

    setClaseID(id: any){
      this.claseID = id;
    }

    getClaseID(){
      return this.claseID;
    }

}