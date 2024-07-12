import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomGeneratorService {
private url = 'http://localhost:3000/api/roomGenerator/predictions'

  constructor(private http: HttpClient) { }

  startPrediction(imageUrl: string, theme: string, room: string):  Observable<any>{
      
      const body ={
          imagen: imageUrl,
          prompt: room === 'Gaming Room' 
            ? 'a room for gaming with gaming computers, gaming consoles, and gaming chairs'
            : `a ${theme.toLowerCase()} ${room.toLowerCase()}`,
        
      };
      return this.http.post(this.url, body);
  }

  getPredictionStatus(endpointUrl: string): Observable<any> {
    const fullUrl = `${this.url}/${endpointUrl}`;
      return this.http.get(fullUrl);
  }
}
