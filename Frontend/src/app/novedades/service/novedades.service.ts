import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NovedadesInterface } from '../interfaces/novedades.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {

  constructor(private _http: HttpClient) {
    
   }
   public postCreateNovedad(novedad: NovedadesInterface) {
    return this._http.post('http://localhost:3000/api/novedades',novedad);
  }

  public deleteNovedad(id : string) {
    return this._http.delete('http://localhost:3000/api/novedades/'+id);
  }
  public getAllNovedades(): Observable<any> {
    return this._http.get('http://localhost:3000/api/novedades');
  }
  public getNovedadesPorUsuario(userId : string): Observable<any> {
    return this._http.get('http://localhost:3000/api/novedades/usuario/'+userId);
  }

  public getNovedades(): Observable<any> {
    return this._http.get('http://localhost:3000/api/novedades/all');
  }
}
