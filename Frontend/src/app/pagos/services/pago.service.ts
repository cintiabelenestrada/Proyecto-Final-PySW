import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagoResponse } from '../interfaces/pago-response';
import { PagoGet } from '../interfaces/pago-get';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private readonly baseUrl = 'http://localhost:3000/api/pagos/';
  
  constructor(private http: HttpClient) { }

  getPagos() {
    const url = `${this.baseUrl}`;
    return this.http.get<PagoResponse<PagoGet[]>>(url).pipe( map((res) => res.data));
  }

  
}
