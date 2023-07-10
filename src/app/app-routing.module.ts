import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MetasComponent } from './pages/metas/metas.component';
import { MetaDetalheComponent } from './pages/meta-detalhe/meta-detalhe.component';
import { MetaAddComponent } from './meta-add/meta-add.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'cadastro', component: CadastroComponent},
  { path: 'metas', component: MetasComponent},
  { path: 'meta-detalhe', component: MetaDetalheComponent},
  { path: 'meta-add', component: MetaAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
