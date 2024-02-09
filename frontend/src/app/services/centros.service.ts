import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  private basePath=`${environment.base_url}/centros/`;
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
  getCentros(){
    this.getHeader();
    return this.http.get(this.basePath, this.httpOptions );
  }

  getCentro(id: any){
    this.getHeader();
    return this.http.get(this.basePath+'?ID_Centro='+id, this.httpOptions);
  }

  getCentrosPaginados(desde: number, textoBusqueda?: string){
    this.getHeader();
    if(!desde){
      desde = 0;
    }
    if(!textoBusqueda){
      textoBusqueda = '';
    }
    return this.http.get(this.basePath+'?desde='+desde+'&texto='+textoBusqueda+'&paginado='+true, this.httpOptions);
  }

  deleteCentro(id:number){
    this.getHeader();
    return this.http.delete(this.basePath+id, this.httpOptions);
  }

  postCentro(formData: any){
    return this.http.post(this.basePath, formData);
  }

  putCentro(formData: any){
    this.getHeader();
    return this.http.put(this.basePath+formData.ID_Centro, formData, this.httpOptions);
  }

  updateCentroPwd(formData: any){
    this.getHeader();
    return this.http.put(this.basePath+'/newp/'+formData.ID_Centro, formData, this.httpOptions);
  }

}
