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
  larguras: { [key: number]: string } = {};

  token = String(localStorage.getItem('token'));
  
  constructor(private metasService: MetasService, private tarefasService: TarefasService, private router: Router){}
  
  ngOnInit(): void {
      this.obterMetasUsuario();   

  }
  
  obterMetasUsuario(){
    this.metasService.obterMetasUsuario(this.token)
    .subscribe(async (response: any) => {
      console.log(response);
      if (response) {
        this.metas = response;
        console.log(this.metas);
        this.metas.forEach((meta) => {
          this.calcularLargura(meta.id);
        });
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
      this.router.navigate(['/login']);
    });
  }

  redirecionarDetalhe(id?: number){
    this.router.navigate(['/meta-detalhe/'+id]);
  }

  calcularLargura(id?: number) {
    if (!id) {
      console.error("ID da meta é indefinido.");
      return; 
    }

    this.tarefasService.obterTarefasMeta(id, this.token).subscribe(
      (response: any) => {
        if (response || response.concluido == 0) {
          const testeTarefas: ITarefa[] = response;
          console.log(testeTarefas);

          let marcados = 0;
          testeTarefas.forEach((tarefa: any) => {
            if (tarefa.concluido == 1) {
              marcados++;
            }
          });
          console.log(testeTarefas.length)
          const porcentagem = (marcados / testeTarefas.length) * 100;
          this.larguras[id] = `${porcentagem.toFixed(0)}%`;
          if(porcentagem >= 50){

          }
          if (porcentagem === 100) {
            const metaConcluida = this.metas.find(meta => meta.id === id);
          
            if (metaConcluida) {
              metaConcluida.concluido = 1;
          
              this.metasService.concluirMetas(metaConcluida, this.token).subscribe(
                (response) => {
                  console.log(`Meta "${metaConcluida.titulo}" concluída com sucesso`, response);
                },
                (error) => {
                  console.error(`Ocorreu um erro ao concluir a meta "${metaConcluida.titulo}"`, error);
                }
              );
            } else {
              console.error('Não foi possível encontrar a meta correspondente.');
            }
          }
          
      }
      (error: any) => {
        console.error("Ocorreu um erro:", error);
        this.larguras[id] = '0%';
      }
  });
  }

  

}
