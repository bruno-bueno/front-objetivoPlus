import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MetasComponent } from './pages/metas/metas.component';
import { MetaDetalheComponent } from './pages/meta-detalhe/meta-detalhe.component';
import { MetaAddComponent } from './pages/meta-add/meta-add.component';
import { HttpClientModule } from '@angular/common/http';
import { MetaEditComponent } from './pages/meta-edit/meta-edit.component';
import { MetaFinalizadaComponent } from './pages/meta-finalizada/meta-finalizada.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    MetasComponent,
    MetaDetalheComponent,
    MetaAddComponent,
    MetaEditComponent,
    MetaFinalizadaComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
