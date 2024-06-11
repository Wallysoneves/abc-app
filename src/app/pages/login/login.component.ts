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
  formLogin: FormGroup;
  formCadastro: FormGroup;
  hide = true;
  showCadastroForm = false;

  tempErrorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private snackBar: MatSnackBar
            ) { 

      this.formLogin = this.formBuilder.group({
        password: ['', Validators.required],
        login: ['', Validators.required],
      });

      this.formCadastro = this.formBuilder.group({
        email: ['', Validators.required, , Validators.email],
        password: ['', Validators.required],
        name: ['', Validators.required],
        login: ['', Validators.required]
      });

    }

  ngOnInit(): void {
  }

  toggleCadastroForm() {
    this.showCadastroForm = !this.showCadastroForm;
  }

  submitCadastroForm() {
    console.log('Formulário de cadastro submetido');
  }

  logar(){
    if(this.formLogin.invalid) {
      this.showTempErrorMessage('Informe o login e a senha.');
      return;
    }
    var usuario = this.formLogin.getRawValue() as Usuario;
    this.usuarioService.logar(usuario).subscribe((response) => {
        if(!response.user){
          this.showTempErrorMessage('Usuário ou senha incorretos.', 5000);
          return;
        }
    })
  }

  cadastar() {
    if(this.formCadastro.invalid) {
      this.showTempErrorMessage('Favor preencha todos os campos!');
      return;
    }

    var usuario = this.formCadastro.getRawValue() as Usuario;
    console.log(usuario);
    this.usuarioService.cadastrar(usuario).subscribe((response) => {
        if (!response.user) {
          this.showTempErrorMessage(response, 5000);
          return;
        }
    });
  }

  showTempErrorMessage(message: string, time = 3000) {
    this.tempErrorMessage = message;
    
    // Limpe a mensagem de erro após 3 segundos
    setTimeout(() => {
        this.tempErrorMessage = '';
    }, time);
}
}
