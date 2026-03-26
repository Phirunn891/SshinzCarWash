import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PosApiService, CheckoutRequest } from '../pos/service/pos-api.service';

@Component({
  selector: 'app-generate-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-payment.html',
  styleUrl: './generate-payment.css',
})
export class GeneratePayment implements OnInit {
  private router = inject(Router);
  private posApi = inject(PosApiService);
  private platformId = inject(PLATFORM_ID);
  
  isProcessing = false;

  totalAmount: number = 0;
  receivedAmount: string = '0.00';
  changeDue: number = 0;
  items: any[] = [];
  transactionId: string = Math.floor(Math.random() * 90000 + 10000).toString();
  
  qrCodeImage = 'static_qr_placeholder_1773821908771.png'; // Need correct path

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const state = history.state;
      if (state && state.total) {
        this.totalAmount = state.total;
        this.items = state.items;
      }
    }
  }


  appendNumber(num: string) {
    if (this.receivedAmount === '0.00') {
      this.receivedAmount = num;
    } else {
      this.receivedAmount += num;
    }
    this.calculateChange();
  }

  appendDot() {
    if (!this.receivedAmount.includes('.')) {
      this.receivedAmount += '.';
    }
    this.calculateChange();
  }

  clearReceived() {
    this.receivedAmount = '0.00';
    this.changeDue = 0;
  }

  setExact() {
    this.receivedAmount = this.totalAmount.toFixed(2);
    this.calculateChange();
  }

  quickAmount(amt: number) {
    this.receivedAmount = amt.toFixed(2);
    this.calculateChange();
  }

  calculateChange() {
    const received = parseFloat(this.receivedAmount);
    if (!isNaN(received)) {
      this.changeDue = Math.max(0, received - this.totalAmount);
    }
  }

  confirmPayment() {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    const checkoutRequest: CheckoutRequest = {
      items: this.items.map(item => ({
        service_id: item.id,
        qty: item.quantity
      })),
      payment_method: 'CASH', // default for now, can be expanded to UI selection
      points_used: 0
    };

    this.posApi.checkout(checkoutRequest).subscribe({
      next: (res) => {
        this.isProcessing = false;
        if (res.success) {
          alert(`Success! Transaction ID: ${res.data.transaction_id}`);
          this.router.navigate(['/layout/pos']);
        }
      },
      error: (err) => {
        this.isProcessing = false;
        console.error('Checkout failed', err);
        alert('Checkout failed! ' + (err.error?.message || 'Server error'));
      }
    });
  }


  printInvoice() {
    window.print();
  }
}
