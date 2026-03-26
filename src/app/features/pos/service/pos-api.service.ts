import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../environments/environment';

export interface CheckoutRequest {
  customer_id?: string;
  items: {
    service_id: number | string;
    qty: number;
  }[];

  payment_method: string;
  points_used?: number;
}

export interface CheckoutResponse {
  success: boolean;
  data: {
    message: string;
    transaction_id: string;
    subtotal: number;
    discount_amount: number;
    total: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PosApiService {
  private http = inject(HttpClient);
  private apiUrl = `${enviroment.apiUrl}/pos`;

  searchCustomer(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/customers/search?q=${query}`);
  }

  checkout(order: CheckoutRequest): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(`${this.apiUrl}/checkout`, order);
  }
}
