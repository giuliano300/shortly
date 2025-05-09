import { Routes } from '@angular/router';
import { ShortenerComponent } from './component/shortener/shortener.component';
import { LandingComponent } from './component/landing/landing.component';
import { FromCsvComponent } from './component/fromCsv/from-csv/from-csv.component';
import { LoginComponent } from './component/login/login/login.component';
import { authGuard } from './guard/auth.guard';
import { loginGuard } from './guard/login.guard';

export const routes: Routes = [
  {
    path: '',
    component:LandingComponent
  },
  {
    path: 'shortner',
    component:ShortenerComponent,
    canActivate: [authGuard]
  },
  {
    path: 'fromCsv',
    component:FromCsvComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component:LoginComponent,
    canActivate: [loginGuard]
  }
]