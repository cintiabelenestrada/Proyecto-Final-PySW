import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InquilinoService {

  constructor(private http: HttpClient) { }
  getInquilinos(): Observable<any> {
    const url = 'http://localhost:3000/api/inquilinos';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, { headers: headers });

  }

  createInquilino(inquilino: any): Observable<any> {
    const url = 'http://localhost:3000/api/inquilinos/nuevo';
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.http.post(url, inquilino, { headers: headers });
  }

  getInquilinoById(id: string): Observable<any> {
    const url = 'http://localhost:3000/api/inquilinos/' + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, { headers });
  }

  updateInquilino(id: string, nuevosValores: any): Observable<any> {
    const url = 'http://localhost:3000/api/inquilinos/' + id;
    const headers = {
      'Content-Type': 'application/json'
    };
    const params = {
      id
    }
    return this.http.put(url, nuevosValores, { headers,params});
  }

  deleteInquilino(id: string): Observable<any> {
    const url = 'http://localhost:3000/api/inquilinos/' + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, { headers });
  }
}
