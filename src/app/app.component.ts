import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/google/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rajmanda-fe';
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.login();
    console.log('AppComponent initialized');
    console.log(this.authService.isLoggedIn());
  }
}
