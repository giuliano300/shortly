import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss'
})
export class LandingComponent {

    user$: Observable<User | null>;

    constructor(private authService: AuthService) {
        this.user$ = this.authService.user$;
    }

}
