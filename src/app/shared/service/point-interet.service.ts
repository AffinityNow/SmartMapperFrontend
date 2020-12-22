//*******************Ahlem*****************************************
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {PointInteret} from '../model/pointInteret';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PointInteretService{
  private GET_POI_BY_CATEGORY_URL = "http://localhost:8080/point-interet/categorie/";
  private GET_POI_BY_CATEGORY_AND_POSITION_URL = "http://localhost:8080/point-interet/categorie/";
  constructor(private httpClient : HttpClient) { }

  // Adding HTTP Error Handling with RxJS catchError() & HttpClient
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `(Erreur Serveur) Echec de la récupération des points d\'interet`;
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public loadPointInteretByCategorie(categorie:string): Observable<PointInteret[]>{
    return this.httpClient.get<PointInteret[]>(this.GET_POI_BY_CATEGORY_URL +categorie).pipe(retry(3),catchError(this.handleError));
  }

  public loadPointInteretByCategorieAndPosition(categorie:string, lat:number, lg:number): Observable<PointInteret[]>{
    return this.httpClient.get<PointInteret[]>(this.GET_POI_BY_CATEGORY_AND_POSITION_URL+categorie+"/"+lat+"/"+lg).pipe(retry(3),catchError(this.handleError));
  }
}

