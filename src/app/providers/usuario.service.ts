import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrlUsuario = 'http://seu-backend-api-url.com/api'; // Atualize com a URL correta do seu backend

  constructor(private httpClient: HttpClient, private router: Router) { }

  logar(usuario: Usuario): Observable<any> {
    // return this.httpClient.post<any>(`${this.apiUrlUsuario}/login`, usuario).pipe(
    return this.mockUsuarioLogin(usuario).pipe(
      tap((resposta) => {
        if (!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify("TokenQueSeriaGeradoPelaAPI")));
        localStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
        this.router.navigate(['']);
      })
    );
  }

  private mockUsuarioLogin(usuario: Usuario): Observable<any> {
    var retornoMock: any = [];
    if (usuario.email === "abc@gmail.com" && usuario.password == "123") {
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = "TokenQueSeriaGeradoPelaAPI";
      return of(retornoMock);
    }
    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  // Método para cadastrar um novo usuário
  cadastrar(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrlUsuario}/usuarios`, usuario).pipe(
      tap((resposta) => {
        // Lidar com a resposta, se necessário
      })
    );
  }

  // Métodos comentados anteriormente, se precisar descomentar:
  /*
  get obterUsuarioLogado(): Usuario {
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(localStorage.getItem('usuario')))
      : null;
  }

  get obterIdUsuarioLogado(): number {
    return localStorage.getItem('usuario')
      ? (JSON.parse(atob(localStorage.getItem('usuario'))) as Usuario).id
      : null;
  }

  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')))
      : null;
  }
  */

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
