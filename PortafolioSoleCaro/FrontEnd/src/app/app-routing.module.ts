import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PortafolioComponent } from './componentes/portafolio/portafolio.component';

const routes: Routes = [
 
  {path:'', component:PortafolioComponent},
  {path: 'login', component:LoginComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
