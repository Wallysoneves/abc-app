import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase: string = environment.urlBase+'/auth';

  constructor(private httpClient: HttpClient,
    private router: Router) { }

    logar(usuario: Usuario): Observable<any> {
      const body = { login: usuario.login, password: usuario.password };
  
      return this.httpClient.post<any>(`${this.urlBase}/login`, body, {
        headers: { 'Content-Type': 'application/json' }
      }).pipe(
        tap(resposta => {

          if (resposta && resposta.token) {
            localStorage.setItem('token', btoa(JSON.stringify(resposta.token)));
            localStorage.setItem('user', btoa(JSON.stringify(resposta.user)));
            this.router.navigate(['']);
          }
        }),
        catchError(error => {
          console.error('Erro ao tentar fazer login:', error);
          return of(error.error.error);
        })
      );
    }

    cadastrar(usuario: Usuario): Observable<any> {
      usuario.role = 'ADMIN';
      usuario.type = 'PROFESSOR';

      return this.httpClient.post<any>(`${this.urlBase}/register`, usuario, {
        headers: { 'Content-Type': 'application/json' }
      }).pipe(
        tap(resposta => {

          if (resposta.user && resposta.token) {
            localStorage.setItem('token', btoa(JSON.stringify(resposta.token)));
            localStorage.setItem('user', btoa(JSON.stringify(resposta.user)));
            this.router.navigate(['']);
          } else {
            return resposta;
          }
        }),
        catchError(error => {
          console.error('Erro ao tentar realizar o cadastro:', error);
          return of(error.error);
        })
      );
    }

    deslogar() {
        localStorage.clear();
        this.router.navigate(['login']);
    }

    get obterUsuarioLogado(): Usuario | null {
      const usuarioString = localStorage.getItem('user');
      return usuarioString ? JSON.parse(atob(usuarioString)) : null;
    }

    get obterIdUsuarioLogado(): number {
      return (JSON.parse(atob(localStorage.getItem('user')!)) as Usuario).id;
    }
    

    get obterTokenUsuario(): string {
      return JSON.parse(atob(localStorage.getItem('token')!));
    }
    get logado(): boolean {
      return localStorage.getItem('token') ? true : false;
    }
  }
