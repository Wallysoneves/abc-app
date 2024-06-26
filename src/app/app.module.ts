import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HomeComponent } from './pages/home/home.component';
import { EditorComponent } from './pages/editor/editor.component';
import { TarefasComponent } from './pages/tarefas/tarefas.component';
import { LoginComponent } from './pages/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MateriaService } from './providers/materia.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CabecalhoComponent } from './pages/cabecalho/cabecalho.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApresentadorTarefaComponent } from './components/apresentador-tarefa/apresentador-tarefa.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    EditorComponent,
    TarefasComponent,
    LoginComponent,
    CabecalhoComponent,
    ApresentadorTarefaComponent,
    
  ],
  imports: [
      BrowserModule
    , AppRoutingModule
    , BrowserAnimationsModule
    , MatToolbarModule
    , MatButtonModule
    , MatIconModule
    , CKEditorModule
    , MatCardModule
    , MatFormFieldModule
    , MatInputModule
    , FormsModule
    , HttpClientModule
    , ReactiveFormsModule
    , MatSnackBarModule
  ],
  providers: [MateriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
