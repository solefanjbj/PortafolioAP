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
  httpClient: any;
  
 
  constructor(private http: HttpClient) { }

  public getPersona(): Observable<Persona>{
    
    return this.http.get<Persona>(this.Url+ '/personas/traer/perfil');
    
  }
  public update(Id: number, pers: Persona): Observable<any>{
    return this.http.post<any>(this.Url+ `/editar/persona/`,pers);
  }
  public lista(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.Url + '/ver/persona');
  
  }
  public detail(Id:number): Observable<Persona>{
    return this.http.get<Persona>(this.Url+ `/ver/persona/id/${Id}`);
  }
  public save(persona: Persona): Observable<any>{
    return this.http.post<any>(this.Url+ `/new/persona`,persona);
  }
  public borrar(Id: number): Observable<any>{
    return this.http.delete<any>(this.Url+ `/deletepersona/${Id}`);
  }
}
