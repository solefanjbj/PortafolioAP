import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto.module';
import { LoginUsuario } from '../model/login-usuario.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //authURL = 'http://localhost:8080/';//
  authURL = 'https://backendportafoliosole.herokuapp.com';


  constructor(private httpClient: HttpClient) { }

  

  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authURL+'/api/login',loginUsuario)
  }

}
