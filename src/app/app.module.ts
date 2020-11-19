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
import {RecherchMotCleComponent} from './carte/recherch-mot-cle/recherch-mot-cle.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
  , {
    path: 'localisation',
    component: LocalisationComponent
  }
  , {
    path: 'rechercheAdresse',
    component: RecherchPointInteretComponent
  }
  , {
    path: 'recherchePOI',
    component: RecherchMotCleComponent
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
    RecherchMotCleComponent,
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


