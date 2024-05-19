
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private tarefas: { [materiaId: number]: { [ano: string]: string } } = {
    2: {
      '1º Ano': './assets/tarefashtml/matematica/1ano/tarefa1.html',
    }
  };

  constructor(private http: HttpClient) {}

  getTarefaHtml(materiaId: number, ano: string): Observable<string> {
    const tarefaPath = this.tarefas[materiaId]?.[ano];
    if (tarefaPath) {
      return this.http.get(tarefaPath, { responseType: 'text' });
    } else {
      throw new Error('Tarefa não encontrada');
    }
  }
}