import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  Persona: Persona= new Persona( "","","","","","","","","");

  constructor(public personaService: PersonaService, private router:Router) { }

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data=> {this.Persona = data})
    
  }
  
}
