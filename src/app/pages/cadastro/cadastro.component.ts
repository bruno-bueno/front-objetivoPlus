import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/IUsuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'
@Component({
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  usuario: IUsuario ={
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
        console.log("caiu aqui")
        this.login();
        Swal.fire({
          icon: 'success',
          title: 'Usuario Cadastrado!',
        })
      } else {  
        console.error("Resposta vazia.");
      }
      
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nome de Usuario, ou Email Invalido!',
      })
    })

  }

  login() {
    this.usuariosService.login(this.usuario)
      .subscribe(async (response: any) => {
      if (response) {
        console.log(response.token);
        await localStorage.setItem("token", response.token);
        await localStorage.setItem("idUsuario", response.id);
        this.router.navigate(['/metas']);
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario ou Senha incorreta!',
      })
    })
  
  }
}
