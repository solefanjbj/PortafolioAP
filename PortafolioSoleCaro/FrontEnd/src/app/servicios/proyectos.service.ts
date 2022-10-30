import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../model/proyectos.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  //private apiServerUrl=environment.apiBaseUrl;
  Url = 'https://backendportafoliosole.herokuapp.com/api';
  httpClient: any;

  constructor(private http: HttpClient) { }

  public lista(): Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(this.Url + '/ver/proyecto');
  
  }
  public detail(id:number): Observable<Proyectos>{
    return this.http.get<Proyectos>(this.Url+ `/ver/proyecto/id/${id}`);
  }
  public save(experiencia: Proyectos): Observable<any>{
    return this.http.post<any>(this.Url+ `/new/proyecto`,experiencia);
  }
  public update(id: number, experiencia: Proyectos): Observable<any>{
    return this.http.post<any>(this.Url+ `/editar/proyecto/${id}`,experiencia);
  }
  public borrar(id: number): Observable<any>{
    return this.http.delete<any>(this.Url+ `/deleteproyecto/${id}`);
  }

}
