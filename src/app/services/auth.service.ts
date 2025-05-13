import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, UserCredential, authState, User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Users } from '../Interfaces/Users';
import { UsersService } from './user.service';
import { ErrorDialogComponent } from '../component/error-dialog/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private usersService: UsersService,
        private dialog: MatDialog
    ) {}

  private auth = inject(Auth);
  private router = inject(Router);

  user$: Observable<User | null> = authState(this.auth);

  private emailSubject = new BehaviorSubject<string | null>(localStorage.getItem('tokenEmail'));
  email$ = this.emailSubject.asObservable();

  private idSubject = new BehaviorSubject<string | null>(localStorage.getItem('tokenId'));
  id$ = this.idSubject.asObservable();


  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user));

  async login(email: string, password: string) {
    try 
    {
      createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const result = await signInWithEmailAndPassword(this.auth, email, password);

        const user = result.user;
        const u: Users = {
          name: email,
          email: email,
          pwd: '',
          subcribedFrom:'Website',
          createdAt: new Date()
        };

        this.saveUserRedirect(u);
      })
      .catch((error) => {
          if (error.code === 'auth/email-already-in-use') 
          {
            this.dialog.open(ErrorDialogComponent, {
              panelClass: 'no-border-radius-dialog',
              data: {
                title: 'Errore login',
                message: 'Questa email è già registrata. Se hai usato Google o GitHub, prova ad accedere con quel provider.'
              }
            });          
          } 
          else 
          {
            console.error(error);
          }
        });
    } 
    catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result: UserCredential = await signInWithPopup(this.auth, provider);
    const usr = result.user;

    const u: Users = {
      name: usr.displayName ?? usr.email ?? 'Google User',
      email: usr.email ?? '',
      pwd: '',          
      subcribedFrom:'Google',
      createdAt: new Date()
    };

    this.saveUserRedirect(u);
  }


  async loginWithGitHub() {
    const provider = new GithubAuthProvider();
    const result: UserCredential = await signInWithPopup(this.auth, provider);
    const usr = result.user.providerData[0];

    const u: Users = {
      name: usr.displayName ?? usr.email ?? 'GitHub User',
      email: usr.email ?? '',
      pwd: '',
      subcribedFrom:'GitHub',
      createdAt: new Date()
    };

    this.saveUserRedirect(u);
  }

  private saveUserRedirect(u: Users) {
    this.usersService.setUser(u).subscribe((data: Users) => {
      if (data != null) {
        localStorage.setItem('tokenEmail', data.email);
        localStorage.setItem('tokenId', data.id!.toString());
        this.updateUser(data.email, data.id!.toString())
        
        this.router.navigate(['/']);
        
      }
    });
  }

  
  updateUser(email: string, id: string): void {
    localStorage.setItem('tokenEmail', email);
    this.emailSubject.next(email); 

    localStorage.setItem('tokenId', id);
    this.idSubject.next(id); 
  }

  logout() {
    localStorage.removeItem('tokenEmail');
    localStorage.removeItem('tokenId');

    return this.auth.signOut().then(() => this.router.navigate(['/login']));
  }

}
