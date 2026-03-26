import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header p-4 px-5 border-bottom border-dark-subtle">
      <h3 class="fw-bold text-white mb-1">System Settings</h3>
      <p class="text-white-50 mb-0 small">Configure business rules and taxes</p>
    </div>
    <div class="p-5">
      <div class="mb-4">
        <label class="text-white-50 small mb-2">Staff Control</label>
        <button (click)="logout()" class="btn btn-outline-danger w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
           <i class="bi bi-box-arrow-right"></i> LOGOUT FROM SYSTEM
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
  `]
})
export class Settings {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
