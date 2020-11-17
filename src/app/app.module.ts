import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {GeolocalisationComponent} from './geolocalisation/geolocalisation.component';

import {RecherchPointInteretComponent} from './recherch-point-interet/recherch-point-interet.component';





const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'geolocalisation',
    component: GeolocalisationComponent},

  {path: 'rechercheAdresse',
    component: RecherchPointInteretComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    GeolocalisationComponent,
    RecherchPointInteretComponent,
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
