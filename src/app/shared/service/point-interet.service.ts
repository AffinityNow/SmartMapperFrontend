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
  private REST_API_SERVER = "http://localhost:8080/point-interet/categorie/";
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
    return this.httpClient.get<PointInteret[]>(this.REST_API_SERVER +categorie).pipe(retry(3),catchError(this.handleError));
  }
}

