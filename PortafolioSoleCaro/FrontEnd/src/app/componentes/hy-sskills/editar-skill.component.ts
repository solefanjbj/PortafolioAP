import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill.model';
import { SkillService } from 'src/app/servicios/skill.service';

@Component({
  selector: 'app-editar-skill',
  templateUrl: './editar-skill.component.html',
  styleUrls: ['./editar-skill.component.css']
})
export class EditarSkillComponent implements OnInit {
  skills: Skill=null ;

  constructor(private skill: SkillService,private activatedRouter: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
      this.skill.detail(id).subscribe(
      data =>{
        this.skills = data;
      }, err =>{
        alert("Error al cargar");
        this.router.navigate(['']);
      }
    )
  }

  modificar(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.skill.update(id, this.skills).subscribe(
      data => {
        this.router.navigate(['']);
      }, err =>{
         alert("Error al modificar ");
         this.router.navigate(['']);
      }
    )
    }

}
