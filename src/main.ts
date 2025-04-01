import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

// Merge the existing providers with the new ones
const mergedProviders = [
  ...appConfig.providers,
  provideHttpClient(),
  provideOAuthClient()
];

bootstrapApplication(AppComponent, {
  providers: mergedProviders
})
.catch((err) => console.error(err));
