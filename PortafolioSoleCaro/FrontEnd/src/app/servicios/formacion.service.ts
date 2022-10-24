import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Formacion } from '../model/formacion.model';

@Injectable({
  providedIn: 'root'
})
export class FormacionService {
  private apiServerUrl=environment.apiBaseUrl;
  Url = 'http://localhost:8080/api';
  httpClient: any;

  constructor(private http: HttpClient) { }

  public lista(): Observable<Formacion[]>{
    return this.http.get<Formacion[]>(this.Url + '/ver/formacion');
  
  }
  public detail(Idform:number): Observable<Formacion>{
    return this.http.get<Formacion>(this.Url+ `/ver/formacion/id/${Idform}`);
  }
  public save(formacion: Formacion): Observable<any>{
    return this.http.post<any>(this.Url+ `/new/formacion`,formacion);
  }
  public update(Idform: number, formacion: Formacion): Observable<any>{
    return this.http.post<any>(this.Url+ `/editar/formacion/${Idform}`,formacion);
  }
  public borrar(Idform: number): Observable<any>{
    return this.http.delete<any>(this.Url+ `/deleteformacion/${Idform}`);
  }

}


