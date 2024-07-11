import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalInterface } from '../interfaces/locales.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private _http:HttpClient) { }

  public postCreateLocal(local: LocalInterface): Observable<any>  {
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params : new HttpParams({}),
    }
    let body = JSON.stringify(local);
    console.log(local);
    return this._http.post('http://localhost:3000/api/locales', body, httpOptions);
  }
  public getAllLocales(): Observable<any> {
    return this._http.get('http://localhost:3000/api/locales');
  }
  public getObtenerLocalesHabilitados(): Observable<any> {
    return this._http.get('http://localhost:3000/api/locales/habilitados');
  }

  public getObtenerLocalById(id: string): Observable<any> {
   console.log("llogg",id);
   
    return this._http.get('http://localhost:3000/api/locales/'+id);
  }

   // Método para editar un local
   public putUpdateLocal(localId: string, updatedLocal: LocalInterface): Observable<any> {
    const url = `http://localhost:3000/api/locales/${localId}`;
    return this._http.put(url, updatedLocal);
  }
 
}
