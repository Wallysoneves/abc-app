import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('editor') editorElement: any;


  dadosCkEditor = ``;
  titulo: string = '';
  editor: any;
  Editor = ClassicEditor;
  materias: Materia[] = [];
  materiaSelecionada: Materia | undefined;
  tarefas: string[] = [];
  htmlContent: string = ``;
  config = {
    toolbar: [ 
      'heading', '|',
      'fontfamily','fontsize',
      'alignment',
      'fontColor','fontBackgroundColor', '|',
      'bold', 'italic', 'underline', 'custombutton', 'strikethrough', 'subscript', 'superscript','|',
      'link','|',
      'outdent','indent','|',
      'bulletedList','numberedList','|',
      'code','codeBlock','|',
      'insertTable','|',
      'imageUpload','blockQuote','|',
      'undo','redo','|',
      'youtube',
      'mediaEmbed'
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
    this.titulo = 'Tarefas';
    let caminhoTarefa = this.tarefaService.getTarefas(materiaId, ano);
    caminhoTarefa.forEach(e => {
      this.tarefaService.getTarefaHtml(e).subscribe(html => {
        this.tarefas.push(html);
      }, error => {
        console.error('Erro ao carregar a tarefas:', error);
      });
    });
  }

  carregarTarefa(tarefa: string): void {
      this.dadosCkEditor = tarefa;
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
