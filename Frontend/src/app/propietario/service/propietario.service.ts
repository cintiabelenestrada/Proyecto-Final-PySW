import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  constructor(private http: HttpClient) { }
  getPropietarios(): Observable<any> {
    const url = 'http://localhost:3000/api/propietarios';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, { headers: headers });

  }

  createPropietario(propietario: any): Observable<any> {
    const url = 'http://localhost:3000/api/propietarios/nuevo';
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.http.post(url, propietario, { headers: headers });
  }

  getPropietarioById(id: string): Observable<any> {
    const url = 'http://localhost:3000/api/propietarios/' + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, { headers });
  }

  updatePropietario(id: string, nuevosValores: any): Observable<any> {
    const url = 'http://localhost:3000/api/propietarios/' + id;
    const headers = {
      'Content-Type': 'application/json'
    };
    const params = {
      id
    }
    return this.http.put(url, nuevosValores, { headers,params});
  }

  deletePropietario(id: string): Observable<any> {
    const url = 'http://localhost:3000/api/propietarios/' + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, { headers });
  }
}
