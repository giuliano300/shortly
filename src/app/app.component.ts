import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { UsersService } from './services/user.service';
import AOS from 'aos';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  
  constructor(public auth: AuthService, private userService: UsersService) {}

  userEmail: string | null = null;

  title = 'shortly';

  isMenuOpen: boolean = false; 
  isDropdownOpen: boolean = false; // Stato del menu a tendina
   @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle della visibilità del menu
  }

  ngOnInit(): void {
    this.auth.email$.subscribe(email => {
      this.userEmail = email;  
    });
    AOS.init({
        duration: 1000,
        once: true
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.auth.logout();
    this.isDropdownOpen = false;
  }

  // Ascolta il clic fuori dal menu
  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: MouseEvent) {
    if (this.dropdownMenu && !this.dropdownMenu.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}
