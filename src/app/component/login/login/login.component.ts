import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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


    errorMessage: string | null = null;
    tokenEmail: string | null = null;
    user: Users | null = null;
    form!: FormGroup;

    constructor(
        private auth: AuthService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: new FormControl('', {
            validators: [Validators.required, Validators.email],
            asyncValidators: [],
            updateOn: 'change' // Specifica quando il controllo viene aggiornato
            }),
            password: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6)],
            asyncValidators: [],
            updateOn: 'change'
            })
        });
    }

    get username() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }
            
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
