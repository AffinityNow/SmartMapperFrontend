import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './shared/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {PointInteretService} from './shared/service/point-interet.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RecherchPointInteretComponent} from "./carte/recherch-point-interet/recherch-point-interet.component";
import {LocalisationComponent} from "./carte/localisation/localisation.component";
import {CarouselModule} from 'primeng/carousel';
import {OrderListModule} from 'primeng/orderlist';
import {IHMComponent} from "./carte/ihm/ihm.component";


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'localisation',
    component: LocalisationComponent
  }
  , {
    path: 'recherchePOI',
    component: RecherchPointInteretComponent
  }
  ,
  {
    path: 'IHM',
    component: IHMComponent
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
    IHMComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    CarouselModule,
    OrderListModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [PointInteretService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }


