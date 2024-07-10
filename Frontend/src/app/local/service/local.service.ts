import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  urlBase: string = "http://localhost:3000/api/locales/";

  constructor(private _http: HttpClient) { }

  public getLocales(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get(this.urlBase, httpOptions);
  }
}
