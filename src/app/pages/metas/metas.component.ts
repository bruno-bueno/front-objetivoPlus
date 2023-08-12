import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MetasService } from 'src/app/services/metas.service';
import { IMeta } from 'src/app/interfaces/IMetas';
import { ITarefa } from 'src/app/interfaces/ITarefas';
import { TarefasService } from 'src/app/services/tarefas.service';
import { RouterModule, Routes } from '@angular/router';
import {MetaAddComponent} from '../meta-add/meta-add.component';
import { MetaDetalheComponent } from '../meta-detalhe/meta-detalhe.component';
import { Router } from '@angular/router';

const routes: Routes = [
  { path: 'meta-add', component: MetaAddComponent },
  { path: 'meta-detalhe', component: MetaDetalheComponent }
];

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  metas: IMeta[] = [];
  tarefas: ITarefa[] = [];

  
  
  constructor(private metasService: MetasService, private tarefasService: TarefasService, private router: Router){}
  
  ngOnInit(): void {
    this.obterMetasUsuario();

  }
  
  obterMetasUsuario(){
    this.metasService.obterMetasUsuario(7)
    .subscribe(async (response: any) => {
      if (response) {
        this.metas = response;
        console.log(this.metas);
        for(let i =0; i < this.metas.length; i++){
          await this.obterTarefasMeta(response[i].id);
          console.log(response[i].id);
          console.log("estou no for")
        };
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    });
       
  }

  obterTarefasMeta(id: number){

    this.tarefasService.obterTarefasMeta(id)
    .subscribe((response: any) => {
      if (response || response.concluido==0) {
        this.tarefas = response;
        console.log("estou no obter tarefas");
        console.log(this.tarefas);
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    });
    
  }

  redirecionarDetalhe(id: number){
    this.router.navigate(['/meta-detalhe/'+id]);
  }

}
