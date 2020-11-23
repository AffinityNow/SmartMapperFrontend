import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { LocalisationComponent } from './carte/localisation/localisation.component';
import { RecherchPointInteretComponent } from './carte/recherch-point-interet/recherch-point-interet.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './shared/home/home.component';
import { ConnexionComponent } from './espace-utilisateur/connexion/connexion.component'



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'localisation',
    component: LocalisationComponent
  },
  {
    path: 'rechercheAdresse',
    component: RecherchPointInteretComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LocalisationComponent,
    RecherchPointInteretComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


