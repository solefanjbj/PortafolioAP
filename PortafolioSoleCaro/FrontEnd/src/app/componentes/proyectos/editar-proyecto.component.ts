import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos.model';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  proye: Proyectos=null ;

  constructor(private proyecto: ProyectosService,private activatedRouter: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
      this.proyecto.detail(id).subscribe(
      data =>{
        this.proye = data;
      }, err =>{
        alert("Error al cargar");
        this.router.navigate(['']);
      }
    )
  }

  modificar(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyecto.update(id, this.proye).subscribe(
      data => {
        this.router.navigate(['']);
      }, err =>{
         alert("Error al modificar ");
         this.router.navigate(['']);
      }
    )
    }

}
