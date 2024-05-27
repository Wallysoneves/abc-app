import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/providers/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup ;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  showCadastroForm = false; // Variável para controlar a exibição do formulário de cadastro

  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar) { 
      this.formLogin = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
  }
 

  updateErrorMessage() {
    const emailControl = this.formLogin.get('email');
    if (emailControl?.hasError('required')) {
      this.errorMessage = 'Você deve inserir um valor';
    } else if (emailControl?.hasError('email')) {
      this.errorMessage = 'E-mail inválido';
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
  logar(){
    if(this.formLogin.invalid) return;
    var usuario = this.formLogin.getRawValue() as Usuario;
    console.log(usuario)
    this.usuarioService.logar(usuario).subscribe((response) => {
        if(!response.sucesso){
          this.snackBar.open('Falha na autenticação', 'Usuário ou senha incorretos.', {
            duration: 3000
          });
        }
    })
  }
}
