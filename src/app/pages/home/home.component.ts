import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentIndex: number = 0;
  timeout: any;

  constructor() { }

  ngOnInit(): void {
    // Inicia o carrossel
    this.startCarousel();
  }

  ngOnDestroy(): void {
    // Limpa o timeout ao sair da página para evitar vazamento de memória
    this.stopCarousel();
  }

  startCarousel(): void {
    // Inicia o carrossel
    this.timeout = setTimeout(() => {
      this.nextSlide();
    }, 3000);
  }

  stopCarousel(): void {
    // Para o carrossel
    clearTimeout(this.timeout);
  }

  nextSlide(): void {
    // Avança para o próximo slide
    this.currentIndex = (this.currentIndex + 1) % 3; // 3 é o número total de slides
    // Define um timeout para avançar para o próximo slide após 3 segundos
    this.timeout = setTimeout(() => {
      this.nextSlide();
    }, 3000);
  }

  selectSlide(index: number): void {
    // Seleciona um slide específico
    if (index !== this.currentIndex) {
      this.currentIndex = index;
      // Para o carrossel e reinicia após um curto período de tempo para evitar conflitos
      this.stopCarousel();
      setTimeout(() => {
        this.startCarousel();
      }, 100);
    }
  }
}
