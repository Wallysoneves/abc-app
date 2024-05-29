import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/providers/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formCadastro: FormGroup;
  hide = true;
  showCadastroForm = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.formCadastro = this.formBuilder.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      type: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  toggleCadastroForm() {
    this.showCadastroForm = !this.showCadastroForm;
  }

  submitCadastroForm() {
    if (this.formCadastro.invalid) return;

    const usuarioCadastro: Usuario = {
      id: -1, // Valor padrão ou gerado no backend
      name: this.formCadastro.get('name')?.value || '',
      login: this.formCadastro.get('login')?.value || '',
      email: this.formCadastro.get('email')?.value || '',
      password: this.formCadastro.get('password')?.value || '',
      type: this.formCadastro.get('type')?.value || ''
    };

    this.usuarioService.cadastrar(usuarioCadastro).subscribe((response: any) => {
      if (response.sucesso) {
        this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Erro ao cadastrar usuário.', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  logar() {
    if (this.formLogin.invalid) return;
    var usuario = this.formLogin.getRawValue() as Usuario;
    this.usuarioService.logar(usuario).subscribe((response: any) => {
      if (!response.sucesso) {
        this.snackBar.open('Falha na autenticação', 'Usuário ou senha incorretos.', {
          duration: 3000
        });
      }
    });
  }
}
