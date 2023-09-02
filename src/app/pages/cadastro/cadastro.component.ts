import { Component } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/IUsuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  usuario:IUsuario ={
    username: '',
    password: '',
    email:''
  }

  constructor(private usuariosService:UsuariosService ){}

  async cadastrar(){
    await this.usuariosService.cadastro(this.usuario)
      .subscribe((response: any) => {
        console.log(response);
      if (response) {
        
      } else {  
        console.error("Resposta vazia.");
      }
      
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    })

  }
}
