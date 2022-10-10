import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormacionService } from 'src/app/servicios/formacion.service';
import { Formacion } from 'src/app/model/formacion.model';

@Component({
  selector: 'app-nueva-form',
  templateUrl: './nueva-form.component.html',
  styleUrls: ['./nueva-form.component.css']
})
export class NuevaFormComponent implements OnInit {

  titulo: String='';
  descrip: String='';
  inicio: String='';
  fin: String='';

  constructor(private formacion: FormacionService,private router: Router) { }

  ngOnInit(): void {
  }
  crear():void{
    const form = new Formacion(this.titulo, this.descrip, this.inicio, this.fin);
    this.formacion.save(form).subscribe(
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
