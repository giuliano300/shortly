import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../../Interfaces/Users';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    username = '';
    password = '';
    errorMessage: string | null = null;
    tokenEmail: string | null = null;
    user: Users | null = null;

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    });

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}
    
    onSubmit() {
        if (this.form.valid) {
        this.errorMessage = null; 

        this.auth.login(this.form.value.email!, this.form.value.password!)
        }
        else
            this.errorMessage = "Errore nella compilazione del form"
    }

    loginWithGoogle() {
        this.auth.loginWithGoogle().catch(err => console.error(err));
    }

    loginWithGitHub() {
        this.auth.loginWithGitHub().catch(err => console.error(err));
    }
}
