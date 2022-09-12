import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  Url = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  public getPersona(): Observable<Persona>{
    
    return this.http.get<Persona>(this.Url+ '/ver/personas');
    console.log(this.Url+ '/ver/personas');

  }
}
