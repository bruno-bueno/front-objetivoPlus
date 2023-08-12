import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IMeta } from '../interfaces/IMetas';

@Injectable({
  providedIn: 'root'
})
export class MetasService {
  private apiUrl = environment.apiUrl + 'metas';

  constructor(private http: HttpClient) { }

  obterMetasUsuario(id: number): Observable<IMeta> {
    const url = `${this.apiUrl}/usuarios`;
    return this.http.get<IMeta>(`${url}/${id}`);
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
