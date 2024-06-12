import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/providers/materia.service';
import { TarefaService } from 'src/app/providers/tarefa.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  currentSlide = 0;
  tarefas: any = [];
  materias: Materia[] = [];

  constructor(
    private materiaService: MateriaService,
    private tarefaService: TarefaService
  ) { }

  ngOnInit(): void {
    this.materias = this.materiaService.getMaterias();
    this.carregarTarefas();
  }

  nextSlide() {
    if (this.currentSlide < this.tarefas.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.updateSlidePosition();
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.tarefas.length - 1;
    }
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  carregarTarefas(): void {
    this.tarefas = [];  // Clear existing slides if any
    let caminhoTarefa = this.tarefaService.getAllTarefas();
    caminhoTarefa.forEach(e => {
      this.tarefaService.getTarefaHtml(e).subscribe(html => {
        if (html) {
          this.tarefas.push(html);
          if (this.tarefas.length === 1) {
            this.updateSlidePosition();  // Update slides position after loading the first task
          }
        }
      }, error => {
        console.error('Erro ao carregar a tarefas:', error);
      });
    });
  }

  iframeClicked(tarefa: any): void {
    // Implement the iframe click logic here
  }

  voltar(): void {
    // Implement the back button logic here
  }
}
