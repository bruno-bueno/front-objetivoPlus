import { Component, Input, OnInit } from '@angular/core';
import { TarefasService } from 'src/app/services/tarefas.service';
import { MetasService } from 'src/app/services/metas.service';
import { IMeta } from 'src/app/interfaces/IMetas';
import { ITarefa } from 'src/app/interfaces/ITarefas';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './meta-detalhe.component.html',
  styleUrls: ['./meta-detalhe.component.css']
})
export class MetaDetalheComponent implements OnInit{
  id!: number;
  metas: IMeta[] = [];
  tarefas: ITarefa[] = [];
  token = String(localStorage.getItem('token'));
  icone = "bi bi-check-square";

  constructor(private metasService: MetasService, private tarefasService: TarefasService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.obterMetasUsuario();
    this.icone;
  }

  obterMetasUsuario(){
    this.metasService.obterMetasPeloId(this.id,this.token)
    .subscribe(async (response: any) => {
      if (response) {
        this.metas = response;
        await this.obterTarefasMeta(response[0].id);
        console.log(this.metas);

      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    });
       
  }

  obterTarefasMeta(id: number){
    this.tarefasService.obterTarefasMeta(id,this.token)
    .subscribe((response: any) => {
      if (response) {
        this.tarefas = response;
        console.log(this.tarefas);
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    });
    
  }

  concluido(tarefas: any){
    console.log(tarefas);
    const tarefa = this.tarefas.find(t => t.id == tarefas);
    if (tarefa) {
      if (tarefa.icone == 'bi bi-check-square') {
        tarefa.icone = 'bi bi-check-square-fill';
      } else {
        tarefa.icone = 'bi bi-check-square';
      } 
    }
  }
    

}
