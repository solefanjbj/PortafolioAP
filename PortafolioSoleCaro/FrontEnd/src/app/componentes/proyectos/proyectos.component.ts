import { Component, OnInit } from '@angular/core';
import { Proyectos } from 'src/app/model/proyectos.model';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proy: Proyectos[] =[];


  constructor(public proyectosService: ProyectosService) { }

  ngOnInit(): void {
    this.cargarProyecto();
    
  }
  cargarProyecto():void{
    this.proyectosService.lista().subscribe(data => {this.proy = data;})
  }

  
  eliminar(id?: number){
    if(id != undefined){
      this.proyectosService.borrar(id).subscribe(
        data => {
          this.cargarProyecto();
        }, err => {
          alert("No se pudo borrar la experiencia");
        }
      )
    }
  }

}
