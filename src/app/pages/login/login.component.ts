import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IUsuario } from 'src/app/interfaces/IUsuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  usuario:IUsuario ={
    username: '',
    password: '',
    email:''
  }
  
  loginForm: FormGroup;

  constructor(private usuarioService: UsuariosService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    localStorage.clear();
  }

  login() {
      this.usuarioService.login(this.usuario)
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
      alert('Senha ou Usuario incorreto');
    })
    
  }
}
