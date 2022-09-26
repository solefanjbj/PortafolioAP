import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarExpeComponent } from './componentes/experiencia/editar-expe.component';
import { NuevaexpeComponent } from './componentes/experiencia/nuevaexpe.component';
import { LoginComponent } from './componentes/login/login.component';
import { PortafolioComponent } from './componentes/portafolio/portafolio.component';
import { PruebaComponent } from './componentes/prueba/prueba.component';

const routes: Routes = [
 
  {path:'', component:PortafolioComponent},
  {path: 'login', component:LoginComponent},
  {path: 'prueba', component:PruebaComponent},
  {path: 'editar-expe/:id', component:EditarExpeComponent},
  {path: 'nueva-expe', component:NuevaexpeComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
