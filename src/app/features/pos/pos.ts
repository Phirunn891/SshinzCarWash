import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { enviroment } from '../../../environments/environment';

interface Category {
  categoryId: string; // Changed to string for UUID support
  categoryName: string;
  categoryPrice: number;
  categoryDescription: string;
  categoryIcon?: string;
  colorClass?: string;
}


interface OrderItem {
  id: string; // Changed to string for UUID support
  name: string;
  price: number;
  quantity: number;
}


@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pos.html',
  styleUrl: './pos.css',
})
export class Pos implements OnInit {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  categories: Category[] = [];
  orderItems: OrderItem[] = [];
  searchQuery: string = '';
  selectedFilter: string = 'All Services';

  // State management
  isRefreshing = false;
  showAddModal = false;
  newCategory = {
    categoryName: '',
    categoryPrice: null,
    categoryDescription: ''
  };

  filters = ['All Services', 'Exterior', 'Interior', 'Detailing', 'Maintenance'];

  // Enhanced metadata mapping
  iconsMap: { [key: string]: string } = {
    'Basic Wash': 'bi-droplet',
    'Premium Detail': 'bi-stars',
    'Interior Deep Clean': 'bi-record-circle',
    'Oil Change': 'bi-lightning-fill',
    'Ceramic Pro': 'bi-shield-check',
    'Engine Degrease': 'bi-gear-wide',
  };

  colorsMap: { [key: string]: string } = {
    'Basic Wash': 'blue',
    'Premium Detail': 'orange',
    'Interior Deep Clean': 'green',
    'Oil Change': 'purple',
    'Ceramic Pro': 'cyan',
    'Engine Degrease': 'magenta',
  };

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    if (isPlatformBrowser(this.platformId)) {
      this.isRefreshing = true;
      // Fetching from /pos/services as it contains the real car wash items with pricing and inventory rules
      this.http.get<{success: boolean, data: any[]}>(`${enviroment.apiUrl}/pos/services`).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.categories = res.data.map(svc => ({
              categoryId: svc.id,
              categoryName: svc.name,
              categoryPrice: Number(svc.price),
              categoryDescription: svc.vehicle_type ? `Type: ${svc.vehicle_type}` : 'Professional Service',
              categoryIcon: this.iconsMap[svc.name] || 'bi-gear-fill',
              colorClass: this.colorsMap[svc.name] || 'orange'
            }));
          }
          setTimeout(() => this.isRefreshing = false, 600);
        },
        error: (err) => {
          console.error('Error fetching services:', err);
          this.isRefreshing = false;
          alert('Failed to load services! Please ensure the backend is running at http://localhost:4001');
        }

      });
    }
  }


  saveCategory() {
    if (isPlatformBrowser(this.platformId)) {
      this.http.post(`${enviroment.apiUrl}/categories`, this.newCategory).subscribe({
        next: () => {
          this.fetchCategories(); // Refresh list
          this.showAddModal = false;
          this.newCategory = { categoryName: '', categoryPrice: null, categoryDescription: '' };
        },
        error: (err) => console.error('Error saving category:', err)
      });
    }
  }

  get filteredCategories() {
    return this.categories.filter(cat => {
      const matchesFilter = this.selectedFilter === 'All Services' || 
                           cat.categoryDescription?.toLowerCase().includes(this.selectedFilter.toLowerCase());
      const matchesSearch = cat.categoryName.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }

  addToOrder(cat: Category) {
    const existing = this.orderItems.find(item => item.id === cat.categoryId);
    if (existing) {
      existing.quantity++;
    } else {
      this.orderItems.push({
        id: cat.categoryId,
        name: cat.categoryName,
        price: Number(cat.categoryPrice),
        quantity: 1
      });
    }
  }

  removeFromOrder(id: string) {
    this.orderItems = this.orderItems.filter(item => item.id !== id);
  }


  getSubtotal() {
    return this.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTax() {
    return this.getSubtotal() * 0.08;
  }

  getTotal() {
    return this.getSubtotal() + this.getTax();
  }

  payNow() {
    if (this.orderItems.length > 0) {
      console.log('Navigating to payment with:', this.orderItems);
      this.router.navigate(['/layout/generate-payment'], { 
        state: { total: this.getTotal(), items: this.orderItems } 
      });
    }
  }

}
