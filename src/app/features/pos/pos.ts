import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Category {
  categoryId: number;
  categoryName: string;
  categoryPrice: number;
  categoryDescription: string;
  categoryIcon?: string;
  colorClass?: string;
}

interface OrderItem {
  id: number;
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
      const token = localStorage.getItem('auth_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      this.http.get<Category[]>('http://localhost:3000/api/v1/categories', { headers }).subscribe({
        next: (data) => {
          this.categories = data.map(cat => ({
            ...cat,
            categoryIcon: this.iconsMap[cat.categoryName] || 'bi-gear-fill',
            colorClass: this.colorsMap[cat.categoryName] || 'orange'
          }));
          setTimeout(() => this.isRefreshing = false, 600); // 0.6s smooth spin
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
          this.isRefreshing = false;
        }
      });
    }
  }

  saveCategory() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      this.http.post('http://localhost:3000/api/v1/categories', this.newCategory, { headers }).subscribe({
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

  removeFromOrder(id: number) {
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
      this.router.navigate(['/generate-payment'], { 
        state: { total: this.getTotal(), items: this.orderItems } 
      });
    }
  }
}
