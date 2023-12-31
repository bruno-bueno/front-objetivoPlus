import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MetasComponent } from './pages/metas/metas.component';
import { MetaDetalheComponent } from './pages/meta-detalhe/meta-detalhe.component';
import { MetaAddComponent } from './pages/meta-add/meta-add.component';
import { MetaEditComponent } from './pages/meta-edit/meta-edit.component';
import { MetaFinalizadaComponent } from './pages/meta-finalizada/meta-finalizada.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent},
  { path: 'metas', component: MetasComponent},
  { path: 'meta-detalhe/:id', component: MetaDetalheComponent},
  { path: 'meta-add', component: MetaAddComponent},
  { path: 'meta-edit', component: MetaEditComponent},
  { path: 'meta-finalizada', component: MetaFinalizadaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
