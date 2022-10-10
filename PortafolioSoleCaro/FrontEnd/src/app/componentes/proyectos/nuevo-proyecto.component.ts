import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos.model';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {

  titulo: String='';
  descrip: String='';
  imagen: String='';
  link: String='';


  constructor(private proyecto: ProyectosService,private router: Router) { }

  ngOnInit(): void {
  }

  crear():void{
    const proy = new Proyectos(this.titulo, this.descrip, this.imagen, this.link);
    this.proyecto.save(proy).subscribe(
      data =>{
        alert('Grabaddo correctamente');
        this.router.navigate(['']);
      }, err =>{
        alert('Transacción Erronea');
        this.router.navigate(['']);
      }
    )
  }

}



