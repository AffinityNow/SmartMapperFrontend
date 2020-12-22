import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IHMComponent} from './carte/ihm/ihm.component';
import {PointInteretService} from './shared/service/point-interet.service';
import {FooterComponent} from './shared/footer/footer.component';
import {HeaderComponent} from './shared/header/header.component';
import {HomeComponent} from './shared/home/home.component';
import {RouterModule, Routes} from '@angular/router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {CarouselModule} from 'primeng/carousel';
import {OrderListModule} from 'primeng/orderlist';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {GeolocationService} from "./shared/service/GeolocationService";



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
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
    ProgressSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PointInteretService, GeolocationService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}

