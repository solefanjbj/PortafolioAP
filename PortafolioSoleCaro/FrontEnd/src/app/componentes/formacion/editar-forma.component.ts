import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formacion } from 'src/app/model/formacion.model';
import { FormacionService } from 'src/app/servicios/formacion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-forma',
  templateUrl: './editar-forma.component.html',
  styleUrls: ['./editar-forma.component.css']
})
export class EditarFormaComponent implements OnInit {

  forma: Formacion = null;
 
  constructor(private formacion: FormacionService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.formacion.detail(id).subscribe(
      data => {
        this.forma = data;
      }, err => {
        alert("Error al cargar");
        this.router.navigate(['']);
      }
    )

  }
  
    modificar(): void{
      const id = this.activatedRouter.snapshot.params['id'];
      this.formacion.update(id, this.forma).subscribe(
        data => {
          this.router.navigate(['']);
        }, err =>{
           alert("Error al modificar ");
           this.router.navigate(['']);
        }
      )
    }
  
  }

 