import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/providers/usuario.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  activeIndex: number = 0;
  desabilitado: boolean = true;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

  deslogar(){
    this.usuarioService.deslogar();
  }

}
