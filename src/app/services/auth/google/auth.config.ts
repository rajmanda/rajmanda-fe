import { AuthConfig } from 'angular-oauth2-oidc';


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin + '/home',
  clientId: '175415323680-adkk9afijh7su4234frodmp5itbur7hv.apps.googleusercontent.com',
  dummyClientSecret: 'secret',
  scope: 'openid profile',
  responseType: 'code',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
  useSilentRefresh: true,
  //silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  customQueryParams: { ux_mode: 'popup' }
};
