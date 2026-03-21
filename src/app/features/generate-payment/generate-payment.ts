import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-payment.html',
  styleUrl: './generate-payment.css',
})
export class GeneratePayment implements OnInit {
  private router = inject(Router);

  totalAmount: number = 0;
  receivedAmount: string = '0.00';
  changeDue: number = 0;
  items: any[] = [];
  transactionId: string = Math.floor(Math.random() * 90000 + 10000).toString();
  
  qrCodeImage = 'static_qr_placeholder_1773821908771.png'; // Need correct path

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = history.state;
    
    if (state && state.total) {
      this.totalAmount = state.total;
      this.items = state.items;
    } else {
      // Fallback or redirect if no total found
      // this.router.navigate(['/pos']);
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
    alert('Payment Confirmed! Updating inventory...');
    this.router.navigate(['/pos']);
  }

  printInvoice() {
    window.print();
  }
}
