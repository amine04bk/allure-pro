import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderPayload } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/orders';

  submitOrder(payload: OrderPayload): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(this.apiUrl, payload);
  }
}
