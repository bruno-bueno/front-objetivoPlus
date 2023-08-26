import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IUsuario } from 'src/app/interfaces/IUsuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;

  constructor(private usuarioService: UsuariosService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      const usuario: IUsuario={
        password: password,
        username: username
      }

      this.usuarioService.login(usuario)
      .subscribe(async (response: any) => {
      if (response) {
        console.log(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("idUsuario", response.id);
      } else {
        console.error("Resposta vazia.");
      }
    },
    (error: any) => {
      console.error("Ocorreu um erro:", error);
    })
    

      // Aqui você pode realizar a lógica de autenticação ou enviar os dados para um serviço
      console.log('Username:', username);
      console.log('Password:', password);

      this.router.navigate(['/metas']);
      // Redirecione para outra página após o login bem-sucedido
    }
  }
}
