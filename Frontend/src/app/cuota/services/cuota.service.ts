import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CuotaGet } from '../interfaces/cuota-get';
import { CuotaResponse } from '../interfaces/cuota-response';

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

  

}
