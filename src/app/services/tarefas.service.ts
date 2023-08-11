import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ITarefa } from '../interfaces/ITarefas';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  gerarTarefasMeta(id: number): Observable<ITarefa> {
    const url = `${this.apiUrl}gerarmeta`;
    return this.http.get<ITarefa>(`${url}/${id}`);
  }

}
