import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IMeta } from '../interfaces/IMetas';

@Injectable({
  providedIn: 'root'
})
export class MetasService {
  private apiUrl = environment.apiUrl + 'metas';

  constructor(private http: HttpClient) {}

  obterMetasUsuario(id?: string, token?:string): Observable<IMeta> {
    const url = `${this.apiUrl}/usuarios`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      
    const options = { headers: headers };
    return this.http.get<IMeta>(`${url}/${id}`, options);
  }
  obterMetasPeloId(id: number): Observable<IMeta> {
    const url = `${this.apiUrl}`;
    return this.http.get<IMeta>(`${url}/${id}`);
  }
  adicionarMetas(meta: IMeta){
    const url = `${this.apiUrl}`;
    return this.http.post<IMeta>(`${url}`,meta);
  }
}
