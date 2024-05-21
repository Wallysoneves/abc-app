import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  showCadastroForm = false; // Variável para controlar a exibição do formulário de cadastro

  errorMessage = '';

  constructor() {}

  ngOnInit(): void {}

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  toggleCadastroForm() {
    this.showCadastroForm = !this.showCadastroForm; // Alterna entre mostrar e ocultar o formulário de cadastro
  }

  submitCadastroForm() {
    // Lógica para submeter o formulário de cadastro
    console.log('Formulário de cadastro submetido');
  }
}
