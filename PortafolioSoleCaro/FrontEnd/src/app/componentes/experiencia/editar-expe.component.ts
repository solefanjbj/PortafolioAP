import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-editar-expe',
  templateUrl: './editar-expe.component.html',
  styleUrls: ['./editar-expe.component.css']
})
export class EditarExpeComponent implements OnInit {
  expelab: Experiencia= null;

  constructor(private experiencia: ExperienciaService,private activatedRouter: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['idexp'];
    this.experiencia.detail(id).subscribe(
      data =>{
        this.expelab = data;
      }, err =>{
        alert("Error al cargar");
        this.router.navigate(['']);
      }
    )
  }

  modificar(): void{
    const id = this.activatedRouter.snapshot.params['idexp'];
    this.experiencia.update(id, this.expelab).subscribe(
      data => {
        this.router.navigate(['']);
      }, err =>{
         alert("Error al modificar ");
         this.router.navigate(['']);
      }
    )
    }

}
