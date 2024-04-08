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
  titulo: string = '';
  editor: any; 
  Editor = ClassicEditor;
  materias: Materia[] = [];
  materiaSelecionada: Materia | undefined;

  constructor(private materiaService: MateriaService) { }

  ngOnInit(): void {
    this.titulo = 'Matéria';
    this.materias = this.materiaService.getMaterias();
    this.dadosCkEditor = `
      
    <div class="header-container">
    <div class="logo-container">
      <img src="caminho/para/sua/logo.png" alt="Logo da Escola">
    </div>
    <div class="header-content">
      <div class="header-text">
        <label for="escola">ESCOLA:</label>
        <span>Nome da Escola</span>
      </div>
      <div class="header-text">
        <label for="professor">PROFESSOR(A):</label>
        <span>Nome do Professor(a)</span>
      </div>
      <div class="header-text">
        <label for="serie">SÉRIE:</label>
        <span>Série</span>
      </div>
      <div class="header-text">
        <label for="aluno">ALUNO:</label>
        <span>Nome do Aluno</span>
      </div>
    </div>
  </div>
  <hr>
  <div id="ckeditor"></div>
    `;
    this.addImageToEditor();
  }

  ngAfterViewInit() {
    const editorElement = document.getElementById('ckeditor');
    if (editorElement) {
      ClassicEditor
        .create(editorElement, {
          // Configurações adicionais do CKEditor, se necessário
        })
        .then(editor => {
          this.editor = editor;
          console.log('CKEditor initialized');
          this.addImageToEditor(); // Adiciona a imagem ao CKEditor
        })
        .catch(error => {
          console.error('Error initializing CKEditor: ', error);
        });
    } else {
      console.error('Element with id "ckeditor" not found.');
    }
  }

  selecionarMateria(materia: string) {
    console.log(`Materia selecionada: ${materia}`);
    // Aqui você pode adicionar a lógica para lidar com a seleção da matéria
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.dadosCkEditor = data;
   }

   addImageToEditor() {
    const imageElement = new Image();
    imageElement.src = 'https://ciclovivo.com.br/wp-content/uploads/2018/10/iStock-536613027-1024x683.jpg'; // Substitua pelo URL da imagem que você deseja exibir
    imageElement.draggable = true; // Permite que a imagem seja arrastada
    imageElement.style.width = '50px'; // Ajusta o tamanho da imagem conforme necessário
    imageElement.style.height = '50px';
    this.dadosCkEditor += `<p><img src="${imageElement.src}" style="width: ${imageElement.style.width}; height: ${imageElement.style.height}"></p>`;
  }
  toggleAnos(materia: Materia) {
    this.titulo = 'Série';
    materia.aberto = !materia.aberto;
    this.materiaSelecionada = materia;
  }

}
