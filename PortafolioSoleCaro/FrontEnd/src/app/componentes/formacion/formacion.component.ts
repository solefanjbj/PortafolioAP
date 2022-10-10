import { Component, OnInit } from '@angular/core';
import { Formacion } from 'src/app/model/formacion.model';
import { FormacionService } from 'src/app/servicios/formacion.service';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {

  form: Formacion[] =[];

  constructor(public formacionService: FormacionService) { }

  ngOnInit(): void {

    this.cargarFormacion();
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
