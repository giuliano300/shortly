import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes, routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../src/environments/environments';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';

export const api_url = "https://e5y.it/"

registerLocaleData(localeIt, 'it');

bootstrapApplication(AppComponent, {
  providers: [
    appRoutes,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideRouter(routes),
    provideHttpClient()
  ]

});
