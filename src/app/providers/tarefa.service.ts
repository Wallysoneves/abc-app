import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/*ID - Matéria
  1 - Porguês
  2 - Matemática
  3 - Ciência
  4 - História
  5 - Arte
  6 - Língua Estrangeira
  7 - Ensino Religioso */ 

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private tarefas: { [materiaId: number]: { [ano: string]: string[] } } = {
    1: {
      '1º Ano': [
        './assets/tarefashtml/portugues/1ano/tarefa1.html',
        './assets/tarefashtml/portugues/1ano/tarefa2.html'
      ],
    },
    2: {
      '1º Ano': [
        './assets/tarefashtml/matematica/1ano/tarefa1.html',
        './assets/tarefashtml/matematica/1ano/tarefa2.html',
        './assets/tarefashtml/matematica/1ano/tarefa3.html'
      ],
    },
    3: {
      '1º Ano': [
        './assets/tarefashtml/ciencias/1ano/tarefa1.html',
        './assets/tarefashtml/ciencias/1ano/tarefa2.html'
      ],
    }
  };

  constructor(private http: HttpClient) {}

  getTarefas(materiaId: number, ano: string): string[] {
    return this.tarefas[materiaId]?.[ano] || [];
  }

  getTarefaHtml(tarefaPath: string): Observable<string> {
    return this.http.get(tarefaPath, { responseType: 'text' });
  }

  getAllTarefas() {
    return [
      './assets/tarefashtml/matematica/1ano/tarefa1.html',
      './assets/tarefashtml/portugues/1ano/tarefa2.html',
      './assets/tarefashtml/ciencias/1ano/tarefa2.html'
    ];
  }
}
