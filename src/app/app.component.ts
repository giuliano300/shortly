import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../app/services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  
  constructor(public auth: AuthService) {}

  title = 'shortly';

  isMenuOpen: boolean = false; // Variabile per gestire la visibilità del menu

  // Funzione per alternare la visibilità del menu mobile
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.auth.logout();
  }
}
