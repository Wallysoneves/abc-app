import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/providers/materia.service';
import { TarefaService } from 'src/app/providers/tarefa.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  tarefas: string[] = [];
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
    private tarefaService: TarefaService,
    private sanitizer: DomSanitizer
  ) { }

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

  carregarTarefas(materiaId: number, ano: string): void {
    this.tarefas = this.tarefaService.getTarefas(materiaId, ano);
    this.titulo = 'Tarefas';
  }

  getTarefaUrl(tarefa: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(tarefa);
  }

  carregarTarefa(tarefaPath: string): void {
    this.tarefaService.getTarefaHtml(tarefaPath).subscribe(html => {
      this.dadosCkEditor = html;
    }, error => {
      console.error('Erro ao carregar a tarefa:', error);
    });
  }

  iframeClicked(tarefaPath: string): void {
    this.carregarTarefa(tarefaPath);
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
