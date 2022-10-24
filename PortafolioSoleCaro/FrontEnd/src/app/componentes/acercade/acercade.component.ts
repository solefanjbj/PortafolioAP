/*import { HttpErrorResponse } from '@angular/common/http';*/
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  Persona: Persona= new Persona( "","","","","","","","","");
  
  /* public persona : Persona | undefined;*/

  isLogged = false;



  constructor(public personaService: PersonaService, private tokenService: TokenService) { }

  ngOnInit(): void {
   /* this.getPersona();*/
   this.personaService.getPersona().subscribe(data=> {this.Persona = data})
   
   if (this.tokenService.getToken()) {
    this.isLogged = true;
  } else {
    this.isLogged = false;
  }
  }
  /*public getPersona(): void{
    this.personaService.getPersona().subscribe({
      next:(response:Persona)=>{
        this.persona=response;
        
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  */
  

}

