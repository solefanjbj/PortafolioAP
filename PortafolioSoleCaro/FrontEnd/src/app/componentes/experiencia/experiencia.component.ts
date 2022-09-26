import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  expe: Experiencia[] =[];


  constructor(public experienciaService: ExperienciaService/*, private tokenService: TokenService*/) { }

  ngOnInit(): void {
    this.cargarExperiencia();
    /*if(this.tokenService.getToken()){
      this.isLogged =true;
    }else{
      this.isLogged =false;
    }*/
  }
  cargarExperiencia():void{
    this.experienciaService.lista().subscribe(data => {this.expe = data;})
  }

}
