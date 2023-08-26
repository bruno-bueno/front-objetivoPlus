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
  id: number = 0;
  metas: IMeta[] = [];
  tarefas: ITarefa[] = [];

  constructor(private metasService: MetasService, private tarefasService: TarefasService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.obterMetasUsuario();
    
  }

  obterMetasUsuario(){
    this.metasService.obterMetasPeloId(this.id)
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

    this.tarefasService.obterTarefasMeta(id)
    .subscribe((response: any) => {
      if (response || response.concluido==0) {
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

}
