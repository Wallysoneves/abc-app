import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/providers/materia.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  
  dadosCkEditor = ``;
  Editor = ClassicEditor;
  materias: Materia[] = [];

  constructor(private materiaService: MateriaService) { }

  ngOnInit(): void {
    this.materias = this.materiaService.getMaterias();
  }

  selecionarMateria(materia: string) {
    console.log(`Materia selecionada: ${materia}`);
    // Aqui você pode adicionar a lógica para lidar com a seleção da matéria
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.dadosCkEditor = data;
   }
 

}
