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

  obterMetasUsuario(token?:string): Observable<IMeta> {
    const url = `${this.apiUrl}/usuarios`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    const header = { headers: headers };
    return this.http.get<IMeta>(url, header);
  }
  obterMetasPeloId(id: number, token?:string): Observable<IMeta> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    const header = { headers: headers };
    return this.http.get<IMeta>(`${url}/${id}`,header);
  }
  adicionarMetas(meta: IMeta, token?:string){
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    const header = { headers: headers };
    return this.http.post<IMeta>(`${url}`,meta, header);
  }
}
