
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
    getClases(){
      this.getHeader();
      return this.http.get(this.basePath, this.httpOptions );
    }

    getClasesCentro(id: any){
      this.getHeader();
      return this.http.get(this.basePath+'?ID_Centro='+id, this.httpOptions);
    }

    getClasesPaginadas(desde: number, textoBusqueda?: string){
      this.getHeader();
      if(!desde){
        desde = 0;
      }
      if(!textoBusqueda){
        textoBusqueda = '';
      }
      return this.http.get(this.basePath+'?desde='+desde+'&texto='+textoBusqueda+'&paginado='+true, this.httpOptions);
    }

    getClasesCentroPag(id: any, desde: number, textoBusqueda?: string){
      this.getHeader();
      return this.http.get(this.basePath+'?ID_Centro='+id+'&desde='+desde+'&texto='+textoBusqueda+'&paginado='+true, this.httpOptions);
    }
  
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