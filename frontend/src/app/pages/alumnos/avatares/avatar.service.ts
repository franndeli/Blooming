import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  //ALMACENAMOS EL NOMBRE DEL AVATAR SELECIONADO.
  public avatarSeleccionado : string |null = null;
  constructor() { }
}