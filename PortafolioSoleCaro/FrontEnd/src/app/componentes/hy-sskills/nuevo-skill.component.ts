import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill.model';
import { SkillService } from 'src/app/servicios/skill.service';

@Component({
  selector: 'app-nuevo-skill',
  templateUrl: './nuevo-skill.component.html',
  styleUrls: ['./nuevo-skill.component.css']
})
export class NuevoSkillComponent implements OnInit {

  nombre: string='';
  porcentaje: number=0;
  

  constructor(private skill: SkillService,private router: Router) { }

  ngOnInit(): void {
  }

  crear():void{
    const ski = new Skill(this.nombre, this.porcentaje);
    this.skill.save(ski).subscribe(
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
