import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {LocalisationComponent} from '../localisation/localisation.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'carte',
    component: LocalisationComponent
  }


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
