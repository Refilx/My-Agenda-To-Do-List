import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {


  loginVisible: boolean = false;

    userRegistrationObj: any = {
      email: '',
      username: '',
      password: ''
    }

    userLogin: any = {
      username: '',
      password: ''
    }

    resetRegisterForm(): void {
      this.userRegistrationObj = {
        email: '',
        username: '',
        password: '',
      };
    }

    resetLoginForm(): void {
      this.userRegistrationObj = {
        username: '',
        password: '',
      };
    }

    router = inject(Router)

    onRegister(){

      const isLocalData = localStorage.getItem("angular18local");

      if(isLocalData != null){
          const localArrayDeLogs  = JSON.parse(isLocalData);
          localArrayDeLogs.push(this.userRegistrationObj);
          localStorage.setItem("angular18local", JSON.stringify(localArrayDeLogs));
      }

      else{
        const localArrayDeLogs = []
        localArrayDeLogs.push(this.userRegistrationObj);
        localStorage.setItem("angular18local", JSON.stringify(localArrayDeLogs));
      }

      this.resetRegisterForm();
      alert("Registro realizado com sucesso!")
    }

    onLogin(){
      debugger;

      const isLocalData = localStorage.getItem("angular18local");

      if(isLocalData != null){
        const users  = JSON.parse(isLocalData);

        const isUserFound = users.find((m:any) => m.username == this.userLogin.username && m.password == this.userLogin.password);
        if(isUserFound != undefined ){
            this.router.navigateByUrl('home');
        }
        else{
          alert("Usuário ou Senha incorretos!");
        }

      }
      else {
        alert("Usuário não encontrado!");
      }
      this.resetLoginForm();
    }
}
