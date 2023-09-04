import { Component, Input, OnInit } from '@angular/core';
import { TarefasService } from 'src/app/services/tarefas.service';
import { MetasService } from 'src/app/services/metas.service';
import { IMeta } from 'src/app/interfaces/IMetas';
import { ITarefa } from 'src/app/interfaces/ITarefas';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  templateUrl: './meta-detalhe.component.html',
  styleUrls: ['./meta-detalhe.component.css']
})
export class MetaDetalheComponent implements OnInit{
  id!: number;
  metas: IMeta[] = [];
  tarefas: ITarefa[] = [];
  token = String(localStorage.getItem('token'));
  icone!: string;
  iconePadrao = "bi bi-check-square";
  iconeMarcado = "bi bi-check-square-fill";
  marcados=0;
  porcentagem!: number;
  preenchimento = `background-color: #363636; width: ${this.porcentagem}%; `;

  constructor(private metasService: MetasService, private tarefasService: TarefasService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.obterMetasUsuario();
    
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
      this.router.navigate(['/login']);
    });
       
  }

  obterTarefasMeta(id: number){
    this.tarefasService.obterTarefasMeta(id,this.token)
    .subscribe((response: any) => {
      if (response) {
        this.tarefas = response;
        console.log("array")
        console.log(this.tarefas);
        this.tarefas.forEach(tarefa => {
          if(tarefa.concluido==0){
            tarefa.icone = this.iconePadrao;
          }else{
            tarefa.icone = this.iconeMarcado;
            this.marcados++;
          }       
        });
        this.porcentagem = (100/this.tarefas.length)*this.marcados;
        this.preenchimento += ` width: ${this.porcentagem}%;`;
        console.log(this.porcentagem);
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    });
    
  }

  concluido(tarefas: any){
    const concluir={
      concluido: 0
    }
    console.log(tarefas.id);
    const tarefa = this.tarefas.find(t => t.id == tarefas.id);
    if (tarefa) {
      if (tarefa.icone == 'bi bi-check-square') {
        concluir.concluido=1;
        this.marcados++;
        tarefa.icone = 'bi bi-check-square-fill';
      } else {
        this.marcados--;
        tarefa.icone = 'bi bi-check-square';
      } 
    }
    this.porcentagem = ((100/this.tarefas.length)*this.marcados);
    this.preenchimento += ` width: ${this.porcentagem}%;`;
    console.log(this.porcentagem);
    this.tarefasService.editarConcluidoTarefa(tarefas.id,concluir,this.token)
    .subscribe((response: ITarefa) => {
      if (response) {
        console.log(response);     
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    });
  }

  deleteMeta(){
    this.metasService.deletarMetas(this.id,this.token)
    .subscribe((response: any) => {
      if (response) {
        console.log(response);
        alert('Meta Deletada')
        this.router.navigate(['/metas']);
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    });
  }
    

}
