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

  constructor(private materiaService: MateriaService) { }

  ngOnInit(): void {

    const editorElement = document.querySelector('#editor');
    if (editorElement instanceof HTMLElement) {
       ClassicEditor
         .create(editorElement, {
           plugins: [ /* plugins */ ],
           toolbar: [ /* toolbar items */ ],
         })
         .then(editor => {
           this.editor = editor;
           // Outras configurações e inicializações
         })
         .catch(error => {
           console.error(error);
         });
      }
    
    this.titulo = 'Matéria';
    this.materias = this.materiaService.getMaterias();
    this.dadosCkEditor = `
    <!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Atividade de Matemática</title>
</head>
<body>
    <div>
        Escola: _____________________________________________________________ <br>
        Data: __________________________ Turma: ___________________________ <br>
        Aluno: _____________________________________________________________
    </div>
    <h1>ATIVIDADE DE MATEMÁTICA</h1>
    <p>Resolva os seguintes problemas:</p>
    <div>
        <img src="soma.png" alt="Símbolo de Soma"> 
        5 + 3 = _____
    </div>
    <div>
        <img src="subtracao.png" alt="Símbolo de Subtração">
        10 - 4 = _____
    </div>
    <div>
        <img src="multiplicacao.png" alt="Símbolo de Multiplicação">
        3 x 6 = _____
    </div>
    <div>
        <img src="divisao.png" alt="Símbolo de Divisão">
        12 ÷ 2 = _____
    </div>
</body>
</html>


    `;
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

  ngOnDestroy() {
    if (this.editor) {
       this.editor.destroy();
    }
   }

}
