import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header p-4 px-5 border-bottom border-dark-subtle">
      <h3 class="fw-bold text-white mb-1">Inventory Management</h3>
      <p class="text-white-50 mb-0 small">Monitor stock levels and chemical consumption</p>
    </div>
    <div class="p-5 text-center text-white-50">
      <i class="bi bi-box-seam fs-1 mb-3 d-block"></i>
      <p>Inventory tracking module is coming soon.</p>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
  `]
})
export class Inventory {}
