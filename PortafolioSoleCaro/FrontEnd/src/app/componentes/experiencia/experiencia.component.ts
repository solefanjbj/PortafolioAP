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


  constructor(public experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    this.cargarExperiencia();
    
  }
  cargarExperiencia():void{
    this.experienciaService.lista().subscribe(data => {this.expe = data;})
  }

  
  eliminar(id?: number){
    if(id != undefined){
      this.experienciaService.borrar(id).subscribe(
        data => {
          this.cargarExperiencia();
        }, err => {
          alert("No se pudo borrar la experiencia");
        }
      )
    }
  }

}
