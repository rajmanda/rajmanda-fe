import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authCodeFlowConfig } from './auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService, private router: Router, private http: HttpClient) {
    this.configureOAuth();

    // Listen to OAuth events to handle token expiration, refresh, or logout
    this.oauthService.events.subscribe((event) => {
      console.log('OAuth Event:', event); // Debug log for OAuth events
      if (event.type === 'token_received' || event.type === 'token_refreshed') {
        console.log('Token received or refreshed');
        this.router.navigate(['/home']); // Redirect to home page after token received or refreshed
      } else if (event.type === 'logout') {
        console.log('User logged out');
        this.router.navigate(['/login']); // Redirect to login page
      } else if (event.type === 'token_expires') {
        console.warn('Access token is about to expire');
        this.refreshToken(); // Refresh token before it expires
      }
    });
  }

  private configureOAuth(): void {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  }

  login(): void {
    console.log('Google Login Triggered'); // Debug Log

    // Load discovery document and try to log in
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      console.log('Discovery document loaded and login attempted');
      if (this.isLoggedIn()) {
        console.log('User is logged in');
        this.router.navigate(['/home']); // Redirect to home page after successful login
      } else {
        console.log('User is not logged in');
        // Initiate login flow if not logged in
        this.oauthService.initLoginFlow();
      }
    }).catch((err) => {
      console.error('Error loading discovery document or trying login:', err);
    });
  }

  isLoggedIn(): boolean {
    const isLoggedIn = this.oauthService.hasValidAccessToken();
    console.log('Is user logged in?', isLoggedIn); // Debug log
    return isLoggedIn;
  }

  logout(): void {
    this.oauthService.logOut();
  }

  refreshToken(): void {
    this.oauthService.refreshToken().then(() => {
      console.log('Token refreshed'); // Debug log
    }).catch((err) => {
      console.error('Failed to refresh token:', err); // Debug log
    });
  }
}
