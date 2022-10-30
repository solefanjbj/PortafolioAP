import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { LoginUsuario } from 'src/app/model/login-usuario.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario! : string;
  email! : string;
  password!: string;
  

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;      
      console.log(this.isLogged);
    }
  }
  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.email, this.password); 
    this.authService.login(this.loginUsuario).subscribe(data=>{
        this.isLogged =true;
        this.isLogginFail= false;
        this.tokenService.setToken(data.accesToken);
        this.tokenService.setUserName(data.email);        
        this.router.navigate([''])
        console.log(data);
        alert('Bienvenido');
      }, err=>{
        this.isLogged=false;
        this.isLogginFail=true;
        alert('Fallo al iniciar sesción');        
        this.router.navigate(['']);
        
      }
      )

  }

}
