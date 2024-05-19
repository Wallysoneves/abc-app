import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/providers/materia.service';
import { TarefaService } from 'src/app/providers/tarefa.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  
  dadosCkEditor = ``;
  titulo: string = '';
  editor: any; 
  Editor = ClassicEditor;
  materias: Materia[] = [];
  materiaSelecionada: Materia | undefined;
  tarefas: { titulo: number, ano: string }[] = [];
  config = {
    toolbar: [
       'Cut', 'Copy', 'PasteText', '|',
       'Undo', 'Redo', '|',
       'Bold', 'Italic', 'Underline', 'Strike', 'superscript', 'subscript', '|',
       'Link', 'Unlink', '|',
       'NumberedList', 'BulletedList', '|',
       'Outdent', 'Indent', '|',
       'Blockquote', '|',
       'ImageUpload', 'MediaEmbed', '|',
       'Table', '|',
       'ExportPdf'
    ]
   };

  constructor(
    private materiaService: MateriaService, 
    private tarefaService: TarefaService) 
    { }

    ngOnInit(): void {
      this.titulo = 'Matéria';
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

  toggleAnos(materia: Materia) {
    this.titulo = 'Série';
    materia.aberto = !materia.aberto;
    this.materiaSelecionada = materia;
  }

  carregarTarefa(tarefa: { titulo: number, ano: string }) {
    if (this.materiaSelecionada) {
      this.tarefaService.getTarefaHtml(this.materiaSelecionada.id, tarefa.ano).subscribe(html => {
        this.dadosCkEditor = html;
      }, error => {
        console.error('Erro ao carregar a tarefa:', error);
      });
    }
  }

  voltar() {
    if (this.titulo === 'Tarefas') {
      this.titulo = 'Série';
      this.tarefas = [];
    } else if (this.titulo === 'Série') {
      this.titulo = 'Matéria';
      this.materiaSelecionada = undefined;
    }
  }

  ngOnDestroy() {
    if (this.editor) {
       this.editor.destroy();
    }
   }

}
