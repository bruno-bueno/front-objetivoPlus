import { Component, Input, OnInit } from '@angular/core';
import { TarefasService } from 'src/app/services/tarefas.service';
import { MetasService } from 'src/app/services/metas.service';
import { TrofeuService } from 'src/app/services/trofeu.service';
import { IMeta } from 'src/app/interfaces/IMetas';
import { ITarefa } from 'src/app/interfaces/ITarefas';
import { ITrofeu } from 'src/app/interfaces/ITrofeu';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
@Component({
  templateUrl: './meta-detalhe.component.html',
  styleUrls: ['./meta-detalhe.component.css']
})
export class MetaDetalheComponent implements OnInit{
  id!: number;
  metas: IMeta[] = [];
  tarefas: ITarefa[] = [];
  trofeus: ITrofeu[] = [];
  token = String(localStorage.getItem('token'));
  icone!: string;
  iconePadrao = "bi bi-check-square";
  iconeMarcado = "bi bi-check-square-fill";
  marcados=0;
  porcentagem!: number;
  preenchimento = `background-color: #bbbbbb; width: ${this.porcentagem}%; `;
  resposta?: string;
  tarefa: any;

  constructor(private metasService: MetasService, private tarefasService: TarefasService, private trofeuService: TrofeuService, private route: ActivatedRoute, private router: Router){}

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
        await this.obterTrofeusMeta(response[0].id);
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

  obterTrofeusMeta(id: number){
    this.trofeuService.obterTrofeusMeta(id,this.token)
    .subscribe((response: any) => {
      if (response) {
        this.trofeus = response.resultado;
        console.log(this.trofeus)
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    });
  }

  async concluido(tarefas: any){
    this.tarefa = this.tarefas.find(t => t.id == tarefas.id);
    const concluir={
      concluido: 0
    }
    if (this.tarefa) {
      if (this.tarefa.icone == 'bi bi-check-square') {
        Swal.fire({
          title: 'Carregando Pergunta de Confirmação',
          didOpen: () => {
            Swal.showLoading()
          }
        })
        this.tarefasService.verificaConcluidoTarefa(tarefas.id, this.token)
          .subscribe(async (response: any) => {
            Swal.close();
            const resposta = await Swal.fire({
              title: response.Pergunta,
              input: "radio",
              inputOptions: {
                0: response.Alternativas[0],
                1: response.Alternativas[1],
                2: response.Alternativas[2],
                3: response.Alternativas[3],
                4: response.Alternativas[4]
              },
              showCancelButton: true,
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar',
              
            });

            if (resposta.isConfirmed) {
              const alternativaSelecionada = resposta.value;
              if(alternativaSelecionada == response.Resposta){
                concluir.concluido=1;
                this.marcados++;
                this.porcentagem=((100/this.tarefas.length)*this.marcados);
                this.preenchimento += `width: ${this.porcentagem}%;`;
                this.tarefa.icone = 'bi bi-check-square-fill';
                this.tarefasService.editarConcluidoTarefa(tarefas.id,concluir,this.token,this.porcentagem,this.id)
                .subscribe(async (response: any) => {
                  if (response) {
                    Toast.fire({
                      icon: 'success',
                      title: response.resultado[0].nome,
                      text: response.resultado[0].requisitos
                    })
                    console.log(response.resultado[0]);
                    this.trofeus.push(response.resultado[0])
                  }
                },
                (error: any) => {
                  console.error("Ocorreu um erro:", error);
                });
              }else{
                Toast.fire({
                  title: "Acho que não",
                  text: "Seu relato não bate com a meta"
                })
                concluir.concluido=0;
              }
            }

          },
            (error: any) => {
              console.error("Ocorreu um erro:", error);
            });
        
      } else {
        this.marcados--;
        this.tarefa.icone = 'bi bi-check-square';
      }
      
    }
  }

  deleteMeta(){
    Swal.fire({
      title: "Você tem certeza?",
      text: "Não é possivel reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Apagar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.metasService.deletarMetas(this.id,this.token)
        .subscribe((response: any) => {
          if (response) {
            console.log(response);
            Swal.fire({
              title: "Meta Apagada!",
              text: "Sua Meta Foi Apagada!",
              icon: "success"
            });
            this.router.navigate(['/metas']);
          } else {
            console.error("Resposta vazia.");
          }
        },
        (error: any) => {

          console.error("Ocorreu um erro:", error);
        });
        
      }
    });
    
  }
    

}
