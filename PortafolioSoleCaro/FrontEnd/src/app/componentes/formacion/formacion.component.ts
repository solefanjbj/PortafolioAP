import { Component, OnInit } from '@angular/core';
import { Formacion } from 'src/app/model/formacion.model';
import { FormacionService } from 'src/app/servicios/formacion.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {
  isLogged = false;

  form: Formacion[] =[];

  constructor(public formacionService: FormacionService,private tokenService: TokenService,) { }

  ngOnInit(): void {

    this.cargarFormacion();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarFormacion():void{
    this.formacionService.lista().subscribe(data => {this.form = data;})
  }

  
  eliminar(id?: number){
    if(id != undefined){
      this.formacionService.borrar(id).subscribe(
        data => {
          this.cargarFormacion();
        }, err => {
          alert("No se pudo borrar la formacion");
        }
      )
    }
  }

}
