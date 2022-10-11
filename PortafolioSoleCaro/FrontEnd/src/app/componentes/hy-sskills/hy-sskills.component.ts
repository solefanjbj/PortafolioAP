import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skill.model';
import { SkillService } from 'src/app/servicios/skill.service';

@Component({
  selector: 'app-hy-sskills',
  templateUrl: './hy-sskills.component.html',
  styleUrls: ['./hy-sskills.component.css']
})
export class HySSkillsComponent implements OnInit {

  skills: Skill[] =[];

  constructor(public skillService: SkillService) { }

  ngOnInit(): void {
    this.cargarSkill();
    
  }
  cargarSkill():void{
    this.skillService.lista().subscribe(data => {this.skills = data;})
  }

  
  eliminar(id?: number){
    if(id != undefined){
      this.skillService.borrar(id).subscribe(
        data => {
          this.cargarSkill();
        }, err => {
          alert("No se pudo borrar la experiencia");
        }
      )
    }
  }

}