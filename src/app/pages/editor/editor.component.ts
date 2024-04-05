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
  editor: any; 
  Editor = ClassicEditor;
  materias: Materia[] = [];

  constructor(private materiaService: MateriaService) { }

  ngOnInit(): void {
    this.materias = this.materiaService.getMaterias();
    this.dadosCkEditor = `
      <div>
        <h1>Cabeçalho da Escola</h1>
        <p>Professora: [Nome da Professora]</p>
        <p>Aluno: [Nome do Aluno]</p>
        <p>Ano: [Ano]</p>
        <hr>
        <h2>Conteúdo da Tarefa</h2>
        <p>Aqui vai o conteúdo da tarefa...</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <p>Mais detalhes sobre a tarefa...</p>
      </div>
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
    materia.aberto = !materia.aberto;
  }

}
