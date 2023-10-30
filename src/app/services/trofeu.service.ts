import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ITrofeu } from '../interfaces/ITrofeu';


@Injectable({
  providedIn: 'root'
})
export class TrofeuService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  obterTrofeusMeta(id: number, token?: string): Observable<ITrofeu> {
    const url = `${this.apiUrl}trofeusmetas`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    const header = { headers: headers };
    return this.http.get<ITrofeu>(`${url}/${id}`,header);
  }
}
