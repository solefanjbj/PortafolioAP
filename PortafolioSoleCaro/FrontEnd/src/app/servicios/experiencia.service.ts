import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  //private apiServerUrl=environment.apiBaseUrl;
  Url = 'https://backendportafoliosole.herokuapp.com/api';
  httpClient: any;
  
  constructor(private http: HttpClient) { }

  public lista(): Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(this.Url + '/ver/experiencia');
  
  }
  public detail(Idexp:number): Observable<Experiencia>{
    return this.http.get<Experiencia>(this.Url+ `/ver/experiencia/id/${Idexp}`);
  }
  public save(experiencia: Experiencia): Observable<any>{
    return this.http.post<any>(this.Url+ `/new/experiencia`,experiencia);
  }
  public update(Idexp: number, experiencia: Experiencia): Observable<any>{
    return this.http.post<any>(this.Url+ `/editar/experiencia/${Idexp}`,experiencia);
  }
  public borrar(Idexp: number): Observable<any>{
    return this.http.delete<any>(this.Url+ `/deleteexperiencia/${Idexp}`);
  }

}
