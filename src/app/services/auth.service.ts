import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, UserCredential, authState, User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Users } from '../Interfaces/Users';
import { UsersService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private usersService: UsersService
    ) {}

  private auth = inject(Auth);
  private router = inject(Router);

  user$: Observable<User | null> = authState(this.auth);

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user));

  async login(email: string, password: string) {
    try 
    {
      createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const result = await signInWithEmailAndPassword(this.auth, email, password);

        const user = result.user;
        const u: Users = {
          name: user.displayName ?? email,
          email: user.email ?? email,
          pwd: '',
          subcribedFrom:'Website',
          createdAt: new Date()
        };

        this.saveUserRedirect(u);
      })
      .catch((error) => {
        console.error(error);
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
        this.router.navigate(['/']);
        
      }
    });
  }


  logout() {
    localStorage.removeItem('tokenEmail');
    localStorage.removeItem('tokenId');

    return this.auth.signOut().then(() => this.router.navigate(['/login']));
  }

}
