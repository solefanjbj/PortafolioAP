import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-mod-acercade',
  templateUrl: './mod-acercade.component.html',
  styleUrls: ['./mod-acercade.component.css']
})
export class ModAcercadeComponent implements OnInit {

  pers: Persona=null ;

  constructor(private persona: PersonaService,private activatedRouter: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {

    const id = this.activatedRouter.snapshot.params['id'];
      this.persona.detail(1).subscribe(
      data =>{
        this.pers = data;
      }, err =>{
        alert("Error al cargar");
        this.router.navigate(['']);
      }
    )
  }

  modificar(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.persona.update(id, this.pers).subscribe(
      data => {
        this.router.navigate(['']);
      }, err =>{
         alert("Error al modificar ");
         this.router.navigate(['']);
      }
    )
    }

}
