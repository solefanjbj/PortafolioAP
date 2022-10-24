import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-mod-acercade',
  templateUrl: './mod-acercade.component.html',
  styleUrls: ['./mod-acercade.component.css']
})
export class ModAcercadeComponent implements OnInit {

  isLogged= false;

  pers: Persona=null ;

  constructor(private persona: PersonaService,private activatedRouter: ActivatedRoute, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogged=true;
      
      console.log(this.isLogged); 
  
    }else{
      this.isLogged=false;
    }

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
