import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalInterface } from '../interfaces/locales.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private _http:HttpClient) { }

  public postCreateLocal(local: LocalInterface) {
    return this._http.post('http://localhost:3000/api/locales',local);
  }
  public getAllLocales(): Observable<any> {
    return this._http.get('http://localhost:3000/api/locales');
  }
  public getObtenerLocalesHabilitados(): Observable<any> {
    return this._http.get('http://localhost:3000/api/locales/habilitados');
  }
}
