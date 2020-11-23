import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacePersoComponent } from './espace-perso/espace-perso.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';



@NgModule({
  declarations: [EspacePersoComponent, ConnexionComponent, InscriptionComponent],
  imports: [
    CommonModule
  ]
})
export class EspaceUtilisateurModule { }
