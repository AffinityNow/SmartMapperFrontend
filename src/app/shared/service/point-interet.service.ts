//*******************Ahlem*****************************************
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PointInteret} from '../model/pointInteret';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PointInteretService{

  constructor(private httpClient : HttpClient) { }

  public loadPointInteretByCategorie(categorie:string): Observable<PointInteret[]>{
   return this.httpClient.get<PointInteret[]>("http://localhost:8080/point-interet/categorie/"+categorie) ;
  }

}
