import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  isLogged = false;
  expe: Experiencia[] = [];



  constructor(public experienciaService: ExperienciaService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.cargarExperiencia();

    
  }
  login() {
    this.router.navigate(['api/login']);
  }
  onLogOut(): void {
      this.tokenService.logOut();
      window.location.reload();
  }

  cargarExperiencia(): void {
    this.experienciaService.lista().subscribe(data => { this.expe = data; })
  }


  eliminar(id?: number) {
    if (id != undefined) {
      this.experienciaService.borrar(id).subscribe(
        data => {
          this.cargarExperiencia();
        }, err => {
          alert("No se pudo borrar la experiencia");
        }
      )
    }
  }

}
