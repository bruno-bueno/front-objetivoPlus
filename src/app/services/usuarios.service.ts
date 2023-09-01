import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IUsuario } from '../interfaces/IUsuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = environment.apiUrl + 'usuarios';

  constructor(private http: HttpClient) { }

  login(usuario:IUsuario){
    const url = `${this.apiUrl}/login`;
    return this.http.post(`${url}`,usuario);
  }
  cadastro(usuario:IUsuario){
    const url = `${this.apiUrl}/cadastro`;
    return this.http.post(`${url}`,usuario);
  }
}
