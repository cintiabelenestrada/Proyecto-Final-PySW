import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Locales } from '../interfaces/locales.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private _http:HttpClient) { }

  public postCreateLocal(local: Partial<Locales>): Observable<any>  {
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
  public getObtenerLocalesInhabilitados(): Observable<any> {
    return this._http.get('http://localhost:3000/api/locales/inhabilitados');
  }

  public getObtenerLocalById(id: string): Observable<any> {
    return this._http.get('http://localhost:3000/api/locales/'+id);
  }

  public deleteLocal(id : string) {
    return this._http.delete('http://localhost:3000/api/locales/'+id);
  }
   // Método para editar un local
   public putUpdateLocal(localId: string, updatedLocal: Locales): Observable<any> {
    const url = `http://localhost:3000/api/locales/${localId}`;
    return this._http.put(url, updatedLocal);
  }

  public createPublishToFacebook(id: string): Observable <any> {
    const url=`http://localhost:3000/api/locales/publicacion`;
    return this._http.post(url,{id:id});

  }
}
