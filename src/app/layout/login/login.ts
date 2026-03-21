import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = {
    name: '',
    pin: ''
  };

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        console.log('Login successful', res);
        this.router.navigate(['/layout']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid credentials! Please try again.');
      }
    });
  }
}
