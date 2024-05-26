import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-apresentador-tarefa',
  templateUrl: './apresentador-tarefa.component.html',
  styleUrls: ['./apresentador-tarefa.component.css']
})
export class ApresentadorTarefaComponent {

  @Input() rawHtml: string = '';
  sanitizedHtml: SafeHtml = '';
  title: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.extractTitleAndSanitizeHtml();
  }

  private extractTitleAndSanitizeHtml() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.rawHtml, 'text/html');
    this.title = doc.querySelector('title')?.innerText || 'Sem Título';
    const bodyContent = doc.body.innerHTML;
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(bodyContent);
  }

}
