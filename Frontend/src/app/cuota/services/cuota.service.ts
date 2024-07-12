import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CuotaGet } from '../interfaces/cuota-get';
import { CuotaResponse } from '../interfaces/cuota-response';
import { PagoGet } from '../../pagos/interfaces/pago-get';
import { PagoResponse } from '../../pagos/interfaces/pago-response';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {
  private readonly baseUrl = 'http://localhost:3000/api/cuotas';

  constructor(private http: HttpClient) { }

  getCuotas(): Observable<CuotaGet[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<CuotaResponse<CuotaGet[]>>(url).pipe( map((res) => res.data));
  }

  getCuotaById(id: string): Observable<CuotaGet> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<CuotaResponse<CuotaGet>>(url).pipe( map((res) => res.data));
  }


  obtenerPagosPorCuotaId (id: string): Observable<PagoGet[]> {
    const url = `${this.baseUrl}/${id}/pagos`;
    return this.http.get<PagoResponse<PagoGet[]>>(url).pipe( map((res) => res.data));
  }

  obtenerCuotasPorUsuario (id: string): Observable<CuotaGet[]> {
    const url = `${this.baseUrl}/usuario/${id}`;
    return this.http.get<CuotaResponse<CuotaGet[]>>(url).pipe( map((res) => res.data));
  }
}
