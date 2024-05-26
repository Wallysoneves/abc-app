import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {
  htmlContent: string = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Salada de Frutas</title>
    </head>
    <body>
        <h1>ATIVIDADE DE MATEMÁTICA</h1>
        <p>Resolva os seguintes problemas:</p>
        <div>
            <img src="/assets/img/tarefaimg/soma.png" width="50px" height="50px" alt="Símbolo de Soma"> 
            5 + 3 = _____
        </div>
        <div>
            <img src="/assets/img/tarefaimg/subtracao.png" width="50px" height="50px" alt="Símbolo de Subtração">
            10 - 4 = _____
        </div>
        <div>
            <img src="/assets/img/tarefaimg/multiplicacao.png" width="50px" height="50px" alt="Símbolo de Multiplicação">
            3 x 6 = _____
        </div>
        <div>
            <img src="/assets/img/tarefaimg/divisao.png" width="50px" height="50px" alt="Símbolo de Divisão">
            12 ÷ 2 = _____
        </div>
    </body>
    </html>
  `;
}
