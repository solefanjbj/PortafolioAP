import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../model/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiServerUrl=environment.apiBaseUrl;
  Url = 'http://localhost:8080';
  httpClient: any;

  constructor(private http: HttpClient) { }

  public lista(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.Url + '/ver/skill');
  
  }
  public detail(id:number): Observable<Skill>{
    return this.http.get<Skill>(this.Url+ `/ver/skill/id/${id}`);
  }
  public save(skill: Skill): Observable<any>{
    return this.http.post<any>(this.Url+ `/new/skill`,skill);
  }
  public update(id: number, skill: Skill): Observable<any>{
    return this.http.post<any>(this.Url+ `/editar/skill/${id}`,skill);
  }
  public borrar(id: number): Observable<any>{
    return this.http.delete<any>(this.Url+ `/deleteskill/${id}`);
  }

}

