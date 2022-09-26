import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiServerUrl=environment.apiBaseUrl;
  Url = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  public getPersona(): Observable<Persona>{
    
    return this.http.get<Persona>(this.Url+ '/personas/traer/perfil');
    

  }
}
