import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PointInteret} from '../model/pointInteret';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PointInteretService{

  constructor(private httpClient : HttpClient) { }

  chargerPointInteretJson():Observable<PointInteret[]>{
    return this.httpClient.get<PointInteret[]>("assets/maps/leaflet-control/geojson-data.json")
  }
}
