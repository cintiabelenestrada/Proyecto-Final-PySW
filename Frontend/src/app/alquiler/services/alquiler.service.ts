import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alquiler } from '../models/alquiler';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  urlBase: string = "http://localhost:3000/api/alquileres/";

  constructor(private _http: HttpClient) { }

  public getAlquileres(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get(this.urlBase, httpOptions);
  }

  public getAlquileresActivos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get(this.urlBase + "activos", httpOptions);
  }

  public getAlquileresPorInquilino(inquilinoId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get(this.urlBase + "inquilino/" + inquilinoId, httpOptions);
  }

  public getAlquilerById(alquilerId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get(this.urlBase + alquilerId, httpOptions);
  }

  public createAlquiler(alquiler: Alquiler): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body: any = JSON.stringify(alquiler);

    return this._http.post(this.urlBase, body, httpOptions);
  }

  public deleteAlquiler(alquilerId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.delete(this.urlBase + alquilerId, httpOptions);
  }

  public updateAlquiler(alquiler: Alquiler): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body: any = JSON.stringify(alquiler);

    return this._http.put(this.urlBase + alquiler._id, body, httpOptions);
  }
}
