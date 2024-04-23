import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarService } from './avatar.service';

@Component({
  selector: 'app-avatares',
  templateUrl: './avatares.component.html',
  styleUrl: './avatares.component.css'
})
export class AvataresComponent {
  
  selectedAvatar: string | null = null;

  constructor(private router: Router, private avatarService: AvatarService) {}
  
  selectAvatar(avatarName: string) {
    // Oculta todas las tarjetas
    const cards = document.querySelectorAll('.avatar-card');
    cards.forEach(card => {
      card.classList.add('hidden');
     
    });
    this.selectedAvatar = avatarName;
    this.avatarService.avatarSeleccionado = avatarName;

  }

  empezar() {

    this.router.navigate(['alumnos/sistema-preguntas']);
   
  }
}