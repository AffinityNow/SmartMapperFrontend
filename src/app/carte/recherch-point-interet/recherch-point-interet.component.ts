import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import * as L from 'leaflet';
import {FormControl} from '@angular/forms';
import {Categories, Champs, PointInteret} from '../../shared/model/pointInteret';
import {PointInteretService} from '../../shared/service/point-interet.service';


@Component({
  selector: 'app-recherch-point-interet',
  templateUrl: './recherch-point-interet.component.html',
  styleUrls: ['./recherch-point-interet.component.css']
})
export class RecherchPointInteretComponent implements OnInit, AfterViewInit {
  pointInteretCtrl = new FormControl();
  pointInteretList: string[];
  pointInteretSelectionnes: string[];
  pointInteretData: PointInteret[];
  map;
  marker;
  caterogies: any[];

  constructor(private pointInteretService: PointInteretService) {
  }

  ngAfterViewInit(): void {
    this.createMap();
  }

  ngOnInit(): void {
    this.caterogies = [Categories.COMMERCE, Categories.EDUCATION, Categories.SPORTS, Categories.TRANSPORTS,
      Categories.HOTELS, Categories.SANTE, Categories.RESTAURATION, Categories.CULTES];
    /*    this.pointInteretList = Object.keys(CateroriesPointInteret).map(key => CateroriesPointInteret[key]);*/
    const pointInteretObs = this.pointInteretService.chargerPointInteretJson();
    const res: Subscription = pointInteretObs.subscribe(data => {
        this.pointInteretData = data;
        console.log(data);
      }
    );
  }

  drawMarker(event) {
    const pointInteretSelectionnes = event.value;
    console.log('pointInteretSelectionnes : ' + pointInteretSelectionnes);
    const pids = this.getPointInteret(pointInteretSelectionnes);
    console.log('positions : ' + pids);
    pids.forEach(pid =>
      L.marker(pid.wgs84).addTo(this.map).bindPopup(pid.description).openPopup());
  }

  private getPointInteret(categories: string[]): Champs[] {
    const champs = [];
    this.pointInteretData.forEach(pid => {
      if (categories.includes(pid.fields.categorie1) || categories.includes(pid.fields.categorie2) || categories.includes(pid.fields.categorie3)) {
        champs.push(pid.fields);
      }
    });
    return champs;
  }

  private createMap(): void {
    const coordsIssy = {lat: 48.8245306, lng: 2.2743419};
    const coordsFromBrowser = {lat: coordsIssy.lat, lng: coordsIssy.lng};
    this.map = L.map('map').setView(
      [coordsFromBrowser.lat, coordsFromBrowser.lng],
      15
    );
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; ' +
        '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
        '<a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoic21hcnRtYXBwZXIiLCJhIjoiY2toZzl5cGxiMGdmNzJzcXFnbnVycjZnaSJ9.7wSZ8VjvXKBdMBwmfEYMeA'
    }).addTo(this.map);
  }

}
