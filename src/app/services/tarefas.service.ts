import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ITarefa } from '../interfaces/ITarefas';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  obterTarefasMeta(id: number, token?: string): Observable<ITarefa> {
    const url = `${this.apiUrl}tarefas/metas`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    const header = { headers: headers };
    return this.http.get<ITarefa>(`${url}/${id}`,header);
  }

  gerarTarefasMeta(id: number, token?: string): Observable<ITarefa> {
    const url = `${this.apiUrl}gerarmeta`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    const header = { headers: headers };
    return this.http.get<ITarefa>(`${url}/${id}`,header);
  }

}
