import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-nuevaexpe',
  templateUrl: './nuevaexpe.component.html',
  styleUrls: ['./nuevaexpe.component.css']
})
export class NuevaexpeComponent implements OnInit {
  lugar: String='';
  descrip: String='';
  inicio: String='';
  fin: String='';


  constructor(private experiencia: ExperienciaService,private router: Router ) { }

  ngOnInit(): void {
  }

  crear():void{
    const expe = new Experiencia(this.lugar, this.descrip, this.inicio, this.fin);
    this.experiencia.save(expe).subscribe(
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
