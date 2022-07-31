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
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { FormacionComponent } from './componentes/formacion/formacion.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HySSkillsComponent } from './componentes/hy-sskills/hy-sskills.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { FooterComponent } from './componentes/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AcercadeComponent,
    BannerComponent,
    LogoArgPComponent,
    RedSocialComponent,
    ExperienciaComponent,
    EducacionComponent,
    FormacionComponent,
    HySSkillsComponent,
    ProyectosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
