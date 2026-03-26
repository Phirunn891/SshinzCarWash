import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header p-4 px-5 border-bottom border-dark-subtle">
      <h3 class="fw-bold text-white mb-1">Staff Management</h3>
      <p class="text-white-50 mb-0 small">Manage roles, PINs, and payroll</p>
    </div>
    <div class="p-5 text-center text-white-50">
      <i class="bi bi-people fs-1 mb-3 d-block"></i>
      <p>Employee management module is coming soon.</p>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
  `]
})
export class Employees {}
