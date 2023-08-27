import { Component, OnInit } from '@angular/core';
import { IMeta } from 'src/app/interfaces/IMetas';
import { MetasService } from 'src/app/services/metas.service';
import { TarefasService } from 'src/app/services/tarefas.service';


@Component({
  templateUrl: './meta-add.component.html',
  styleUrls: ['./meta-add.component.css']
})
export class MetaAddComponent implements OnInit{
  
  id?: number;
  token?: string;

  meta: IMeta = {
    id:0,
    usuario_id: 0,
    titulo: '',
    descricao: '',
    concluido: 0,
    prazo: ''
  };

  constructor(private metasService: MetasService, private tarefasService: TarefasService ){}

  ngOnInit(): void {
    this.token = String(localStorage.getItem('token'));  
    this.id = Number(localStorage.getItem('idUsuario'));
    this.meta.usuario_id=this.id;
    console.log(this.meta)
  }


  adicionarPrazo(unidade: string) {
    const partes = this.meta.prazo.split(' ');

    if(partes[1] == 'mes' || partes[1] == 'ano' || partes[1] == 'meses' || partes[1] == 'anos'){
      if (unidade === 'mes') {
        this.meta.prazo=this.meta.prazo.replace('anos','meses'); 
      } else if (unidade === 'ano') {
        this.meta.prazo=this.meta.prazo.replace('meses','anos'); 
      }
       
    }else{
      if (unidade === 'mes') {
        this.meta.prazo += ' meses';
      } else if (unidade === 'ano') {
        this.meta.prazo += ' anos'; 
      }
    }
    
  }

  criarMeta() {
    this.metasService.adicionarMetas(this.meta, this.token)
      .subscribe(async (response: any) => {
      if (response) {
        console.log("criar");
        console.log(response);
        await this.gerarMeta(response.id);
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    })
  }

  gerarMeta(id: number){
    this.tarefasService.gerarTarefasMeta(id,this.token)
    .subscribe((response: any) => {
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
}