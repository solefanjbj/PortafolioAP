import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModAcercadeComponent } from './componentes/acercade/mod-acercade.component';
import { EditarExpeComponent } from './componentes/experiencia/editar-expe.component';
import { NuevaexpeComponent } from './componentes/experiencia/nuevaexpe.component';
import { EditarFormaComponent } from './componentes/formacion/editar-forma.component';
import { NuevaFormComponent } from './componentes/formacion/nueva-form.component';
import { EditarSkillComponent } from './componentes/hy-sskills/editar-skill.component';
import { NuevoSkillComponent } from './componentes/hy-sskills/nuevo-skill.component';
import { LoginComponent } from './componentes/login/login.component';
import { PortafolioComponent } from './componentes/portafolio/portafolio.component';
import { EditarProyectoComponent } from './componentes/proyectos/editar-proyecto.component';
import { NuevoProyectoComponent } from './componentes/proyectos/nuevo-proyecto.component';
import { PruebaComponent } from './componentes/prueba/prueba.component';

const routes: Routes = [
 
  {path:'', component:PortafolioComponent},
  {path: 'login', component:LoginComponent},
  {path: 'prueba', component:PruebaComponent},
  {path: 'editar-expe/:id', component:EditarExpeComponent},
  {path: 'nueva-expe', component:NuevaexpeComponent},
  {path: 'mod-persona', component:ModAcercadeComponent},
  {path: 'nueva-form', component:NuevaFormComponent},
  {path: 'editar-forma/:id', component:EditarFormaComponent},
  {path: 'nuevo-proyecto', component:NuevoProyectoComponent},
  {path: 'editar-proyecto/:id', component:EditarProyectoComponent},
  {path: 'nuevo-skill', component:NuevoSkillComponent},
  {path: 'editar-skill/:id', component:EditarSkillComponent}

  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
