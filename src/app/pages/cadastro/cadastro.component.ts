import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private usuariosService:UsuariosService, private router: Router ){}

  async cadastrar(){
    this.usuario.username= this.usuario.username.toLowerCase();
    await this.usuariosService.cadastro(this.usuario)
      .subscribe(async(response: any) => {
        console.log(response);
      if (response) {
        this.router.navigate(['/login']);
      } else {  
        console.error("Resposta vazia.");
      }
      
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
      alert('nome de usuario, ou email invalido');
    })

  }
}
