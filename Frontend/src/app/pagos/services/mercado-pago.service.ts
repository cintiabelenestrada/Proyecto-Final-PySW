import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentGet } from '../interfaces/payment-get';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
  private readonly urlBase = 'http://localhost:3000/api/payments/'

  constructor(private http: HttpClient) { }

  createPayment(data: any): Observable<PaymentGet> {
    return this.http.post<PaymentGet>(this.urlBase, data);
  }
}
