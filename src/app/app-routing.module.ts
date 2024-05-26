import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditorComponent } from './pages/editor/editor.component';
import { TarefasComponent } from './pages/tarefas/tarefas.component';
import { LoginComponent } from './pages/login/login.component';
import { CabecalhoComponent } from './pages/cabecalho/cabecalho.component';
import { UsuarioNaoAutenticadoGuard } from './providers/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './providers/guards/usuario-autenticado.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent ,canActivate: [UsuarioNaoAutenticadoGuard]},
  { path: 'home', component: HomeComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'editor', component: EditorComponent , canActivate: [UsuarioAutenticadoGuard]},
  { path: 'tarefas', component: TarefasComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'cabecalho', component: CabecalhoComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

