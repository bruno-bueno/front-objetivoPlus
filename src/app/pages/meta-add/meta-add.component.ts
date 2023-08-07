import { Component } from '@angular/core';
import { IMeta } from 'src/app/interfaces/IMetas';
import { MetasService } from 'src/app/services/metas.service';

@Component({
  templateUrl: './meta-add.component.html',
  styleUrls: ['./meta-add.component.css']
})
export class MetaAddComponent {
  
  meta: IMeta = {
    usuario_id: 10,
    titulo: '',
    descricao: '',
    concluido: 0,
    prazo: ''
  };

  constructor(private metasService: MetasService){}

  criarMeta() {
    

    this.metasService.adicionarMetas(this.meta)
      .subscribe((response: any) => {
      if (response) {
        console.log(response);
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    })
  }
}