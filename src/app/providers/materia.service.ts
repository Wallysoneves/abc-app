import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../models/Materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  nomes: string[] = ['Português', 'Matematica', 'Ciência', 'História', 'Arte', 'Lingua Estrangeira', 'Ensino Religioso'];

  constructor() { }

  getMaterias(): Materia[] {
    return this.nomes.map((nome: any, index: any) => ({
      id: index + 1,
      nome: nome,
      anos: ['1º Ano', '2º Ano', '3º Ano', '4º Ano'] 
    }));
  }
}
