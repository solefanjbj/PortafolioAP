import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { AcercadeComponent } from './componentes/acercade/acercade.component';
import { BannerComponent } from './componentes/banner/banner.component';
import { LogoArgPComponent } from './componentes/logo-arg-p/logo-arg-p.component';
import { RedSocialComponent } from './componentes/red-social/red-social.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { FormacionComponent } from './componentes/formacion/formacion.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HySSkillsComponent } from './componentes/hy-sskills/hy-sskills.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { PortafolioComponent } from './componentes/portafolio/portafolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componentes/login/login.component';
import { PruebaComponent } from './componentes/prueba/prueba.component';
import { NuevaexpeComponent } from './componentes/experiencia/nuevaexpe.component';
import { EditarExpeComponent } from './componentes/experiencia/editar-expe.component';
import { ModAcercadeComponent } from './componentes/acercade/mod-acercade.component';
import { EditarFormaComponent } from './componentes/formacion/editar-forma.component';
import { NuevaFormComponent } from './componentes/formacion/nueva-form.component';
import { NuevoProyectoComponent } from './componentes/proyectos/nuevo-proyecto.component';
import { EditarProyectoComponent } from './componentes/proyectos/editar-proyecto.component';
import { NuevoSkillComponent } from './componentes/hy-sskills/nuevo-skill.component';
import { EditarSkillComponent } from './componentes/hy-sskills/editar-skill.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AcercadeComponent,
    BannerComponent,
    LogoArgPComponent,
    RedSocialComponent,
    ExperienciaComponent,
    FormacionComponent,
    HySSkillsComponent,
    ProyectosComponent,
    FooterComponent,
    PortafolioComponent,
    LoginComponent,
    PruebaComponent,
    NuevaexpeComponent,
    EditarExpeComponent,
    ModAcercadeComponent,
    NuevaFormComponent,
    EditarFormaComponent,
    NuevoProyectoComponent,
    EditarProyectoComponent,
    NuevoSkillComponent,
    EditarSkillComponent,
 
  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
